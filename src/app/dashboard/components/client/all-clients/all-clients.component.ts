import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { Client, ClientResponse } from 'src/app/shared/types/invoice';

@Component({
  selector:"all-clients-overview",
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.sass']
})
export class AllClientsComponent implements OnInit {
  clients: Client[] = [];
  constructor(
    public crudApi: CrudClientService,
  ) {
  }
  ngOnInit() {
  this.crudApi.GetclientsList().subscribe((data: ClientResponse) => this.clients = data.items);

  }

}

