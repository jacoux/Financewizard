import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';

@Component({
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.sass']
})
export class CreateClientComponent implements OnInit {



  public clientForm!: FormGroup;
  p: number = 1;
  clients: any;
  hideWhenNoClient: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  constructor(
    public crudApi: CrudClientService,
    public fb: FormBuilder,
    private database: AngularFireDatabase
  ) {
  }
  ngOnInit() {
    this.database.list('/clients-list').valueChanges().subscribe(list => {
      this.clients = list ?? []
    })
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
    this.crudApi.Addclient(this.clientForm.value);
    this.ResetForm();
  }
}