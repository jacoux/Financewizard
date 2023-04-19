import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/types/recruitments';

@Component({
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.sass'],
})
export class RecruitmentComponent implements OnInit {
  view!: string;
  vacancies: Job[] = [];
  constructor() {}

  ngOnInit(): void {
    this.view = 'cards';

    this.vacancies = [
      {
        title: 'Huishoudhulp te Landen',
        candidates: {
          new: 2,
          total: 6,
        },
        status: 'open',
        publishedDate: '24/03/2023',
        department: 'Care',
        responsible: 'Niels',
      },
      {
        title: 'Boekhouder',
        candidates: {
          new: 2,
          total: 1,
        },
        status: 'open',
        publishedDate: '12/03/2023',
        department: 'finance',
        responsible: 'Niels',
      },
      {
        title: 'Project manager IT',
        candidates: {
          new: 0,
          total: 0,
        },
        status: 'open',
        publishedDate: '30/02/2023',
        department: 'IT',
        responsible: 'Niels',
      },
      {
        title: 'Boekhouder',
        candidates: {
          new: 0,
          total: 0,
        },
        status: 'closed',
        publishedDate: '30/10/2022',
        department: 'Finance',
        responsible: 'Niels',
      },
    ];
  }
}
