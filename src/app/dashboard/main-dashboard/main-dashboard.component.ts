import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.sass']
})
export class MainDashboardComponent implements OnInit {

  constructor( public authService: AuthService) { }

  ngOnInit(): void {
  }

}
