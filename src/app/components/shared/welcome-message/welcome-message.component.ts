import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeMessageComponent implements OnInit {
  user!: User;
  id!: string;
  constructor(public authService: AuthService, private cds: ChangeDetectorRef) {}

  ngOnInit(): void {
    // @ts-expect-error
    this.user = JSON.parse(localStorage.getItem('user')) as User;
         this.id = this.user.linkedCompany
           ? this.user.linkedCompany
           : this.user.linkedCompany?.[0];
    this.cds.detectChanges();
  }
}
