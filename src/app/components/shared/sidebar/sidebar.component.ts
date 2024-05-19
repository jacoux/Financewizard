import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user!: User;

  constructor() {}

  ngOnInit(): void {
    // @ts-expect-error
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }
}
