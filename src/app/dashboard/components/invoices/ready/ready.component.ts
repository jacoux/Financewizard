import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
@Component({
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css'],
})
export class ReadyComponent implements OnInit {
  constructor(private renderer2: Renderer2, private elementRef: ElementRef, private invoiceService: CrudInvoiceService) {}
  ngOnInit(): void {
    this.surprise();
    this.invoiceService.AddInvoice();
  }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes
    });

    myConfetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 180,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    });
  }
}
