import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from './user/user.service';
import {HttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UserService]
})
export class CommonsModule { }
