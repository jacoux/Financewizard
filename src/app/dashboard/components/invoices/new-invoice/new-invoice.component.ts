import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MY_DATE_FORMATS } from 'src/app/shared/dateadapter';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Client, Product } from 'src/app/shared/types/invoice';
import { saveInvoice } from 'src/app/store/invoiceDraft/invoiceDraft.actions';

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
  selectedClient!: Client;
  selectedProd!: Product;
  payWithin = 0;
  total = 0;
  totalVatAmount = 0;
  visible: boolean = false;

  invoiceFrom = new UntypedFormGroup({
    client: new UntypedFormControl(null, [Validators.required]),
    invoiceDate: new UntypedFormControl(new Date(), [Validators.required]),
    paymentDate: new UntypedFormControl(new Date(), [Validators.required]),
    payWithin: new UntypedFormControl(30, [Validators.required]),
    total: new UntypedFormControl(null, [Validators.required]),
    footer: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private crudApi: GeneralCrudService,
    private store: Store
  ) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.getProducts();
    this.getClients();
    this.addForm.addControl('rows', this.rows);
  }

  onClientChange(id: any) {
    if (this.addForm) {
      const test = this.clients.filter((client: Client) => client._id === id);
      this.selectedClient = test[0];
    }
  }

  selectProd(i: any, id: any) {
    if (this.addForm) {
      const products = this.products.filter(
        (product: Product) => product._id === id
      );
      const product = products[0];
      const currentRow = this.getRow().at(i);
      debugger;
      currentRow.get('price')?.setValue(product.price);
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

  getProducts() {
    this.crudApi.GetObjectsList('products').subscribe((data) => {
      this.products = data;
    });
  }

  getClients() {
    this.crudApi
      .GetObjectsList('clients')
      .subscribe((data) => (this.clients = data));
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
    debugger;
    const invoiceData = [this.invoiceFrom.value, this.getRow().getRawValue()];
    // this.store.dispatch(saveInvoice({ data: invoiceData}));
  }
}
