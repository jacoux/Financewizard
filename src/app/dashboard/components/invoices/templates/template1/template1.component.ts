import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  Injectable,
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
import { getInvoiceDraft } from 'src/app/store/invoiceDraft/invoiceDraft.selectors';
import { getOrganization } from 'src/app/store/organization/organization.selectors';
import { Organization } from 'src/app/shared/types/invoice';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
})
export class Template1Component implements OnInit {
  @Input() events!: Observable<void>;
  @ViewChild('htmlData') htmlData!: ElementRef;
  eventsSubscription: any;
  invoiceData: any;
  invoiceProducts: any;
  org!: Organization;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getInvoiceDraft).subscribe((data) => {
      this.invoiceData = data[0];
      this.invoiceProducts = data[1];
    });
    this.store.select(getOrganization).subscribe((data) => {
      this.org = data;
    });
    this.eventsSubscription = this.events.subscribe(() => this.openPDF());
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
