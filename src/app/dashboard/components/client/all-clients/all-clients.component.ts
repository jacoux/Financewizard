import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudClientService } from 'src/app/shared/services/crud-client.service';
import { Client, ClientResponse } from 'src/app/shared/types/invoice';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'all-clients-overview',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css'],
})
export class AllClientsComponent implements OnInit, AfterViewInit {
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
    private _liveAnnouncer: LiveAnnouncer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.crudApi
      .getclientsList()
      .then(
        (data) => (
          (this.clients = data),
          (this.dataSource = new MatTableDataSource(this.clients))
        )
      );

    // this.dataSource.sort = this.sort;

    // const sortState: Sort = { active: 'name', direction: 'desc' };
    // this.sort.active = sortState?.active;
    // this.sort.direction = sortState?.direction;
    // this.sort.sortChange.emit(sortState);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  deleteClient(id: string) {
    this.crudApi.deleteClient(id).then((response) => {
         this.ngOnInit;
    })
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
    this.ngOnInit();
  }

  addNewClient() {
    this.client = undefined;
    this.visible = true; // Opens a non-modal dialog
    this.cdr.detectChanges();
  }
}



