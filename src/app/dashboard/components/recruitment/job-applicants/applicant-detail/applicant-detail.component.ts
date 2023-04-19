import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/shared/types/recruitments';

@Component({
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.sass'],
})
export class ApplicantDetailComponent implements OnInit {
  Tab = Tab;
  tab: Tab = Tab.GENERAL;
  constructor() {}

  ngOnInit(): void {
    this.tab = this.Tab.GENERAL;
  }
}
