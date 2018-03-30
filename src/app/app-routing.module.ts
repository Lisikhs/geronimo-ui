import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProclaimLoggedInGuard} from './auth/proclaim-logged-in.guard';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [ProclaimLoggedInGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
