import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem(AuthService.TOKEN_KEY);

    if (idToken) {
      return next.handle(req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      }));
    } else {
      return next.handle(req);
    }
  }
}
