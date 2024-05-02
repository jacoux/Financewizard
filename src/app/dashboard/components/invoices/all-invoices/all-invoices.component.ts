import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { ClientResponse, Invoice, InvoiceResponse } from 'src/app/shared/types/invoice';
import { timeout } from 'rxjs';
import { Refresh } from '@ngrx/store-devtools/src/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveInvoice } from 'src/app/store/invoiceDraft/invoiceDraft.actions';

@Component({
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.sass'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatIconModule],
})
export class AllInvoicesComponent implements OnInit {
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'vat',
    'actions',
  ];
  invoices: Invoice[] = [];
  dataSource = new MatTableDataSource(this.invoices);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    public crudApi: GeneralCrudService,
    public invoiceService: CrudInvoiceService
  ) {}

  ngOnInit() {
    this.crudApi
      .GetObjectsList('invoices/records')
      // @ts-ignore
      .subscribe((data: InvoiceResponse) => {
        this.invoices = data.items;
        this.dataSource = new MatTableDataSource(this.invoices);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  deleteInvoice(id: string) {
    this.invoiceService.deleteInvoice(id);
    window.location.reload();

  }

  editInvoice(id: number) {
      this.invoiceService.getInvoice(id.toString());
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
