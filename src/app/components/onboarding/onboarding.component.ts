import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Organization } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.sass']
})
export class OnboardingComponent implements OnInit {
  step: Number = 1
  companyType!: string;
  compDetail!: Organization;
  companyForm = new UntypedFormGroup({
    name: new UntypedFormControl(null, [Validators.required]),
    companyVat: new UntypedFormControl(new Date(), [Validators.required]),
    type: new UntypedFormControl(this.companyType, [Validators.required]),
    //TODO: adres toevoegen
  })
  constructor() { }

  ngOnInit(): void {
  }

  setType(type: any) {
    this.companyType = type;
  }

}
