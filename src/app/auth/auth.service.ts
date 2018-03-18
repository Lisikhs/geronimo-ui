import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  // TODO: move to global configuration file (or whatever concept Angular has)
  private static readonly TOKEN_KEY = 'token';
  private static readonly EXPIRES_AT_KEY = 'token_expires_at';
  private static readonly API_URL = 'http://localhost:8081';
  private static readonly AUTH_URL = `${AuthService.API_URL}/auth`;

  constructor(protected http: HttpClient) {}

  public login(username: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(AuthService.AUTH_URL, {username, password})
      .do(this.storeToken);
  }

  private storeToken(auth: Auth) {
    localStorage.setItem(AuthService.TOKEN_KEY, auth.token);
    localStorage.setItem(AuthService.EXPIRES_AT_KEY, auth.expiresAt);
  }

  getToken() {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.EXPIRES_AT_KEY);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiresAt = localStorage.getItem(AuthService.EXPIRES_AT_KEY);
    return moment(expiresAt, 'x');
  }
}

class Auth {
  token: string;
  expiresAt: string;
}
