import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { ClientResponse, Invoice, InvoiceResponse } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.sass'],
  standalone: true,
  imports: [MatTableModule, MatSortModule],
})
export class AllInvoicesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'vat'];
  invoices: Invoice[] = [];
  dataSource = new MatTableDataSource(this.invoices);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public crudApi: GeneralCrudService
  ) {}

  ngOnInit() {
    debugger;
    this.crudApi
      .GetObjectsList('invoices/records')
      // @ts-ignore
      .subscribe((data: InvoiceResponse) => {
        this.invoices = data.items;
        this.dataSource = new MatTableDataSource(this.invoices);
      });
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
