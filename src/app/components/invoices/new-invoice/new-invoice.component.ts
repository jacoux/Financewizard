import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  addForm: FormGroup;
  rows: FormArray;
  itemForm!: FormGroup;
  products!: any;
  clients!: any;
  selectedClient!: Client;
  payWithin = 0;

  invoiceFrom = new FormGroup({
    client: new FormControl(null, [Validators.required]),
    invoiceDate: new FormControl(new Date(), [Validators.required]),
    paymentDate: new FormControl(new Date(), [Validators.required]),
    payWithin: new FormControl(30, [Validators.required]),

  })

  constructor(private fb: FormBuilder, private crudApi: GeneralCrudService) {
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
  }

  onClientChange(id: any) {
    const test = this.clients.filter((client: Client) => client._id === id);
    this.selectedClient = test[0] 
  }


  payWithinChange() {
    const invoiceDate = this.invoiceFrom.controls['invoiceDate'].value
    let payDate = new Date();
    payDate.setDate(invoiceDate.getDate() +  this.payWithin);
    this.invoiceFrom.controls['paymentDate'].setValue(payDate);
  }
  getProducts() {
    this.crudApi.GetObjectsList('products').subscribe((data) => this.products = data );
  }

  submit() {
    
  }

 getClients() {
   this.crudApi.GetObjectsList('clients').subscribe((data) => this.clients = data);
  }
  

  getControls() {
    return (this.addForm.get('rows') as FormArray).controls;
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: null,
      description: null,
      qty: null
    });
  }
}
