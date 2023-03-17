import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from './../types/invoice';

@Injectable({
  providedIn: 'root'
})
export class CrudProductService {
  productsRef!: AngularFireList<any>;
  productRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  AddProduct(product: Product) {
    const list = this.db.list('/products-list');
    list.push({
      name: product.name,
      vatPercentage: product.vatPercentage,
      price: product.price,
      description: product.description,
      hourlyRate: product?.isHourlyRate
    });
  }
  // Fetch Single product Object
  GetProduct(id: string) {
    this.productRef = this.db.object('products-list/' + id);
    return this.productRef;
  }
  // Fetch products List
  GetProductsList() {
    this.productsRef = this.db.list('products-list');
    return this.productRef;
  }
  // Update product Object
  UpdateProduct(product: Product) {
    this.productRef.update({
      name: product.name,
      vatPercentage: product.vatPercentage,
      price: product.price,
      description: product.description,
      hourlyRate: product?.isHourlyRate
    });
  }
  // Delete product Object
  Deleteproduct(id: string) {
    this.productRef = this.db.object('products-list/' + id);
    this.productRef.remove();
  }
}
