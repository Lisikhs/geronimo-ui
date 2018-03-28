import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../common/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const username = this.form.value.username;
    const password = this.form.value.password;

    if (username && password) {
      this.authService.login(username, password)
        .subscribe(
          () => {
            console.log('Logged in.');
            this.userService.current().subscribe(
              user => {
                localStorage.setItem('user', JSON.stringify(user));
              },
              error => {
                console.log(error);
              }
            );

            this.router.navigate(['/home']);
          },
          (err) => {
            console.error(`Failed with error: ${JSON.stringify(err)}`);
          },
          () => {
            console.log('Complete');
          }
        );
    }
  }
}
