import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getInvoiceDraft } from 'src/app/store/invoiceDraft/invoiceDraft.selectors';
import { getOrganization } from 'src/app/store/organization/organization.selectors';
import { Client, Invoice } from '../types/invoice';
import PocketBase, { RecordModel } from 'pocketbase';
import { saveInvoice, saveInvoiceComplete, setInvoiceForEdit } from 'src/app/store/invoiceDraft/invoiceDraft.actions';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudInvoiceService {
  pb = new PocketBase(environment.apiUrl);
  configUrl = environment.apiUrl + '/api/collections/clients';
  auth_token = localStorage.getItem('token');

  constructor(private store: Store, private router: Router) {}
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

  async updateInvoice(id:string) {
        const auth_token = localStorage.getItem('token');
        const headers = { Authorization: auth_token };

        let _dataFrom: any;

        this.store.select(getInvoiceDraft).subscribe((data: any) => {
          _dataFrom = {
            invoiceNumber: data[0]?.invoiceNumber.toString(),
            invoiceName: data[0]?.invoiceName,
            creatonDate: data[0]?.invoiceDate,
            paymentDueDate: data[0]?.paymentDate,
            invoiceNumberPrefix: data[0]?.invoiceNumberPrefix,
            templateNo: data[0]?.templateNo,
            companyId: data[0]?.companyId,
            client: data[0]?.client?.id,
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
          .update(id,_dataFrom, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth_token}`,
            },
          })
          .then((value) => {
            if (value.id) {
              this.store.dispatch(saveInvoiceComplete());
            }
          });
  }

  async AddInvoice() {
    const auth_token = localStorage.getItem('token');
    const headers = { Authorization: auth_token };

    let _dataFrom: any;

    this.store.select(getInvoiceDraft).subscribe((data: any) => {
      _dataFrom = {
        invoiceNumber: data[0]?.invoiceNumber.toString(),
        invoiceName: data[0]?.invoiceName,
        creatonDate: data[0]?.invoiceDate,
        paymentDueDate: data[0]?.paymentDate,
        invoiceNumberPrefix: data[0]?.invoiceNumberPrefix,
        templateNo: data[0]?.templateNo,
        companyId: data[0]?.companyId,
        client: data[0]?.client?.id,
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
      .create(_dataFrom, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((value) => {
        if (value.id) {
          this.store.dispatch(saveInvoiceComplete());
        }
      });
  }

  async getAllInvoices() {
    let invoices: RecordModel[] = [];
    const auth_token = localStorage.getItem('token');
    const records = await this.pb
      .collection('invoices')
      .getFullList({
        sort: '-created',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((data) => {
        if (data?.length) {
          invoices = data;
        } else {
          invoices = [];
        }
      });
    return invoices;
  }
  async getInvoiceWithoutNav(id: string) {
    const record = await this.pb
      .collection('invoices')
      .getOne(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((invoice) => {
        if (invoice) {
          let products: any;
          let _dataArr: any;
          (products = invoice['products']),
            this.store.dispatch(
              setInvoiceForEdit({
                data: [
                  {
                    id: invoice['id'],
                    invoiceNumber: invoice['invoiceNumber'],
                    invoiceName: invoice['invoiceName'],
                    invoiceDate: invoice['creatonDate'],
                    paymentDate: invoice['paymentDueDate'],
                    invoiceNumberPrefix: invoice['invoiceNumberPrefix'],
                    templateNo: invoice['templateNo'],
                    companyId: invoice['companyId'],
                    client: {
                      id: invoice['client'],
                    },
                    payWithin: invoice['payWithin'],
                    currency: '€',
                    paymentDetails: invoice['paymentDetails'],
                    total: invoice['totalWithVat'],
                    vatPercentage: invoice['vatPercentage'],
                    chargeVat: invoice['chargeVat'],
                    vatAmount: invoice['vatAmount'],
                    footer: invoice['footNotes'],
                    status: invoice['status'],
                  },

                  invoice['products'],
                ],
              })
            );
        }
      });
  }

  async getInvoice(id: string) {
    const record = await this.pb
      .collection('invoices')
      .getOne(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((invoice) => {
        if (invoice) {
          let products: any;
          let _dataArr: any;
          (products = invoice['products']),
            this.store.dispatch(
              setInvoiceForEdit({
                data: [
                  {
                    id: invoice['id'],
                    invoiceNumber: invoice['invoiceNumber'],
                    invoiceName: invoice['invoiceName'],
                    invoiceDate: invoice['creatonDate'],
                    paymentDate: invoice['paymentDueDate'],
                    invoiceNumberPrefix: invoice['invoiceNumberPrefix'],
                    templateNo: invoice['templateNo'],
                    companyId: invoice['companyId'],
                    client: {
                      id: invoice['client'],
                    },
                    payWithin: invoice['payWithin'],
                    currency: '€',
                    paymentDetails: invoice['paymentDetails'],
                    total: invoice['totalWithVat'],
                    vatPercentage: invoice['vatPercentage'],
                    chargeVat: invoice['chargeVat'],
                    vatAmount: invoice['vatAmount'],
                    footer: invoice['footNotes'],
                    status: invoice['status'],
                  },

                  invoice['products'],
                ],
              })
            );

          this.router.navigate(['dashboard', 'invoices', 'edit', invoice.id]);
        }
      });
  }

  deleteInvoice(id: string) {
    this.pb
      .collection('invoices')
      .delete(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((response) => {
        window.location.reload();
      });
  }
}
