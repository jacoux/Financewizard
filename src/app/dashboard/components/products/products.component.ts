import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CrudProductService } from 'src/app/shared/services/crud-products.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Product } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  public productForm!: UntypedFormGroup;
  products: any;

  constructor(
    public crudApi: GeneralCrudService,
    public fb: UntypedFormBuilder,
    private database: AngularFireDatabase
  ) {
  }
  ngOnInit() {
    this.crudApi
      .GetObjectsList('products')
      .subscribe((data) => (this.products = data));
  }
}