import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import 'intersection-observer';

@Component({
  selector: 'app-shortern-url',
  standalone: true,
  imports: [],
  templateUrl: './shortern-url.component.html',
  styleUrl: './shortern-url.component.scss'
})
export class ShorternUrlComponent implements AfterViewInit {
  @ViewChild('longURLInput')
  longURLInput!: ElementRef;

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
}
