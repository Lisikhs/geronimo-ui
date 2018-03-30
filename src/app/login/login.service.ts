import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../common/user/user.service';
import {Observable} from 'rxjs/Observable';
import {flatMap, map} from 'rxjs/operators';
import {User} from '../common/user/user';

@Injectable()
export class LoginService {

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  login(username: string, password: string): Observable<User> {
    return this.authService.login(username, password)
      .pipe(
        flatMap(() => this.userService.getCurrent()),
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        })
      );
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
  }
}
