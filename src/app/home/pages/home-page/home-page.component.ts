import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ShorternUrlComponent } from '../../components/shortern-url/shortern-url.component';
import { AdvantagesComponent } from '../../components/advantages/advantages.component';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
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
    'Generate a shortern Url Free',
    'Save your urls creating an account',
    'Login with your Github account'
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
