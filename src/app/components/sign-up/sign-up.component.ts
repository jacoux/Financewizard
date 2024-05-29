import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  passwordTooShort: boolean = true;
  hasOneNumber: boolean = false;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
  validated(event: any) {
    if (event.target.value.length < 7) {
            this.passwordTooShort = true;
    }
    else {
      this.passwordTooShort = false;
    }

    if (this.hasNumber(event.target.value)) {
      this.hasOneNumber = true
    } else {
              this.hasOneNumber = false

     }
  }
  
 hasNumber(myString: string) {
  return /\d/.test(myString);
}
}
