import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudCompanyService {
  auth_token = localStorage.getItem('token');

  pb = new PocketBase(environment.apiUrl);
  constructor() { }
  

  async getCompanyFromUser(companyId: string) {
    let company;
    const record = await this.pb
      .collection('companies')
      .getOne(companyId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((value) => {
        if (value) {
          company = value;
        } else {
          company = undefined;
        }
      });
    await record;
    return company;
  }
}
