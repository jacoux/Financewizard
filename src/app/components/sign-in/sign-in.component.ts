import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn(email: string, password: string) {
    this.authService.SignIn(email, password).subscribe((result) => {
      if (result) {
        this.router.navigate(['dashboard']);
      } else {
        alert(' er liep iets mis');
      }
      console.log(result);
      debugger;
    });
  }
}
