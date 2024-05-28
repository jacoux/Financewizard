import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudInvoiceService } from 'src/app/shared/services/crud-invoice.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Invoice } from 'src/app/shared/types/invoice';

@Component({
  selector: 'app-estimates-overview',
  templateUrl: './estimates-overview.component.html',
  styleUrls: ['./estimates-overview.component.sass'],
})
export class EstimatesOverviewComponent implements OnInit {
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
