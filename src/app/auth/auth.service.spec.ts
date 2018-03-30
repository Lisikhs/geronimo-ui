import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule
      ],
      declarations: [],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
