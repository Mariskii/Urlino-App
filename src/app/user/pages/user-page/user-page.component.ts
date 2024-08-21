import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../core/services/url.service';
import { CustomUrlRequest, CustomUrlResponse } from '../../../core/interfaces/customUrl.interface';
import { UrlCardComponent } from '../../components/url-card/url-card.component';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    UrlCardComponent,
    LoaderComponent,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ClipboardModule,
    MatIconModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit {

  authService = inject(AuthService);
  urlService = inject(UrlService);
  dialogConfirmation = inject(MatDialog);

  userUrls:CustomUrlResponse[] = [];

  longUrl?: string;
  customBody?: string;

  searchedUrl?: string;

  totalUrls: number = 0;

  loading: boolean = false;

  shortUrl?: string;

  errorMessage?: string;

  ngOnInit(): void {
    this.getUrlsByUserId(0);
  }

  shortCustomizedUrl() {

    if(this.longUrl) {
      const customUrl: CustomUrlRequest = {
        customBody: this.customBody,
        longUrl: this.longUrl,
        userId: this.authService.user!.id
      }

      this.loading = true
      this.urlService.shortenCustomizedUrl(customUrl).pipe(
        catchError(err => {
          this.loading = false;
          this.errorMessage = err.error.message;
          return of();
        })
      ).subscribe(resp => {
        if(this.userUrls.length < 10)
          this.userUrls.push(resp);

        this.totalUrls++;

        this.loading = false;
        this.shortUrl = 'http:localhost:8080/api/'+resp.customUrl
        this.resetText();
      });
    }
  }

  getUrlsByUserId(page: number) {
    this.urlService.getUrlsByUserId(page).pipe().subscribe(urlsPage => {
      this.userUrls = urlsPage.content;
      this.totalUrls = urlsPage.totalElements;
    });
  }

  changePage(event: PageEvent) {
    this.getUrlsByUserId(event.pageIndex)
  }

  showDeleteConfirmation(id: string): void {
    this.dialogConfirmation
      .open(DeleteConfirmationComponent, {
        data: `Are you sure you want to delete the url?`
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this.urlService.deleteUrlById(id).pipe().subscribe(() => {
            const index = this.userUrls.findIndex(url => url.id === id)
            this.userUrls.splice(index, 1);
            this.totalUrls--;
          });
        }
      });
  }

  searchByShortUrl() {
    if(this.searchedUrl) {
      this.urlService.getUrlsByUserIdAndShortUrl(0,this.searchedUrl).subscribe(res => {
        this.userUrls = res.content
        this.totalUrls = res.totalElements
      })
    }
  }

  resetText() {
    this.errorMessage = '';
    this.longUrl = '';
  }
}
