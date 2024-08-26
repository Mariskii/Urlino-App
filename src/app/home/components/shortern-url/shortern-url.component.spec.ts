import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorternUrlComponent } from './shortern-url.component';
import { UrlService } from '../../../core/services/url.service';
import { of, throwError } from 'rxjs';

describe('ShorternUrlComponent', () => {

  const MockUrlService = {
    shorterUrl: () => of({shortUrl: 'shortUrl'})
  }

  let component: ShorternUrlComponent;
  let fixture: ComponentFixture<ShorternUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShorternUrlComponent],
      providers: [
        {
          provide: UrlService,
          useValue: MockUrlService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShorternUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get short url works correctly', () => {
    const spyShorterUrl = spyOn(MockUrlService, 'shorterUrl').and.returnValue(of({shortUrl: 'shortUrl'}));

    component.longUrl = 'longUrl';

    component.getShortUrl();

    expect(spyShorterUrl).toHaveBeenCalled();
    expect(component.shortUrl).toEqual('http://localhost:8080/api/shortUrl')
  });

  it('get short url works catchError', () => {
    const errorResponse = { error: { message: 'Network error' } };
    const spyShorterUrl = spyOn(MockUrlService, 'shorterUrl').and.returnValue(throwError(errorResponse));

    component.longUrl = 'longUrl';

    component.getShortUrl();

    expect(spyShorterUrl).toHaveBeenCalled();
    expect(component.errorMessage).toEqual(errorResponse.error.message)
  });
});
