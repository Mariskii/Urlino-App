import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ShortUrl } from '../interfaces/shortUrl.interface';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  shorterUrl(longUrl: string) {
    const params = new HttpParams().set('url', longUrl);
    return this.http.post<ShortUrl>(`${environment.API_URL}/api/shorten`, null, { params });
  }
}
