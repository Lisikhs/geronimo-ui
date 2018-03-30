import { TestBed, async, inject } from '@angular/core/testing';

import { ProclaimLoggedInGuard } from './proclaim-logged-in.guard';
import {AuthService} from './auth.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('ProclaimLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProclaimLoggedInGuard, AuthService, HttpClient, HttpHandler],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([ProclaimLoggedInGuard], (guard: ProclaimLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
