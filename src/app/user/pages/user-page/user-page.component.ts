import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { UserUrl } from '../../../core/interfaces/userUrl.interface';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../core/services/url.service';
import { CustomUrlRequest, CustomUrlResponse } from '../../../core/interfaces/customUrl.interface';
import { UrlCardComponent } from '../../components/url-card/url-card.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    UrlCardComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {

  authService = inject(AuthService);
  urlService = inject(UrlService);

  userUrls:CustomUrlResponse[] = [];

  longUrl?: string;
  customBody?: string;

  ngOnInit(): void {
    this.getUrlsByUserId();
  }

  shortCustomizedUrl() {

    if(this.longUrl && this.customBody) {
      const customUrl: CustomUrlRequest = {
        customBody: this.customBody,
        longUrl: this.longUrl,
        userId: this.authService.user!.id
      }

      this.urlService.shortenCustomizedUrl(customUrl).pipe().subscribe(resp => {
        this.userUrls.push(resp);
      });
    }
  }

  getUrlsByUserId() {
    this.urlService.getUrlsByUserId(0).pipe().subscribe(urlsPage => {
      this.userUrls = urlsPage.content;
    });
  }
}
