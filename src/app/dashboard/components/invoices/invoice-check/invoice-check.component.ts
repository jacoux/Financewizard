import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  invoiceId?: string;
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    private store: Store<InvoiceDraftState>,
    public crudApi: CrudInvoiceService,
    public activatedRoute: ActivatedRoute,
    public invoiceService: CrudInvoiceService,
    private invoiceState: State<InvoiceDraftState>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.invoiceId = params['id'];
      if (this.invoiceId) {
        this.invoiceService.getInvoiceWithoutNav(this.invoiceId.toString());
      }
    });
    this.invoiceState.subscribe((data: any) => {
      this.invoiceFromStore = data.invoiceDraft.invoiceDraft;
      this.template = this.invoiceFromStore[0]?.templateNo ?? 3;
    });

  }

  emitEventToTemplate() {
    this.store.dispatch(saveInvoiceTemplate({ data: this.template }));
    if (this.invoiceId) {
      this.router.navigate(['dashboard', 'invoices', 'download', this.invoiceId]);
    } else {
          this.router.navigate(['dashboard', 'invoices', 'ready']);

    }
  }
  chooseTemplate(templateNumber: number) {
    this.template = templateNumber;
  }
}
