import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesOverviewComponent } from './estimates-overview.component';

describe('EstimatesOverviewComponent', () => {
  let component: EstimatesOverviewComponent;
  let fixture: ComponentFixture<EstimatesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatesOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimatesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
