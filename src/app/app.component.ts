import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './Shared/components/toolbar/toolbar.component';
import { FooterComponent } from './Shared/components/footer/footer.component';
import { AuthService } from './core/services/AuthService/auth.service';
import { catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  authService = inject(AuthService);

  title = 'urlino-app';

  loadingUser:boolean = true;

  constructor(private translate: TranslateService) {
    // Set supported languages
    const supportedLanguages = ['en', 'es'];
    this.translate.addLangs(supportedLanguages);

    // Set default language
    this.translate.setDefaultLang('en');

    // Change the language inf the browser language is avilable
    const browserLang = this.translate.getBrowserLang() || 'en';
    // If we can use the browser language lets use it, if not, we use english
    const languageToUse = supportedLanguages.includes(browserLang) ? browserLang : 'en';

    // Set selected language
    this.translate.setDefaultLang('en');
    this.translate.use(languageToUse);
  }

  ngOnInit() {

    this.loadingUser = true;
    this.authService.login().pipe(
      catchError(err => {
        this.loadingUser = false;
        return of()
      })
    ).subscribe(user => {
      this.authService.user = {
        id: user.id,
        imageUrl: user.avatar_url,
        name: user.login
      }
      this.loadingUser = false;
    });
  }


}
