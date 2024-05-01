import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudProductService } from 'src/app/shared/services/crud-products.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Product } from 'src/app/shared/types/invoice';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent implements OnInit {
  public productForm!: UntypedFormGroup;
  products: Product[] = [];
  displayedColumns: string[] = [
    'price',
    'name',
    'vat',
    'description',
    'isHourlyRate',
  ];
  dataSource = new MatTableDataSource(this.products);
  visible = false;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,

    public crudApi: GeneralCrudService,
    public fb: UntypedFormBuilder,
    private database: AngularFireDatabase
  ) {}
  ngOnInit() {
    this.crudApi
      .GetObjectsList('products/records')
      // @ts-ignore
      .subscribe((data: ProductResponse) => {
        this.products = data.items;
        this.dataSource = new MatTableDataSource(this.products);
      });
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  addClass() {
    this.visible = !this.visible;
  }

  addCustomProduct(product: any) { 
    debugger;
    this.crudApi.AddProduct(product);
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

