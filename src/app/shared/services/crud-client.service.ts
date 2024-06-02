import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, ClientResponse } from '../types/invoice';
import PocketBase, { RecordModel } from 'pocketbase';
import { result } from 'lodash';
import { AllClientsComponent } from 'src/app/dashboard/components/client/all-clients/all-clients.component';
import { EventEmitter } from 'stream';
import { User } from '../types/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CrudClientService {
  env = environment.apiUrl;
  pb = new PocketBase(environment.apiUrl);
  configUrl = this.env + '/api/collections/clients';
  auth_token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  async Addclient(client: Client) {
    // @ts-expect-error
    const user: User = JSON.parse(localStorage.getItem('user'));
     const id = user.linkedCompany
       ? user.linkedCompany
       : user.linkedCompany?.[0];
    
    client.companyId = id;

    // };
    const record = await this.pb
      .collection('clients')
      .create(client, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((value) => {
        if (value.id) {
          alert('Client created successfully');
        }
      });
  }

  async deleteClient(id: string) {
    await this.pb.collection('clients').delete(id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth_token}`,
      },
    });
  }

  // Fetch Single client Object
  async getclient(id: string) {
    let client = undefined;
    const record = this.pb
      .collection('clients')
      .getOne(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((value) => {
        if (value) {
          client = value;
        } else {
          client = undefined;
        }
      });
    await record;
    return client;
  }
  // Fetch clients List
  async getclientsList() {
        let clients: any[] = [];
        const auth_token = localStorage.getItem('token');
        const records = await this.pb
          .collection('clients')
          .getFullList({
            sort: '-created',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth_token}`,
            },
          })
          .then((data) => {
            debugger;
            if (data?.length) {
              clients = data;
            } else {
              clients = [];
            }
          });
    return clients;
    
  }
  // Update client Object
  async updateclient(id: string, client: Client) {
    const record = await this.pb.collection('clients').update(id, client, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth_token}`,
      },
    });
    return record;
  }
  // Delete client Object
  deleteclient(id: string) {}
}
