import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudProductService } from 'src/app/shared/services/crud-products.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Product } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  public productForm!: FormGroup;
  products: any;

  constructor(
    public crudApi: GeneralCrudService,
    public fb: FormBuilder,
    private database: AngularFireDatabase
  ) {
  }
  ngOnInit() {
    this.crudApi.GetObjectsList('products').subscribe((data) => this.products = data );
    this.getProductForm();
  }

  getProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      vatPercentage: [''],
      price: [''],
      description: [''],
      hourlyRate: [],
    });
  }
  get name() {
    return this.productForm.get('name');
  }
  get vatPercentage() {
    return this.productForm.get('vatPercentage');
  }
  get price() {
    return this.productForm.get('price');
  }
  get description() {
    return this.productForm.get('description');
  }
  get hourlyRate() {
    return this.productForm.get('hourlyRate');
  }
  ResetForm() {
    this.productForm.reset();
  }

  submitproductData() {
    // this.crudApi.AddProduct(this.productForm.value);
    this.ResetForm();
  }
}