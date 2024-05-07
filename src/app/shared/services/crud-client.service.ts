import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client, ClientResponse } from '../types/invoice';
import PocketBase from 'pocketbase';
import { result } from 'lodash';
import { AllClientsComponent } from 'src/app/dashboard/components/client/all-clients/all-clients.component';
import { EventEmitter } from 'stream';
import { User } from '../types/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CrudClientService {
  env = environment.apiUrl
  pb = new PocketBase(environment.apiUrl);
  configUrl = this.env + '/api/collections/clients';

  constructor(private http: HttpClient) {}

  async Addclient(client: Client) {
    // @ts-expect-error
    const user: User = JSON.parse(localStorage.getItem('user'));
    client.companyId = user.companyId;

    //     dummy DataTransferconst data = {
    //     "name": "test",
    //     "vat": "test",
    //     "responsible": "test",
    //     "email": "test@example.com",
    //     "firstName": "test",
    //     "tel": "test",
    //     "companyId": "RELATION_RECORD_ID",
    //     "lastName": "test",
    //     "address": "JSON"
    // };
    const record = await this.pb
      .collection('clients')
      .create(client)
      .then((value) => {
        if (value.id) {
          alert('Client created successfully');
        }
      });
  }

  async deleteClient(id: string) {
    await this.pb.collection('clients').delete(id);
  }

  // Fetch Single client Object
  async getclient(id: string) {
    let client = undefined;
    const record = this.pb
      .collection('clients')
      .getOne(id)
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
  GetclientsList() {
    return this.http.get<ClientResponse>(
      environment.apiUrl +'/api/collections/clients/records'
    );
  }
  // Update client Object
  async updateclient(id: string, client: Client) {
    const record = await this.pb.collection('clients').update(id, client);
    return record;
  }
  // Delete client Object
  deleteclient(id: string) {}
}
