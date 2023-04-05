import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { User } from 'src/app/shared/types/user';

@Component({
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.sass'],
})
export class MainDashboardComponent implements OnInit {
  user: any;
  company: any;
  constructor(
    public authService: AuthService,
    private store: Store,
    private orgApi: GeneralCrudService
  ) {}

  ngOnInit(): void {
    debugger;
    this.user = localStorage.getItem('user');
    this.company = this.orgApi.GetObject(
      'organizations',
      this.user?.componentId
    );
  }
}
