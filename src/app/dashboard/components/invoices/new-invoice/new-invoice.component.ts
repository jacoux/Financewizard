import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Client, ClientResponse, Organization, Product } from 'src/app/shared/types/invoice';
import { User } from 'src/app/shared/types/user';
import { saveInvoice } from 'src/app/store/invoiceDraft/invoiceDraft.actions';
import { setCompanyInfo } from 'src/app/store/organization/organization.actions';

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
  company!: Organization;
  logo!: string;
  selectedClient!: Client;
  selectedProd!: Product;
  payWithin = 0;
  total = 0;
  totalVatAmount = 0;
  visible: boolean = false;
  showMyDetails: boolean = true;

  invoiceFrom = new UntypedFormGroup({
    client: new UntypedFormControl(null, [Validators.required]),
    invoiceDate: new UntypedFormControl(new Date(), [Validators.required]),
    paymentDate: new UntypedFormControl(new Date(), [Validators.required]),
    payWithin: new UntypedFormControl(7, [Validators.required]),
    total: new UntypedFormControl(null, [Validators.required]),
    vatAmount: new UntypedFormControl(null, [Validators.required]),
    footer: new UntypedFormControl(null, [Validators.required]),
  });
    placeholder_footer = "te betalen voor... op rekeningnummer ...";

  constructor(
    private fb: UntypedFormBuilder,
    private crudApi: GeneralCrudService,
    private store: Store,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCompany();
    this.getClients();
    this.addForm.addControl('rows', this.rows);
  }

  onClientChange(id: any) {
    debugger;
    if (this.addForm) {
      const client = this.clients.filter((client: Client) => client.id === id);
      this.selectedClient = client[0];
      this.invoiceFrom.get('client')?.setValue(this.selectedClient);
    }
  }

  selectProd(i: any, id: any) {
    if (this.addForm) {
      const products = this.products.filter(
        (product: Product) => product._id === id
      );
      const product = products[0];
      const currentRow = this.getRow().at(i);
      currentRow.get('price')?.setValue(product.price);
      currentRow.get('name')?.setValue(product.name);
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
    payDate.setDate(invoiceDate.getDate() + this.payWithin);
    this.invoiceFrom.controls['paymentDate'].setValue(payDate);
  }

  getClients() {
    this.crudApi
      .GetObjectsList('clients/records')
      // @ts-ignore
      .subscribe((data: ClientResponse) => { this.clients = data.items });
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

    this.crudApi
      .GetObjectsList('companies/records/' + user.companyId)
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
        this.placeholder_footer =
          data.defaultInvoiceDetails?.footer ||
          'te betalen voor... op rekeningnummer ...';
        this.company = data;
        this.logo =
          'http://127.0.0.1:8090/api/files/companies/' +
          data.id +
          '/' +
          data.logo;
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
    const invoiceData = [this.invoiceFrom.value, this.getRow().getRawValue()];
    this.store.dispatch(saveInvoice({ data: invoiceData }));
    this.router.navigate(['dashboard','invoices','check']);
  }
}
