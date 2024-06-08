import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
import { Template1Component } from '../templates/template1/template1.component';
import { Template2Component } from '../templates/template2/template2.component';
import { Template3Component } from '../templates/template3/template3.component';
import { Store } from '@ngrx/store';
import { InvoiceDraftState } from 'src/app/store/invoiceDraft/invoiceDraft.models';
import { getInvoiceDraft } from 'src/app/store/invoiceDraft/invoiceDraft.selectors';
import { Subject } from 'rxjs';
@Component({
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css'],
})
export class ReadyComponent implements OnInit {
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private invoiceService: CrudInvoiceService,
    private invoiceStore: Store<InvoiceDraftState>,
  ) {}
  @ViewChild(Template1Component) template1!: Template1Component;
  @ViewChild(Template2Component) template2!: Template2Component;
  @ViewChild(Template3Component) template3!: Template3Component;
  templateInInvoice!: number;
  eventsSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
  // this.surprise();
    this.invoiceStore.select(getInvoiceDraft).subscribe((data) => {
      this.templateInInvoice = data?.templateNo;
    });
    this.invoiceService.AddInvoice();

  }

  downloadInvoice() {
    // this.eventsSubject.next();

    switch (this.templateInInvoice) {
      case 1:
        return this.template1.openPDF();
      case 2:
        return this.template2.openPDF();
      case 3:
        return this.template3.openPDF();
    }
  }
}
