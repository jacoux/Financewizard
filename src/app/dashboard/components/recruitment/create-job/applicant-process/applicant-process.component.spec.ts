import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProcessComponent } from './applicant-process.component';

describe('ApplicantProcessComponent', () => {
  let component: ApplicantProcessComponent;
  let fixture: ComponentFixture<ApplicantProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
