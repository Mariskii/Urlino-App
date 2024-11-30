import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ShorternUrlComponent } from '../../components/shortern-url/shortern-url.component';
import { AdvantagesComponent } from '../../components/advantages/advantages.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    TranslateModule,
    MatIconModule,
    ShorternUrlComponent,
    AdvantagesComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

//  authService = inject(AuthService);

  features: string[] = [
    'FEATURES.FEATURE-1',
    'FEATURES.FEATURE-2',
    'FEATURES.FEATURE-3'
  ];

  // ngOnInit(): void {
  //   this.authService.login().pipe(
  //     catchError(err => {
  //       //console.log(err);
  //       return of()
  //     })
  //   ).subscribe(user => {
  //     this.authService.user = {
  //       id: user.id,
  //       imageUrl: user.avatar_url,
  //       name: user.login
  //     }
  //   });
  // }
}
