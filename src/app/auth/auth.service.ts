import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  // TODO: inject values from global configuration (How Angular 2 proposes to do such things?)
  private static readonly TOKEN_KEY = 'token';
  private static readonly EXPIRES_AT_KEY = 'token_expires_at';

  private static readonly API_URL = 'http://localhost:8081';
  private static readonly AUTH_URL = `${AuthService.API_URL}/auth`;
  private static readonly TOKEN_REFRESH_URL = `${AuthService.API_URL}/auth/refresh`;

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
    localStorage.setItem(AuthService.TOKEN_KEY, auth.token);
    localStorage.setItem(AuthService.EXPIRES_AT_KEY, auth.expiresAt);
  }

  getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.EXPIRES_AT_KEY);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(): Moment {
    const expiresAt = localStorage.getItem(AuthService.EXPIRES_AT_KEY);
    return moment(expiresAt, 'x');
  }
}

class Auth {
  token: string;
  expiresAt: string;
}
