import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    NgOptimizedImage,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  authService = inject(AuthService);

  isSidebarOpen = false;

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

  toggleSidenav() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {

    if (this.isSidebarOpen) {
      document.body.classList.add('forbid-scroll');
    } else {
      document.body.classList.remove('forbid-scroll');
    }
  }
}
