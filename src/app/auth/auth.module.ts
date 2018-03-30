import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import {AuthGuard} from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthService, AuthInterceptor, AuthGuard]
})
export class AuthModule { }
