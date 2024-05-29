import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { AccountType, Organization } from 'src/app/shared/types/invoice';
import { mainRole } from 'src/app/shared/types/roles';
import { User } from 'src/app/shared/types/user';
import {
  setOrganizationData,
  setCompanyInfo,
  setStep,
  setType,
  createOrganization,
} from 'src/app/store/organization/organization.actions';
import { organizationState } from 'src/app/store/organization/organization.models';
import { State } from 'src/app/store/organization/organization.reducer';
import {
  getOrganization,
  getOrganizationStatus,
} from 'src/app/store/organization/organization.selectors';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  AccountType = AccountType;
  companyType!: AccountType;
  user!: User;
  description!: number;
  validVat!: boolean;
  compDetail!: Organization;
  companyForm = new UntypedFormGroup({
    companyEmail: new UntypedFormControl(null, [Validators.required]),
    companyName: new UntypedFormControl(null, [Validators.required]),
    employee: new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required]),
      role: new UntypedFormControl(null, [Validators.required]),
    }),
    companyVat: new UntypedFormControl(null, [Validators.required]),
    type: new UntypedFormControl(this.companyType, [Validators.required]),
    address: new UntypedFormGroup({
      streetName: new UntypedFormControl(null, [Validators.required]),
      streetNumber: new UntypedFormControl(null, [Validators.required]),
      busNumber: new UntypedFormControl(null, [Validators.required]),
      postalCode: new UntypedFormControl(null, [Validators.required]),
      city: new UntypedFormControl(null, [Validators.required]),
      country: new UntypedFormControl('Belgium', [Validators.required]),
    }),
  });
  statusSub$!: Observable<number>;
  step!: number;
  stepvalue$!: Observable<number>;
  organization$!: Observable<Organization>;

  constructor(
    private crudApi: GeneralCrudService,
    private store: Store<State>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.stepvalue$ = this.store.select(getOrganizationStatus);
    this.stepvalue$.subscribe((step) => {
      this.step = step;
    });
    this.store.select(getOrganization).subscribe((org) => {
      this.description = org?.description;
      this.companyType = org?.accountType;
      const address = this.companyForm.get('address');
      // if (this.step === 3 && address?.get('name') === null) {
      if (this.step === 3) {
        this.companyForm.patchValue(org);
      }
    });
    const comp = this.companyForm.get('companyVat');
    comp?.valueChanges.subscribe((value) => {
      this.checkVat(value);
    });
  }

  checkVat(vat: any) {
    if (vat?.length > 11) {
      this.crudApi.checkVat(vat).subscribe((data: any) => {
        this.validVat = false;
        this.validVat = data.valid;
        if (this.validVat) {
          this.companyForm.get('companyName')?.setValue(data.name);
          const comp = this.companyForm.get('address');
          comp?.get('streetName')?.setValue(data.address.street);
          comp?.get('streetNumber')?.setValue(data.address.number);
          comp?.get('city')?.setValue(data.address.city);
          comp?.get('postalCode')?.setValue(data.address.zip_code);
          comp?.get('country')?.setValue("België");
        }
      });
    } else {
      this.validVat = false;
    }
  }

  setType(type: any) {
    this.companyType = type;
    this.store.dispatch(setType({ status: 2, data: this.companyType }));
  }

  setStep(step: any) {
    this.step = step;
    this.store.dispatch(setStep({ status: step }));
  }

  saveCompany() {
    // const employee = this.companyForm.get('employee');
    // this.companyForm
    //   .get('companyEmail')
    //   ?.setValue(this.authService.userData.email);
    // employee?.get('email')?.setValue(this.authService.userData.email);
    // employee?.get('role')?.setValue(mainRole.ADMIN);
    // this.companyForm.setErrors;
    this.store.dispatch(
      setCompanyInfo({ organization: this.companyForm.value, status: 4 })
    );
  }

  createOrg() {
    // this.store.dispatch(createOrganization());
    this.crudApi.AddCompany(this.companyForm.value, 'organizations');
  }

  setDescription(desc: any) {
    this.description = desc;
    this.store.dispatch(
      setOrganizationData({ status: 1, data: this.description })
    );
  }
}
