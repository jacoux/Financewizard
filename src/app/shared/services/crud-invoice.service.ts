import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { getInvoiceDraft } from 'src/app/store/invoiceDraft/invoiceDraft.selectors';
import { getOrganization } from 'src/app/store/organization/organization.selectors';
import { Invoice } from '../types/invoice';
import PocketBase from 'pocketbase';
import { saveInvoice, saveInvoiceComplete } from 'src/app/store/invoiceDraft/invoiceDraft.actions';

@Injectable({
  providedIn: 'root',
})
export class CrudInvoiceService {
  pb = new PocketBase('http://127.0.0.1:8090');
  configUrl: 'http://127.0.0.1:8090/api/collections/clients' =
    'http://127.0.0.1:8090/api/collections/clients';

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

  async AddInvoice() {
        let _dataFrom: any;

    this.store.select(getInvoiceDraft).subscribe((data: any) => {      
        _dataFrom = {
          invoiceNumber: data[0]?.invoiceNumber.toString(),
          invoiceName: data[0]?.invoiceName,
          creatonDate: data[0]?.invoiceDate,
          paymentDueDate: data[0]?.paymentDate,
          invoiceNumberPrefix: data[0]?.invoiceNumberPrefix,
          companyId: data[0]?.companyId,
          client: data[0]?.client.id,
          extendedDate: null,
          payWithin: data[0]?.payWithin,
          currency: '€',
          paymentDetails: data[0]?.paymentDetails,
          totalWithVat: data[0]?.total,
          totalWithoutVat: data[0]?.total - data[0]?.vatAmount,
          vatPercentage: 123,
          chargeVat: true,
          vatAmount: 123,
          footNotes: data[0]?.footer,
          products: data[1],
          Status: 'CREATED',
        };
       return;
     });
     const record = await this.pb
       .collection('invoices')
       .create(_dataFrom)
       .then((value) => {
         if (value.id) {
           alert('Invoice goed aangemaakt!');
           this.store.dispatch(saveInvoiceComplete())
         }
       });
   }
}
