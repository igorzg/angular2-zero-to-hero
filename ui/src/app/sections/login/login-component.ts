import {Component} from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "login-component.html"
})
export class LoginComponent{
  labels: any = {
    password: "Password",
    submit: "Login",
    email: "Email address"
  };
  placeholders: any = {
    password: "Password",
    email: "Email"
  };
  messages: any = {
    invalidLogin: "Please verify your credentials!"
  };
  logoImg: string = "/assets/angular.svg";

  hasError: boolean = false;
}
