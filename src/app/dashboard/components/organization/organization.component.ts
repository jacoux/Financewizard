import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Organization } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.sass'],
})
export class OrganizationComponent implements OnInit {
  organization!: Organization;
  view!: string;
  organizationForm = new UntypedFormGroup({
    companyName: new UntypedFormControl(null, [Validators.required]),
    companyEmail: new UntypedFormControl(null, [Validators.required]),
    companyVat: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(private crudApi: GeneralCrudService) {}

  ngOnInit(): void {
    this.view = 'account';
    this.crudApi.GetObjectsList('organizations').subscribe((data: any) => {
      this.organization = data[0];
      this.initForm();
    });
  }

  initForm() {
    this.organizationForm.patchValue({
      companyName: this.organization.name,
      companyEmail: this.organization.companyEmail,
      companyVat: this.organization.companyVat,
    });
  }

  submitOrganizationData() {}
}
