import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Organization } from 'src/app/shared/types/invoice';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  organization!: Organization;
  showAlert: boolean = false;
  view!: string;
  logo: string = "";
  organizationForm = new UntypedFormGroup({
    id: new UntypedFormControl(null, [Validators.required]),
    companyName: new UntypedFormControl(null, [Validators.required]),
    companyEmail: new UntypedFormControl(null, [Validators.required]),
    companyVat: new UntypedFormControl(null, [Validators.required]),
    address: new UntypedFormGroup({
      streetName: new UntypedFormControl(null, [Validators.required]),
      streetNumber: new UntypedFormControl(null, [Validators.required]),
      busNumber: new UntypedFormControl(null, [Validators.required]),
      postalCode: new UntypedFormControl(null, [Validators.required]),
      city: new UntypedFormControl(null, [Validators.required]),
      country: new UntypedFormControl(null, [Validators.required]),
    }),
    bank: new UntypedFormGroup({
      bankAccountNumber: new UntypedFormControl(null, [Validators.required]),
      swift: new UntypedFormControl(null, [Validators.required]),
      nameBankAccount: new UntypedFormControl(null, [Validators.required]),
    }),
    defaultInvoiceDetails: new UntypedFormGroup({
      footer: new UntypedFormControl(null, [Validators.required]),
      invoiceNumberStart: new UntypedFormControl(null, [Validators.required]),
      subTitle: new UntypedFormControl(null, [Validators.required]),
    }),
    
  });

  constructor(private crudApi: GeneralCrudService) {}

  ngOnInit(): void {
    this.view = 'account';
    this.crudApi.getCompanyById().then((data: any) => {
      if (data === undefined) {
        alert('We hebben een probleem bij het ophalen van je pofiel');
      } else {
        this.organization = data;
         this.logo = environment.apiUrl + '/api/files/companies/' + data.id + '/' + data.logo;
        this.initForm();
      }
    });
  }

  initForm() {
    this.organizationForm.patchValue({
      companyName: this.organization.companyName,
      id: this.organization.id,
      companyVat: this.organization.companyVat,
      address: this.organization.address,
      bank: this.organization.bank,
      defaultInvoiceDetails: this.organization.defaultInvoiceDetails,
    });
  }

  loadFile(event: any) {
    var input = event.target;
    var file = input.files[0];
    var type = file.type;
    var output = document.getElementById('preview_img');
    // @ts-expect-error
    output.src = URL.createObjectURL(event.target.files[0]);
    // @ts-expect-error

    output.onload = function () {
      // @ts-expect-error

      URL.revokeObjectURL(output.src); // free memory
    };
  }

  submitOrganizationData() {
    this.crudApi.updateCompany(this.organizationForm.value).then(resp => {
      resp.id;
              this.showAlert = true;
      setTimeout( () => {
        this.showAlert = false;
      }, 5000); //displays msg in 10 seconds

    });
  }
}
