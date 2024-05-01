import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';

@Component({
  templateUrl: './invoice-check.component.html',
  styleUrls: ['./invoice-check.component.css']
})
export class InvoiceCheckComponent implements OnInit {
  template: number = 1;
    public clicked = false;
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(
    private router: Router,
    public crudApi: CrudInvoiceService,
  ) { }

  ngOnInit(): void {
  }

  emitEventToTemplate() {
    this.eventsSubject.next();
        // this.crudApi.AddInvoice();

    this.router.navigate(['dashboard','invoices', 'ready']);
}
  chooseTemplate(templateNumber:number) {
    this.template = templateNumber;
  }

}
