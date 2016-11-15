import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
import {LoggedInGuard} from "./logged-in-guardian";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LogoutComponent} from "./logout.component";


@NgModule({
  declarations: [
    LoginComponent, LogoutComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "login",
        canActivate: [LoggedInGuard],
        component: LoginComponent
      },
      {
        path: "logout",
        component: LogoutComponent
      }
    ])
  ],
  providers: [LoggedInGuard]
})
export class LoginModule{}
