import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';
import { MY_DATE_FORMATS } from 'src/app/shared/dateadapter';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Client, Product } from 'src/app/shared/types/invoice';


@Component({
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
  providers: [    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
]
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

  invoiceFrom = new UntypedFormGroup({
    client: new UntypedFormControl(null, [Validators.required]),
    invoiceDate: new UntypedFormControl(new Date(), [Validators.required]),
    paymentDate: new UntypedFormControl(new Date(), [Validators.required]),
    payWithin: new UntypedFormControl(30, [Validators.required]),
    total: new UntypedFormControl(null, [Validators.required]),

  })

  constructor(private fb: UntypedFormBuilder, private crudApi: GeneralCrudService) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });



    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.addForm.addControl('rows', this.rows);
    this.getProducts();
    this.getClients();
    this.rows?.length === 0 ? this.onAddRow() : '';
  }

  onClientChange(id: any) {
    const test = this.clients.filter((client: Client) => client._id === id);
    this.selectedClient = test[0] 
  }

  selectProd(i:any, id: any) {
    const test = this.products.filter((product: Product) => product._id === id);
    this.selectedProd = test[0] 
    const currentRow = this.getRow().at(i);
    currentRow.get('price')?.setValue(this.selectedProd.price)

  }

  calculateTotalWithoutVat(i: any, aantal:any) {
    if (this.addForm) {
      const currentRow = this.getRow().at(i);
      const newV = this.selectedProd.price * aantal;
      currentRow.get('qty')?.setValue(aantal)
      let vat = currentRow.get('vat')?.value ?? null
      this.calculateTotalWithVat(i, vat);
    }
  }

    calculateTotalWithVat(i: any, btw: any) {
    if (this.addForm) {
      const currentRow = this.getRow().at(i);

      let price
      price = currentRow.get('qty')?.value ? this.selectedProd.price * currentRow.get('qty')?.value : this.selectedProd.price;

      let btwValue;
      if (btw) {
        btwValue = btw
      } else {
        btwValue = 0
      }
      const vatAmount = ((price * btw) / 100)
      const newV = vatAmount + price
      currentRow.get('vatAmount')?.setValue(vatAmount)
      currentRow.get('total')?.setValue(newV)
      currentRow.get('vat')?.setValue(btw)
    }
      this.calculateTotal()
    }
  
  calculateTotal() {
    debugger;
    let totalFromRow = this.getRow().getRawValue();
    this.total = totalFromRow.map(item => item.total).reduce((prev, next) => prev + next);
    this.totalVatAmount = totalFromRow.map(item => item.vatAmount).reduce((prev, next) => prev + next);
  }

  payWithinChange() {
    const invoiceDate = this.invoiceFrom.controls['invoiceDate'].value
    let payDate = new Date();
    payDate.setDate(invoiceDate.getDate() +  this.payWithin);
    this.invoiceFrom.controls['paymentDate'].setValue(payDate);
  }

  getProducts() {
    this.crudApi.GetObjectsList('products').subscribe((data) => {
      this.products = data
      if (!this.selectedProd && this.products) {
        console.log(this.products[0])
      this.selectedProd = this.products[0]
    }
    });

  }

  submit() {
    
  }

 getClients() {
   this.crudApi.GetObjectsList('clients').subscribe((data) => this.clients = data);
  }
  

  getControls() {
    return (this.addForm.get('rows') as UntypedFormArray).controls;
  }
  
  getRow() {
    return this.addForm.get('rows') as UntypedFormArray;
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
    this.calculateTotal();
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      name: null,
      description: null,
      price: null,
      qty: null,
      vat: null,
      vatAmount: null,
      total: null
    });
  }
}
