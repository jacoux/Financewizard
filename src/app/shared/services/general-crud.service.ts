import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Client, Organization } from '../types/invoice';

@Injectable({
  providedIn: 'root',
})
export class GeneralCrudService {
  configUrl: 'http://localhost:3000/' = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  AddObject(org: Organization, path: string) {
    debugger;
    const url = this.configUrl + path;
    return this.http.post(url, org, {
      headers: { 'Content-Type': 'application/json' },
    });
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
