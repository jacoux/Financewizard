import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { getInvoiceDraft } from 'src/app/store/invoiceDraft/invoiceDraft.selectors';
import { getOrganization } from 'src/app/store/organization/organization.selectors';
import { Invoice } from '../types/invoice';

@Injectable({
  providedIn: 'root',
})
export class CrudInvoiceService {
  constructor(private store: Store) {}
  // Get data from the store to retrieve and display/parse in the invoice
  getDataFromStore() {
    this.store.select(getInvoiceDraft).subscribe((data) => {
      return data;
    });
  }

  getOrganizationFromStore() {
    this.store.select(getOrganization).subscribe((data) => {
      return data;
    });
  }
}
