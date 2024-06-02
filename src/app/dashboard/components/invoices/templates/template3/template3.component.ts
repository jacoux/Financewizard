import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { getOrganization } from 'src/app/store/organization/organization.selectors';
import { Store } from '@ngrx/store';
import { Invoice, Organization } from 'src/app/shared/types/invoice';
import { getInvoiceDraft } from 'src/app/store/invoiceDraft/invoiceDraft.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
})
export class Template3Component implements OnInit {
  @Input() events!: Observable<void>;
  @ViewChild('htmlData') htmlData!: ElementRef;
  eventsSubscription: any;
  invoiceData!: Invoice;
  invoiceProducts: any;
  logo: string | undefined;
  org!: Organization;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getInvoiceDraft).subscribe((data) => {
      this.invoiceData = data[0];
      this.invoiceProducts = data[1];
    });
    this.store.select(getOrganization).subscribe((data) => {
      this.org = data;
      if (data.logo) {
        this.logo =
          environment.apiUrl +
          '/api/files/companies/' +
          data.id +
          '/' +
          data.logo;
      } else {
        this.logo = 'Nog geen logo opgeladen';
      }
    });
    this.eventsSubscription = this.events.subscribe(() => this.openPDF());
  }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData3');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.invoiceData.invoiceName + '.pdf');
    });
  }
}
