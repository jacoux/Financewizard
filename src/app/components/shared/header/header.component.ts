import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languageInUse: string = 'en';

  constructor(public authService: AuthService,  private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.languageInUse = this.translate.currentLang;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.languageInUse = language;
}

}
