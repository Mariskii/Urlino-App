import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: User;

  constructor(private httpClient: HttpClient) { }


  login() {
    return this.httpClient.get<any>(`${environment.API_URL}/auth/user`, { withCredentials: true });
  }
}
