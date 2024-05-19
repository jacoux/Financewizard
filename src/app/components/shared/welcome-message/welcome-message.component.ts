import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.sass'],
})
export class WelcomeMessageComponent implements OnInit {
  user!: User;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // @ts-expect-error
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }
}
