import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login-component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "login",
        component: LoginComponent
      }
    ])
  ],
  providers: []
})
export class LoginModule{}
