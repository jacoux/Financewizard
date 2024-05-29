import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';

@Component({
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.sass'],
})
export class CreateJobComponent implements OnInit {
  createJobGeneralForm = new UntypedFormGroup({
    title: new UntypedFormControl(null, [Validators.required]),
    department: new UntypedFormControl(null, [Validators.required]),
    employmentRatio: new UntypedFormControl(null, [Validators.required]),
    maxAmountOfApplicants: new UntypedFormControl(null, [Validators.required]),
    contractTerm: new UntypedFormControl(null, [Validators.required]),
    salaryPackage: new UntypedFormControl(null, [Validators.required]),
    experience: new UntypedFormControl(null, [Validators.required]),
    responsible: new UntypedFormControl(null, [Validators.required]),
    address: new UntypedFormGroup({
      streetName: new UntypedFormControl(null, [Validators.required]),
      streetNumber: new UntypedFormControl(null, [Validators.required]),
      streetBus: new UntypedFormControl(null, [Validators.required]),
      city: new UntypedFormControl(null, [Validators.required]),
      postalCode: new UntypedFormControl(null, [Validators.required]),
      country: new UntypedFormControl(null, [Validators.required]),
    }),
  });
  constructor(private crudApi: GeneralCrudService) {}

  ngOnInit(): void {}

  getLocation(e: number) {
    if (e == 1) {
      const address = {
        streetName: 'Remylaan',
        streetNumber: 4,
        streetBus: null,
        city: 'Leuven',
        postalCode: 3000,
        country: 'Belgium',
      };
      this.createJobGeneralForm.get('address')?.setValue(address);
    }
  }

  submit(): void {
    this.crudApi.AddObjectNotAsync(this.createJobGeneralForm.value, 'jobs');
  }
}
