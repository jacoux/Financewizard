import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { Client } from 'src/app/shared/types/invoice';

@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  public clientForm!: UntypedFormGroup;
  p: number = 1;
  clients: any;
  hideWhenNoClient: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  constructor(
    public crudApi: CrudClientService,
    public fb: UntypedFormBuilder,
     ) {
  }
  ngOnInit() {
    this.studenForm();
  }

  studenForm() {
    this.clientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      vat: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
  get firstName() {
    return this.clientForm.get('firstName');
  }
  get lastName() {
    return this.clientForm.get('lastName');
  }
  get email() {
    return this.clientForm.get('email');
  }
  get mobileNumber() {
    return this.clientForm.get('mobileNumber');
  }
  get vat() {
    return this.clientForm.get('vat');
  }
  ResetForm() {
    this.clientForm.reset();
  }

  submitClientData() {
    this.crudApi.addclient(this.clientForm.value).then(() => {
      this.ResetForm();
      this.ngOnInit();
    })
  }
}
