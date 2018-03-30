import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../common/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, LoginService]
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private loginService: LoginService) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const username = this.form.value.username;
    const password = this.form.value.password;

    if (username && password) {
      this.loginService.login(username, password).subscribe(
        () => {
          this.activeRoute.queryParams.subscribe((params) => {
            if (params['returnUrl']) {
              this.router.navigate([params['returnUrl']]);
            } else {
              this.router.navigate(['/home']);
            }
          });
        }
      );
    }
  }
}
