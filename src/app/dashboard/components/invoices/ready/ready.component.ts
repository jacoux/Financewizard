import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';
@Component({
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css'],
})
export class ReadyComponent implements OnInit {
  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.surprise();
  }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes
    });

    myConfetti({
      particleCount: 300,
      startVelocity: 60,
      spread: 180,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    });
  }
}
