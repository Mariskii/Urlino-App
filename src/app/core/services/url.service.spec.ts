import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomUrlPage, CustomUrlRequest, CustomUrlResponse } from '../interfaces/customUrl.interface';
import { environment } from '../../../environments/environment.development';
import { ShortUrl } from '../interfaces/shortUrl.interface';
import { UpdateUrl } from '../interfaces/updateUrl.interface';

describe('UrlService', () => {
  let service: UrlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UrlService,
      ],
    }).compileComponents();

    service = TestBed.inject(UrlService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUrlsByUserId works correctly', () => {
    const httpResponse:CustomUrlPage = {
      content: [],
      totalElements: 1,
      totalPages: 1,
    }

    service.getUrlsByUserId(0).subscribe(response => {
      expect(response).toEqual(httpResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/api/user-urls?page=0&size=10`);

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('10');
    expect(req.request.withCredentials).toBeTrue();

    req.flush(httpResponse);
  });

  it('shorterUrl works correctly', () => {
    const httpResponse:ShortUrl = {
      shortUrl: 'short'
    }

    service.shorterUrl('long').subscribe(response => {
      expect(response).toEqual(httpResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/api/shorten?url=long`);

    expect(req.request.method).toBe('POST');
    expect(req.request.params.get('url')).toBe('long');

    req.flush(httpResponse);
  });

  it('shortenCustomizedUrl works correctly', () => {
    const httpResponse:CustomUrlResponse = {
      id:'21',
      customBody: 'custom',
      customUrl: 'customUrl',
      longUrl: 'long'
    }

    const customUrl:CustomUrlRequest = {
      userId: '1',
      longUrl: 'long',
      customBody: 'custom'
    }

    service.shortenCustomizedUrl(customUrl).subscribe(response => {
      expect(response).toEqual(httpResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/api/custom-url`);

    expect(req.request.method).toBe('POST');

    req.flush(httpResponse);
  });

  it('getUrlsByUserIdAndShortUrl works correctly', () => {
    const httpResponse:CustomUrlPage = {
      content: [],
      totalElements: 1,
      totalPages: 1
    }

    service.getUrlsByUserIdAndShortUrl(0,'short').subscribe(response => {
      expect(response).toEqual(httpResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/api/user-urls-by-short-url?page=0&size=10&shortUrl=short`);

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('10');
    expect(req.request.params.get('shortUrl')).toBe('short');
    expect(req.request.withCredentials).toBeTrue();

    req.flush(httpResponse);
  });

  it('deleteUrlById works correctly', () => {

    service.deleteUrlById('ID').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.API_URL}/api/delete-by-id?id=ID`);

    expect(req.request.method).toBe('DELETE');
    expect(req.request.params.get('id')).toBe('ID');
    expect(req.request.withCredentials).toBeTrue();

    req.flush(null);
  });

  it('updateUserUrl works correctly', () => {

    const request: UpdateUrl = {
      id: '1',
      longUrl: 'long1',
      shortURL: 'short'
    }

    const httpResponse:CustomUrlResponse = {
      id: '1',
      longUrl: 'long',
      customBody: 'body',
      customUrl: 'custom'
    }

    service.updateUserUrl(request).subscribe(response => {
      expect(response).toBe(httpResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/api/update-user-url`);

    expect(req.request.method).toBe('PUT');
    expect(req.request.withCredentials).toBeTrue();

    req.flush(httpResponse);
  });
});
