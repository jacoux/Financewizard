import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
})
export class Template2Component implements OnInit {
  @Input()events!: Observable<void>;
  @ViewChild('htmlData') htmlData!: ElementRef;
  eventsSubscription: any;

 ngOnInit(): void {
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
