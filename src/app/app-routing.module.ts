import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HereMapComponent } from './here-map/here-map.component';
import { HereMapNewComponent } from './here-map-new/here-map-new.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {
    path: "here-map",
    component:HereMapComponent
  },
  {
    path: "here-map-new",
    component:HereMapNewComponent
  },
  {
    path: "form-validation",
    component:FormValidationComponent
  },
  {
    path: "login",
    component:LoginPageComponent
  },
  // {
  //   path: "dashboard",
  //   canActivateChild: [AuthGuard],
  //   loadChildren: "./dashboard/dashboard.module#DashboardModule"
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
