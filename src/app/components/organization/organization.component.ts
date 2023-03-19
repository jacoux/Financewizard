import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Organization } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.sass']
})
export class OrganizationComponent implements OnInit {
  public organizationForm!: UntypedFormGroup;
  organization: any;

  constructor() { }

  ngOnInit(): void {
  }

  submitOrganizationData(){    

  }

}
