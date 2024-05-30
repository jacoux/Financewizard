import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { Client } from 'src/app/shared/types/invoice';

@Component({
  selector: 'app-create-client-modal',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit, OnChanges {
  @Output() toggle = new EventEmitter<string>();
  @Input() client?: Client;
  p: number = 1;
  hideWhenNoClient: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
    public clientForm!: UntypedFormGroup;


  constructor(
    public crudApi: CrudClientService,
    public fb: UntypedFormBuilder,
  ) {}
  ngOnInit() {
    this.studenForm();
  }

  studenForm() {

      this.clientForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        vat: [''],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            ),
          ],
        ],
        tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        streetName: [''],
        streetNumber: [''],
        postalCode: [''],
        city: [''],
        country: [''],
      });
    
  }
  get name() {
    return this.clientForm.get('name');
  }

  get email() {
    return this.clientForm.get('email');
  }
  get tel() {
    return this.clientForm.get('tel');
  }
  get vat() {
    return this.clientForm.get('vat');
  }
  get country() {
    return this.clientForm.get('country');
  }
  get address() {
    const add = {
      streetName: this.clientForm.get('streetName')?.value,
      streetNumber: this.clientForm.get('streetNumber')?.value,
      postalCode: this.clientForm.get('postalCode')?.value,
      city: this.clientForm.get('city')?.value,
      country: this.clientForm.get('country')?.value,
    };
    return add;
  }
  ResetForm() {
    this.clientForm.reset();
  }

  submitClientData() {
    const valueToPush = {
      name: this.name?.value,
      vat: this.vat?.value,
      email: this.email?.value,
      tel: this.tel?.value,
      address: this.address,
    };
    if (this.client) {
    this.crudApi.updateclient(this.client?.id, valueToPush);

    } else {
    this.crudApi.Addclient(valueToPush);

    }
        this.toggle.emit();

  }
  ngOnChanges() {
    
    if (this.client) {
       this.clientForm.controls["name"].setValue(this.client?.name);
       this.clientForm.controls["email"].setValue(this.client?.email);
       this.clientForm.controls["vat"].setValue(this.client?.vat);
       this.clientForm.controls["streetName"].setValue(this.client?.address?.streetName);
       this.clientForm.controls["tel"].setValue(this.client?.tel);
       this.clientForm.controls["streetNumber"].setValue(this.client?.address?.streetNumber);
       this.clientForm.controls['postalCode'].setValue(
         this.client?.address?.postalCode
       );
       this.clientForm.controls["city"].setValue(this.client?.address?.city);
       this.clientForm.controls["country"].setValue(this.client?.address?.country);
    }
  }
  close() {
    this.toggle.emit();
  }
}
