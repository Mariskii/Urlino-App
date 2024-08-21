import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import 'intersection-observer';
import { UrlService } from '../../../core/services/url.service';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from '../../../../environments/environment.development';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';

@Component({
  selector: 'app-shortern-url',
  standalone: true,
  imports: [
    FormsModule,
    LoaderComponent,
    ClipboardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  templateUrl: './shortern-url.component.html',
  styleUrl: './shortern-url.component.scss'
})
export class ShorternUrlComponent implements AfterViewInit {

  urlService = inject(UrlService);

  @ViewChild('longURLInput')
  longURLInput!: ElementRef;

  longUrl?:string;
  shortUrl?: string;
  loading: boolean = false;

  ngAfterViewInit() {
    this.initIntersectionObserver();
  }

  private initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.longURLInput) {
      observer.observe(this.longURLInput.nativeElement);
    }
  }

  getShortUrl() {

    this.shortUrl = undefined;

    if(this.longUrl) {
      this.loading = true
      this.urlService.shorterUrl(this.longUrl).pipe().subscribe(resp => {
        this.shortUrl = environment.API_URL+"/api/"+resp.shortUrl;
        this.loading = false
      });
    }
  }
}
