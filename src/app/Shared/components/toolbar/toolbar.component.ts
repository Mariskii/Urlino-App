import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { Router, RouterModule } from '@angular/router';
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
  router = inject(Router);

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

  logout() {
    this.authService.delete();
    this.router.navigate(['/home']);
    this.toggleSidenav();
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
