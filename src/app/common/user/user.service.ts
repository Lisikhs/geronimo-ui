import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';

@Injectable()
export class UserService {

  private static readonly API_URL = 'http://localhost:8080/user';
  private static readonly CURRENT_URL = `${UserService.API_URL}/current`;

  constructor(protected http: HttpClient) { }

  current(): Observable<User> {
    return this.http.get<User>(UserService.CURRENT_URL);
  }

}
