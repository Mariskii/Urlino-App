import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ShortUrl } from '../interfaces/shortUrl.interface';
import { CustomUrlPage, CustomUrlRequest, CustomUrlResponse } from '../interfaces/customUrl.interface';
import { UpdateUrl } from '../interfaces/updateUrl.interface';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  shorterUrl(longUrl: string) {
    const params = new HttpParams().set('url', longUrl);
    return this.http.post<ShortUrl>(`${environment.API_URL}/api/shorten`, null, { params });
  }

  shortenCustomizedUrl(customUrl :CustomUrlRequest) {
    return this.http.post<CustomUrlResponse>(`${environment.API_URL}/api/custom-url`,customUrl);
  }

  getUrlsByUserId(page: number) {

    let params = new HttpParams()
      .set('page', page)
      .set('size', 10)

    return this.http.get<CustomUrlPage>(`${environment.API_URL}/api/user-urls`, { params, withCredentials: true });
  }

  getUrlsByUserIdAndShortUrl(page: number, shortUrl: string) {

    let params = new HttpParams()
      .set('page', page)
      .set('size', 10)
      .set('shortUrl', shortUrl)

    return this.http.get<CustomUrlPage>(`${environment.API_URL}/api/user-urls-by-short-url`, { params, withCredentials: true });
  }

  deleteUrlById(urlId: string) {
    const params = new HttpParams().set('id', urlId);
    return this.http.delete(`${environment.API_URL}/api/delete-by-id`,{ params, withCredentials: true });
  }

  updateUserUrl(updateUrl: UpdateUrl) {
    return this.http.put<CustomUrlResponse>(`${environment.API_URL}/api/update-user-url`,updateUrl,{ withCredentials: true });
  }
}
