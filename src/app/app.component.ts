import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invoice-tool-final';
  constructor(translate: TranslateService, public authService: AuthService) {
           translate.setDefaultLang('en');
        translate.use('en');
  }
  ngOnInit(): void {}
}
