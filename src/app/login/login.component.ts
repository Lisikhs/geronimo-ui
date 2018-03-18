import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

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
            // TODO: redirect
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
