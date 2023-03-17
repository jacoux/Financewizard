import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Invoice } from '../types/invoice';

@Injectable({
  providedIn: 'root'
})
export class CrudInvoiceService {
  clientsRef!: AngularFireList<any>;
  clientRef!: AngularFireObject<any>;
  configUrl: "http://localhost:3000/clients" = "http://localhost:3000/clients";

  constructor(private db: AngularFireDatabase) {}
  Addinvoice(invoice: Invoice) {
    this.invoicesRef.push({
      firstName: invoice.client.firstName,
      lastName: invoice.client.lastName,
      email: invoice.client.email,
      mobileNumber: invoice.client.mobileNumber,
    });
  }
  // Fetch Single invoice Object
  Getinvoice(id: string) {
    this.invoiceRef = this.db.object('invoices-list/' + id);
    return this.invoiceRef;
  }
  // Fetch invoices List
  GetinvoicesList() {
    this.invoicesRef = this.db.list('invoices-list');
    return this.invoicesRef;
  }
  // Update invoice Object
  Updateinvoice(invoice: Invoice) {
    this.invoiceRef.update({
      firstName: invoice.firstName,
      lastName: invoice.lastName,
      email: invoice.email,
      mobileNumber: invoice.mobileNumber,
    });
  }
  // Delete invoice Object
  Deleteinvoice(id: string) {
    this.invoiceRef = this.db.object('invoices-list/' + id);
    this.invoiceRef.remove();
  }
}
