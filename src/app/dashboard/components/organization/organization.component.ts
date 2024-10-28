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
  formData = new FormData();
  organization!: Organization;
  showAlert: boolean = false;
  view!: string;
  isNewCompany: boolean = false;
  logo: string = '';
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
    logo: new UntypedFormControl(this.logo, [Validators.required]),

  });

  constructor(private crudApi: GeneralCrudService) {}

  ngOnInit(): void {
    this.view = 'account';
    // @ts-expect-error
    const user = JSON.parse(localStorage.getItem('user')) as User;
    const id = user.linkedCompany
      ? user.linkedCompany
      : user.linkedCompany?.[0];
    
    if (!id) {
      this.isNewCompany = true;
    } else {
      this.crudApi.getCompanyById().then((data: any) => {
        if (data === undefined) {
          alert('We hebben een probleem bij het ophalen van je pofiel');
        } else {
          this.organization = data;
          this.logo =
            environment.apiUrl +
            '/api/files/companies/' +
            data.id +
            '/' +
            data.logo;
          this.initForm();
        }
      });
    }
  }

  initForm() {
    this.organizationForm.patchValue({
      companyName: this.organization?.companyName,
      id: this.organization.id,
      companyVat: this.organization.companyVat,
      address: this.organization.address,
      bank: this.organization.bank,
      defaultInvoiceDetails: this.organization.defaultInvoiceDetails,
    });
  }

  loadFile(event: any) {
    debugger;
    var input = event.target;
    var file = input.files[0];
    var type = file.type;
    var output = document.getElementById('preview_img');
    // @ts-expect-error
    output.src = URL.createObjectURL(event.target.files[0]);
    this.logo = event.target.files[0]
    // @ts-expect-error

    output.onload = function () {
      // @ts-expect-error

      URL.revokeObjectURL(output.src); // free memory
    };

  }


 appendFormData(data: string | object, parentKey = "") {
  if (data && typeof data === "object" && !(data instanceof File)) {
    Object.entries(data).forEach(([key, value]) => {
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          this.appendFormData(item, `${formKey}[${index}]`);
        });
      } else if (typeof value === "object" && value !== null) {
        this.appendFormData(value, formKey);
      } else {
        this.formData.append(formKey, value);
      }
    });
  } else {
    this.formData.append(parentKey, data);
  }
}



  submitOrganizationData() {
    debugger;
    // Use the function to add the form fields to FormData
    this.appendFormData(this.organizationForm.value);
    this.formData.forEach((value, key) => {
      console.log(key, value);
    });
    if (!this.isNewCompany) {
      this.crudApi.updateCompany(this.organizationForm.value.id, this.formData).then((resp) => {
        resp.id;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000); 
      });
    }
  }
}
