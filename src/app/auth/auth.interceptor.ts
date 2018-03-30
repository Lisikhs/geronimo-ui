import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {AppConfig} from '../common/app-config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.set('Authorization', `${AppConfig.AUTH_SCHEME} ${token}`)
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
