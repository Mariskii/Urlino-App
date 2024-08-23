import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    NgOptimizedImage,
    RouterModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  authService = inject(AuthService);

  navItems = [
    {
      title: 'Home',
      router: '/home'
    },
    {
      title: 'My Urls',
      router: '/user'
    }
  ];

  login() {
    //window.location.href = "https://github.com/login/oauth/authorize?response_type=code&client_id=Ov23li7poBd2GA4Invx3"
    this.authService.login().subscribe(user => {
      console.log(user);

      this.authService.user = {
        id: user.id,
        imageUrl: user.avatar_url,
        name: user.login
      }

      console.log(this.authService.user);
    })
  }

  user () {
    window.location.href = "https://github.com/login/oauth/authorize?response_type=code&client_id=Ov23li7poBd2GA4Invx3"
    // this.authService.getUser().subscribe(res => {
    //   console.log(res);

    // })
  }

  logout() {
    this.authService.delete()
  }
}
