import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesComponent } from './estimates.component';

describe('EstimatesComponent', () => {
  let component: EstimatesComponent;
  let fixture: ComponentFixture<EstimatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
