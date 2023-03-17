import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Organization } from '../types/invoice';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  organizationsRef!: AngularFireList<any>;
  organizationRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
// @TODO more than one organization only for premium
  AddOrganization(organization:Organization){
    const list = this.db.list('/organizations');
    list.push({
      organizationName: organization.companyName,
      organizationVat: organization.companyVat,
      organizationEmail: organization.companyEmail,
      organizationAddress: organization.address,
      organizationBank: organization.bank,
      organizationResponsible: organization.responsible,
      organizationDefaultInvoiceDetails: organization.defaultInvoiceDetails,
    });
  }
  
// @TODO more than one organization only for premium
  DeleteOrganization(id: string){
    this.organizationRef = this.db.object('/organizations' + id);
    this.organizationRef.remove();
  }

  getOrganization(id: string){
    this.organizationRef = this.db.object('organizations/' + id);
    return this.organizationRef;
  }

  getOrganizationsList(){
    this.organizationsRef = this.db.list('organizations');
    return this.organizationsRef;
  }

  addExtraBankAccountToOrganization(){

  }

  addUsersToOrganization(){
    
  }


}
