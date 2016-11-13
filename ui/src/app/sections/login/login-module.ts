import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login-component";
import {LoggedInGuard} from "./logged-in-guardian";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "login",
        canActivate: [LoggedInGuard],
        component: LoginComponent
      }
    ])
  ],
  providers: [LoggedInGuard]
})
export class LoginModule{}
