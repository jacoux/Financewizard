import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCandidatesComponent } from './all-candidates.component';

describe('AllCandidatesComponent', () => {
  let component: AllCandidatesComponent;
  let fixture: ComponentFixture<AllCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
