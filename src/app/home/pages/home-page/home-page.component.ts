import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { ShorternUrlComponent } from '../../components/shortern-url/shortern-url.component';
import { AdvantagesComponent } from '../../components/advantages/advantages.component';

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
  features: string[] = [
    'Generate a shortern Url Free',
    'Save your urls creating an account',
    'Login with your Github account'
  ];
}
