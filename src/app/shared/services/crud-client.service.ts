import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Client } from '../types/invoice';

@Injectable({
  providedIn: 'root'
})
export class CrudClientService {
  clientsRef!: AngularFireList<any>;
  clientRef!: AngularFireObject<any>;
  configUrl: "http://localhost:3000/clients" = "http://localhost:3000/clients";

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

  Addclient(client: Client) {
  }
  // Fetch Single client Object
  Getclient(id: string) {
      return this.http.get<Client>(this.configUrl + '/' + id);
  }
  // Fetch clients List
  GetclientsList() {
      return this.http.get<Client>(this.configUrl);
  }
  // Update client Object
  Updateclient(client: Client) {
  }
  // Delete client Object
  Deleteclient(id: string) {

  }
}
