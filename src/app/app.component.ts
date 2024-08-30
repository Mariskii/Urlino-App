import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './Shared/components/toolbar/toolbar.component';
import { FooterComponent } from './Shared/components/footer/footer.component';
import { AuthService } from './core/services/AuthService/auth.service';
import { catchError, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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

  ngOnInit() {


    this.authService.login().pipe(
      catchError(err => {
        return of()
      })
    ).subscribe(user => {
      this.authService.user = {
        id: user.id,
        imageUrl: user.avatar_url,
        name: user.login
      }
    });
  }


}
