import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login-component";
import {LoggedInGuard} from "./logged-in-guardian";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
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
