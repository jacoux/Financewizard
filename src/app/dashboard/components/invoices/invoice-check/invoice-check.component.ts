import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './invoice-check.component.html',
  styleUrls: ['./invoice-check.component.css']
})
export class InvoiceCheckComponent implements OnInit {
  template: number = 1;
    public clicked = false;
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  emitEventToTemplate() {
    this.eventsSubject.next();
    this.router.navigate(['dashboard','invoices', 'ready']);
}
  chooseTemplate(templateNumber:number) {
    this.template = templateNumber;
  }

}
