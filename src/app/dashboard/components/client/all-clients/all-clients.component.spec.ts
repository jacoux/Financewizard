import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsComponent } from './all-clients.component';

describe('AllClientsComponent', () => {
  let component: AllClientsComponent;
  let fixture: ComponentFixture<AllClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
