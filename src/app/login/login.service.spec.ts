import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {UserService} from '../common/user/user.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, AuthService, HttpClient, HttpHandler, UserService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
