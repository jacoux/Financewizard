import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';

import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Client, ClientResponse, Invoice, InvoiceResponse, Organization, Product } from 'src/app/shared/types/invoice';
import { User } from 'src/app/shared/types/user';
import { saveInvoice } from 'src/app/store/invoiceDraft/invoiceDraft.actions';
import { InvoiceDraftState } from 'src/app/store/invoiceDraft/invoiceDraft.models';
import { setCompanyInfo } from 'src/app/store/organization/organization.actions';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class NewInvoiceComponent implements OnInit {
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  itemForm!: UntypedFormGroup;
  products!: any;
  clients!: any;
  invoiceId?: string;
  company!: Organization;
  logo!: string;
  selectedClient!: Client;
  selectedProd!: Product;
  invoiceFromStore: Invoice | undefined;
  payWithin = 0;
  total = 0;
  totalVatAmount = 0;
  visible: boolean = false;
  showMyDetails: boolean = true;

  invoiceFrom = new UntypedFormGroup({
    invoiceName: new UntypedFormControl(null, [Validators.required]),
    invoiceNumber: new UntypedFormControl(null, [Validators.required]),
    companyId: new UntypedFormControl(null, [Validators.required]),
    client: new UntypedFormControl(null, [Validators.required]),
    clientInfo: new UntypedFormControl(null, [Validators.required]),
    invoiceDate: new UntypedFormControl(new Date(), [Validators.required]),
    paymentDate: new UntypedFormControl(new Date(), [Validators.required]),
    payWithin: new UntypedFormControl(7, [Validators.required]),
    total: new UntypedFormControl(null, [Validators.required]),
    vatAmount: new UntypedFormControl(null, [Validators.required]),
    footer: new UntypedFormControl(null, [Validators.required]),
    paymentDetails: new UntypedFormControl(null, [Validators.required]),
  });
  placeholder_footer = 'te betalen voor... op rekeningnummer ...';

  constructor(
    private fb: UntypedFormBuilder,
    private crudApi: GeneralCrudService,
    private store: Store,
    private invoiceState: State<InvoiceDraftState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService: CrudInvoiceService
  ) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.getClients();
    this.getProducts();
    this.getCompany();
    this.addForm.addControl('rows', this.rows);
    this.getInvoiceFromStore();
    this.activatedRoute.params.subscribe((params) => {
      this.invoiceId = params['id'];
      if (this.invoiceId) {
        this.invoiceService.getInvoice(this.invoiceId.toString());
      }
    });
  }

  onClientChange(id: any) {
    if (this.addForm && this.clients) {
      const client = this.clients.filter((client: Client) => client?.id === id);
      this.selectedClient = client[0];
      this.invoiceFrom.get('client')?.setValue(this.selectedClient);
    }
  }

  selectProd(i: number, id: string) {
    if (this.addForm) {
      const products = this.products.filter(
        (product: Product) => product.id === id
      );
      const product = products[0];
      const currentRow = this.getRow().at(i);
      currentRow.get('price')?.setValue(product.price);
      currentRow.get('name')?.setValue(product.name);
      currentRow.get('vat')?.setValue(product.vatPercentage);
    }
  }

  changeAmount(i: any, aantal: any) {
    if (this.addForm) {
      const currentRow = this.getRow().at(i);
      currentRow.get('qty')?.setValue(aantal);
      this.calculateTotalWithVat(i);
    }
  }

  changePrice(i: any, price: number) {
    const currentRow = this.getRow().at(i);
    currentRow.get('price')?.setValue(price);
    this.calculateTotalWithVat(i);
  }

  addCustomProduct($event: any) {
    console.log($event);
    const withoutVat = $event.price * $event.qty;
    const vatAmount = (withoutVat * $event.vatPercentage) / 100;
    const total = withoutVat + vatAmount;
    const rowData = this.fb.group({
      name: $event.name,
      description: $event.description,
      price: $event.price,
      qty: $event.qty,
      vat: $event.vatPercentage,
      vatAmount: vatAmount,
      total: total,
      isCustom: true,
    });
    this.rows.push(rowData);
    this.calculateTotal();
    // this.addClass();
  }

  calculateTotalWithVat(i: any, vat?: number) {
    const currentRow = this.getRow().at(i);
    const btw = vat ?? currentRow.get('vat')?.value ?? null;
    if (this.addForm) {
      const currentRow = this.getRow().at(i);

      let price;
      let priceFromRow = currentRow.get('price')?.value;
      price = currentRow.get('qty')?.value
        ? priceFromRow * currentRow.get('qty')?.value
        : priceFromRow;

      let btwValue;
      if (btw) {
        btwValue = btw;
      } else {
        btwValue = 0;
      }
      const vatAmount = (price * btw) / 100;
      const newV = vatAmount + price;
      currentRow.get('vatAmount')?.setValue(vatAmount);
      currentRow.get('total')?.setValue(newV);
      currentRow.get('vat')?.setValue(btw);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let totalFromRow = this.getRow().getRawValue();
    this.total = totalFromRow
      .map((item) => item.total)
      .reduce((prev, next) => prev + next);
    this.totalVatAmount = totalFromRow
      .map((item) => item.vatAmount)
      .reduce((prev, next) => prev + next);

    this.invoiceFrom.get('vatAmount')?.setValue(this.totalVatAmount);
    this.invoiceFrom.get('total')?.setValue(this.total);
  }

  payWithinChange() {
    const invoiceDate = this.invoiceFrom.controls['invoiceDate'].value;
    let payDate = new Date();
    payDate.setDate(invoiceDate?.getDate() + this.payWithin);
    this.invoiceFrom.controls['paymentDate'].setValue(payDate);
  }

  getClients() {
    this.crudApi
      .GetObjectsList('clients/records')
      // @ts-ignore
      .subscribe((data: ClientResponse) => {
        this.clients = data.items;
      });
  }

  getInvoiceFromStore() {
    this.invoiceState.subscribe((data: any) => {
      this.invoiceFromStore = data.invoiceDraft.invoiceDraft;
      //invoiceForm
      const invoiceDraft: Invoice = data.invoiceDraft.invoiceDraft[0];
      //product
      const products: Product[] = data.invoiceDraft.invoiceDraft[1];
      if (invoiceDraft?.client?.id) {
        this.onClientChange(invoiceDraft?.client?.id);
      }
      this.invoiceFrom.controls['invoiceName'].setValue(
        invoiceDraft?.invoiceName
      );
      this.invoiceFrom.controls['invoiceNumber'].setValue(
        invoiceDraft?.invoiceNumber
      );
      this.invoiceFrom.controls['invoiceDate'].setValue(
        new Date(invoiceDraft?.invoiceDate)
      );
      this.invoiceFrom.controls['paymentDate'].setValue(
        new Date(invoiceDraft?.paymentDate)
      );
      this.invoiceFrom.controls['payWithin'].setValue(invoiceDraft?.payWithin);
      this.invoiceFrom.controls['total'].setValue(invoiceDraft?.total);
      this.invoiceFrom.controls['vatAmount'].setValue(invoiceDraft?.vatAmount);
      this.invoiceFrom.controls['footer'].setValue(invoiceDraft?.footer);
      this.invoiceFrom.controls['paymentDetails'].setValue(
        invoiceDraft?.paymentDetails
      );

      if (products?.length > 0) {
        // first row is allready added
        products.forEach((element: any) => {
          const rowData = this.fb.group({
            name: element.name,
            description: element.description,
            price: element.price,
            qty: element.qty,
            vat: element?.vat ?? 0,
            vatAmount: element.vatAmount,
            total: element.total,
            isCustom: element.isCustom,
          });
          this.rows.removeAt(0);
          this.rows.push(rowData);
        });
        this.calculateTotal();
      }
    });
  }

  getProducts() {
    this.crudApi
      .GetObjectsList('products/records')
      // @ts-ignore
      .subscribe((data: ProductResponse) => {
        this.products = data.items;
      });
  }
  getCompany() {
    // @ts-expect-error
    const user = JSON.parse(localStorage.getItem('user')) as User;
    const id = user.linkedCompany
      ? user.linkedCompany
      : user.linkedCompany?.[0];
    this.crudApi
      .GetObjectsList('companies/records/' + id)
      // @ts-ignore
      .subscribe((data: Organization) => {
        if (data) {
          this.store.dispatch(
            setCompanyInfo({
              organization: data,
              status: 4,
            })
          );
        }
        this.invoiceFrom.get('companyId')?.setValue(data.id);
        this.placeholder_footer =
          data.defaultInvoiceDetails?.footer ||
          'te betalen voor... op rekeningnummer ...';
        this.company = data;
        if (data.logo) {
          this.logo =
            environment.apiUrl +
            '/api/files/companies/' +
            data.id +
            '/' +
            data.logo;
        } else {
          this.logo = 'Nog geen logo opgeladen';
        }
      });
  }

  hide() {
    this.showMyDetails = !this.showMyDetails;
  }

  getControls() {
    return (this.addForm.get('rows') as UntypedFormArray).controls;
  }

  getRow() {
    return this.addForm.get('rows') as UntypedFormArray;
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
    this.calculateTotal();
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  addClass() {
    this.visible = !this.visible;
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      name: null,
      description: null,
      price: null,
      qty: null,
      vat: null,
      vatAmount: null,
      total: null,
      isCustom: false,
    });
  }
  submit() {
    this.invoiceFrom.controls['clientInfo'].setValue(this.selectedClient);
    const invoiceData = [this.invoiceFrom.value, this.getRow().getRawValue()];
    this.store.dispatch(saveInvoice({ data: invoiceData }));
    if (this.invoiceId) {
      this.router.navigate([
        'dashboard',
        'invoices',
        'check',
        this.invoiceId,
      ]);
    } else {
      this.router.navigate(['dashboard', 'invoices', 'check']);
    }
  }
}
