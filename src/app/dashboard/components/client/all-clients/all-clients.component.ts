import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { Client, ClientResponse } from 'src/app/shared/types/invoice';

@Component({
  selector: 'all-clients-overview',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css'],
})
export class AllClientsComponent implements OnInit {
  @ViewChild('mydialog') myDialog!: any;
  @ViewChild(MatSort)
  clients: Client[] = [];
  client?: Client;
  visible = false;
  dataSource = new MatTableDataSource(this.clients);
  sort!: MatSort;
  displayedColumns: string[] = [
    'email',
    'name',
    'responsible',
    'vat',
    'actions',
  ];
  constructor(
    public crudApi: CrudClientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.crudApi
      .GetclientsList()
      .subscribe(
        (data: ClientResponse) => (
          (this.clients = data.items),
          (this.dataSource = new MatTableDataSource(this.clients))
        )
      );

    // this.dataSource.sort = this.sort;

    // const sortState: Sort = { active: 'name', direction: 'desc' };
    // this.sort.active = sortState?.active;
    // this.sort.direction = sortState?.direction;
    // this.sort.sortChange.emit(sortState);
  }

  deleteClient(id: string) {
    this.crudApi.deleteClient(id);
    window.location.reload();
  }

  getSingleClient(id: string) {
    this.crudApi.getclient(id).then((client) => {
      this.client = client;
    });
  }

  editClient(id: number) {
    this.getSingleClient(id.toString());
    this.visible = true;
  }

  addClass() {
    this.visible = !this.visible;
  }

  addNewClient() {
    this.client = undefined;
    this.visible = true; // Opens a non-modal dialog
    this.cdr.detectChanges();
  }
}



