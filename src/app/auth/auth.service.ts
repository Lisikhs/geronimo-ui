import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AppConfig} from '../common/app-config';

@Injectable()
export class AuthService {

  private static readonly AUTH_URL = `${AppConfig.API_URL}/auth`;
  private static readonly TOKEN_REFRESH_URL = `${AppConfig.API_URL}/auth/refresh`;

  constructor(protected http: HttpClient) {}

  login(username: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(AuthService.AUTH_URL, {username, password})
      .do(this.storeToken);
  }

  refreshToken(): Observable<Auth> {
    return this.http.get<Auth>(AuthService.TOKEN_REFRESH_URL)
        .do(this.storeToken);
  }

  private storeToken(auth: Auth): void {
    localStorage.setItem(AppConfig.TOKEN_KEY, auth.token);
    localStorage.setItem(AppConfig.EXPIRES_AT_KEY, auth.expiresAt);
  }

  getToken(): string {
    return localStorage.getItem(AppConfig.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(AppConfig.TOKEN_KEY);
    localStorage.removeItem(AppConfig.EXPIRES_AT_KEY);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(): Moment {
    const expiresAt = localStorage.getItem(AppConfig.EXPIRES_AT_KEY);
    return moment(expiresAt, 'x');
  }
}

class Auth {
  token: string;
  expiresAt: string;
}
