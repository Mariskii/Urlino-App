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

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    UrlCardComponent,
    MatDialogModule,
    MatPaginatorModule,
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

  shearchedUrl?: string;

  totalUrls: number = 0;

  ngOnInit(): void {
    this.getUrlsByUserId(0);
  }

  shortCustomizedUrl() {

    if(this.longUrl && this.customBody) {
      const customUrl: CustomUrlRequest = {
        customBody: this.customBody,
        longUrl: this.longUrl,
        userId: this.authService.user!.id
      }

      this.urlService.shortenCustomizedUrl(customUrl).pipe().subscribe(resp => {
        if(this.userUrls.length < 10)
          this.userUrls.push(resp);

        this.totalUrls++;
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
          });
        }
      });
  }

  search() {
    if(this.shearchedUrl) {
      console.log(this.shearchedUrl);

      this.urlService.getUrlsByUserIdAndShortUrl(0,this.shearchedUrl).subscribe(res => {
        this.userUrls = res.content
        this.totalUrls = res.totalElements
      })
    }
  }
}
