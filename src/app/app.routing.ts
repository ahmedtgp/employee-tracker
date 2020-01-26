import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  // { path: '', loadChildren: './employees/employees.module#EmployeesModule', canLoad: [AuthGuard] },
  { path: '', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
