import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginService]
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
