import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './main/admin-login/admin-login/admin-login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AdminLoginComponent,
  // },
  {
    path: 'login',
    component: AdminLoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
