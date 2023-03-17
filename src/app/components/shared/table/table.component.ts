import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/types/invoice';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  @Input() products!: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
