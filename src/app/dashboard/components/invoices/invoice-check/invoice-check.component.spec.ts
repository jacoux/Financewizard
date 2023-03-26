import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCheckComponent } from './invoice-check.component';

describe('InvoiceCheckComponent', () => {
  let component: InvoiceCheckComponent;
  let fixture: ComponentFixture<InvoiceCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
