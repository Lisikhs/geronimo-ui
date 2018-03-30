import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {AppConfig} from '../app-config';

@Injectable()
export class UserService {

  private static readonly CURRENT_USER_URL = `${AppConfig.API_URL}/user/current`;

  constructor(protected http: HttpClient) {
  }

  getCurrent(): Observable<User> {
    return this.http.get<User>(UserService.CURRENT_USER_URL);
  }
}
