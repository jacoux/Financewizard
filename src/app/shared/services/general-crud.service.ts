import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { response } from 'express';
import { catchError, lastValueFrom, map } from 'rxjs';
import { createOrganizationSuccess } from 'src/app/store/organization/organization.actions';
import { State } from 'src/app/store/users/users.reducer';
import { Client, Organization } from '../types/invoice';
import { AuthService } from './auth.service';
import { getUsers } from 'src/app/store/users/users.selectors';
import { userInfo } from 'os';
import PocketBase from 'pocketbase';


@Injectable({
  providedIn: 'root',
})
export class GeneralCrudService {
  configUrl: 'http://127.0.0.1:8090/api/collections/' =
    'http://127.0.0.1:8090/api/collections/';

  pb = new PocketBase('http://127.0.0.1:8090');

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<State>
  ) {}
  async AddObject(org: Organization, path: string) {
    const url = this.configUrl + path;
    const res = await lastValueFrom(
      this.http.post(url, org, {
        headers: { 'Content-Type': 'application/json' },
      })
    );
    const response: any = res;
    const id = response.data.id;
    this.authService.UpdateUser(id);
    debugger;
    this.store.dispatch(createOrganizationSuccess({ id: id }));
  }

  async AddCompany(org: Organization, path: string) {
    let user: any;
    this.store.subscribe((userInfo) => {
      debugger;
      user = userInfo;
    });

    // example create data
    const data = {
      companyId: 123,
      employees: user.id,
      companyName: org.companyName,
      companyVat: org.companyVat,
      description: null,
      address: org.address,
      responsible: user.id,
      bank: 'JSON',
      defaultInvoiceDetails: 'JSON',
    };

    const record = await this.pb.collection('companies').create(data);

    const response: any = record;
    const id = response.data.id;
    this.authService.UpdateUser(id);
    debugger;
    this.store.dispatch(createOrganizationSuccess({ id: id }));
  }

  // Fetch Single client Object
  async GetObject(path: string, id: string) {
    const res = await lastValueFrom(
      this.http.get(this.configUrl + path + '/' + id)
    );
    const response: any = res;
    return response;
  }

  AddObjectNotAsync(data: any, path: string) {
    const url = this.configUrl + path;
    // auth_token; =
    this.http.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${auth_token}`,
      },
    });
  }

  // Fetch clients List
  GetObjectsList(path: string) {
    return this.http.get(this.configUrl + path);
  }
  // Update client Object
  Updateobject(client: Client) {}

  // Delete client Object
  Deleteobject(id: string) {}

  checkVat(vat: string) {
    return this.http.get(
      'https://controleerbtwnummer.eu/api/validate/' + vat + '.json'
    );
  }
}
