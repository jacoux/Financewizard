import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Client, ClientResponse } from '../types/invoice';

@Injectable({
  providedIn: 'root',
})
export class CrudClientService {
  clientsRef!: AngularFireList<any>;
  clientRef!: AngularFireObject<any>;
  configUrl: 'http://127.0.0.1:8090/api/collections/clients' =
    'http://127.0.0.1:8090/api/collections/clients';

  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  Addclient(client: Client) {}
  // Fetch Single client Object
  Getclient(id: string) {
    return this.http.get<Client>(this.configUrl + '/records/' + id);
  }
  // Fetch clients List
  GetclientsList() {
    return this.http.get<ClientResponse>('http://127.0.0.1:8090/api/collections/clients/records');
  }
  // Update client Object
  Updateclient(client: Client) {}
  // Delete client Object
  Deleteclient(id: string) {}
}
