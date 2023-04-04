import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { response } from 'express';
import { catchError, lastValueFrom, map } from 'rxjs';
import { createOrganizationSuccess } from 'src/app/store/organization/organization.actions';
import { Client, Organization } from '../types/invoice';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralCrudService {
  configUrl: 'http://localhost:3000/' = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store
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
    this.store.dispatch(createOrganizationSuccess({ id: id }));
  }
  // Fetch Single client Object
  GetObject(path: string, id: string) {
    return this.http.get(this.configUrl + path + '/' + id);
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
