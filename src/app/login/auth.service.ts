import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from './auth.model';
import * as moment from 'moment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  // TODO: move to global configuration file (or whatever concept Angular has)
  public static readonly TOKEN_KEY = 'id_token';
  public static readonly EXPIRES_IN_KEY = 'expires_in';
  private static readonly API_URL = 'http://localhost:8081';
  private static readonly AUTH_URL = `${AuthService.API_URL}/auth`;

  constructor(protected http: HttpClient) {}

  public login(username: string, password: string): Observable<JwtToken> {
    return this.http.post<JwtToken>(AuthService.AUTH_URL, {username, password})
      .do(this.storeToken);
  }

  private storeToken(auth: JwtToken) {
    const expiresAt = moment().add(auth.expiresIn, 'ms');

    localStorage.setItem(AuthService.TOKEN_KEY, auth.token);
    localStorage.setItem(AuthService.EXPIRES_IN_KEY, JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.EXPIRES_IN_KEY);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem(AuthService.EXPIRES_IN_KEY);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
