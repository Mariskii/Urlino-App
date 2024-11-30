import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { GithubIcon } from '../../../../assets/icons/github-icon.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    NgOptimizedImage,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    GithubIcon,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Input() loadingUser!:boolean;
  authService = inject(AuthService);
  router = inject(Router);

  isSidebarOpen = false;

  navItems = [
    {
      title: 'MENU.HOME',
      router: '/home'
    },
    {
      title: 'MENU.MY-URLS',
      router: '/user'
    }
  ];

  logout() {
    this.authService.delete();
    this.router.navigate(['/home']);
    document.body.classList.remove('forbid-scroll');
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

  logi() {
    this.authService.login().subscribe(user => {
      this.authService.user = {
        id: user.id,
        imageUrl: user.avatar_url,
        name: user.login
      }

      console.log(this.authService.user);
    });
  }
}
