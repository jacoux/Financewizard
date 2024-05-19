import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { response } from 'express';
import { catchError, lastValueFrom, map } from 'rxjs';
import { createOrganizationSuccess } from 'src/app/store/organization/organization.actions';
import { State } from 'src/app/store/users/users.reducer';
import { Client, Organization, Product } from '../types/invoice';
import { AuthService } from './auth.service';
import { getUsers } from 'src/app/store/users/users.selectors';
import { userInfo } from 'os';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class GeneralCrudService {
  configUrl = environment.apiUrl + '/api/collections/';
  auth_token = localStorage.getItem('token');

  pb = new PocketBase(environment.apiUrl);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store<State>,
    private router: Router
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
    // @ts-expect-error
    const user = JSON.parse(localStorage.getItem('user')) as User;

    // this.store.subscribe((userInfo) => {
    //   debugger;
    //   user = userInfo;
    // });

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
    const id = response.id;

    this.authService.UpdateUserAfterAssignedToOrganisation(id);
    debugger;
    this.store.dispatch(createOrganizationSuccess({ id: id }));
    this.router.navigate(['dashboard']);
  }

  async updateCompany(org: Organization) {
    const record = await this.pb.collection('companies').update(org.id, org);
    return record;
  }

  async getCompanyById() {
    debugger;
    const auth_token = localStorage.getItem('token');
    // @ts-expect-error
    const user = JSON.parse(localStorage.getItem('user')) as User;
    const id = user.companyId;
    let company;
    const record = await this.pb
      .collection('companies')
      .getOne(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`,
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

  async AddProduct(product: Product) {
    this.pb.collection('products').create(product, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth_token}`,
      },
    });
  }

  async deleteProduct(id: string) {
    await this.pb.collection('products').delete(id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth_token}`,
      },
    });
  }

  async getProduct(id: string) {
    let product;
    const record = await this.pb
      .collection('products')
      .getOne(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((value) => {
        if (value) {
          product = value;
        } else {
          product = undefined;
        }
      });
    await record;
    return product;
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
        Authorization: `Bearer ${this.auth_token}`,
      },
    });
  }

  // Fetch clients List
  GetObjectsList(path: string) {
    const auth_token = localStorage.getItem('token');
    const apiUrl = this.configUrl + path;
    const headers = { Authorization: auth_token };
    // @ts-expect-error

    return this.http.get(apiUrl, { headers });
  }

  checkVat(vat: string) {
    return this.http.get(
      'https://controleerbtwnummer.eu/api/validate/' + vat + '.json'
    );
  }
}
