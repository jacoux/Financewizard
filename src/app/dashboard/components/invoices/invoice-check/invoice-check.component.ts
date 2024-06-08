import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
import { saveInvoiceTemplate } from 'src/app/store/invoiceDraft/invoiceDraft.actions';
import { InvoiceDraftState } from 'src/app/store/invoiceDraft/invoiceDraft.models';

@Component({
  templateUrl: './invoice-check.component.html',
  styleUrls: ['./invoice-check.component.css'],
})
export class InvoiceCheckComponent implements OnInit {
  template: number = 1;
  public clicked = false;
  invoiceFromStore: any;
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private store: Store<InvoiceDraftState>,
    public crudApi: CrudInvoiceService,
    private invoiceState: State<InvoiceDraftState>
  ) {}

  ngOnInit(): void {
    this.invoiceState.subscribe((data: any) => {
      this.invoiceFromStore = data.invoiceDraft.invoiceDraft;
      this.template = this.invoiceFromStore[0]?.templateNo ?? 3;
    });
  }

  emitEventToTemplate() {
    this.store.dispatch(saveInvoiceTemplate({ data: this.template }));
    this.router.navigate(['dashboard', 'invoices', 'ready']);
  }
  chooseTemplate(templateNumber: number) {
    this.template = templateNumber;
  }
}
