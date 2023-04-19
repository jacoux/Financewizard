import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/shared/types/recruitments';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.sass'],
})
export class JobDetailComponent implements OnInit {
  Tab = Tab;
  tab: Tab = Tab.GENERAL;
  constructor() {}

  ngOnInit(): void {}
}
