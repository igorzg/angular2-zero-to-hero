import {Component, OnInit} from "@angular/core";
import {Authentication, AuthStatus} from "../services/authentication.service";
/**
 * LoginComponent
 * @constructor
 * @function
 * @name LogoutComponent
 *
 * @description
 * Login component
 */
@Component({
  selector: "login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  /**
   * @param {Object} labels
   * @description
   * Input labels
   */
  labels: any = {
    password: "Password:",
    submit: "Login",
    email: "Username or email:"
  };
  /**
   * @param {Object} placeholders
   * @description
   * Input placeholders
   */
  placeholders: any = {
    password: "Type your password",
    email: "Type your email or username"
  };
  /**
   * @param {Object} messages
   * @description
   * Error messages
   */
  messages: any = {
    invalidLogin: "Please verify your credentials!"
  };
  /**
   * @param {String} logoImg
   * @description
   * Logo image path
   */
  logoImg: string = "/assets/angular.svg";
  /**
   * @param {Boolean} hasError
   * @description
   * If we get error from service display message
   */
  hasError: boolean = false;

  email: string;
  password: string;
  inProgress: boolean = false;

  constructor(private authentication: Authentication) {}
  /**
   * @function
   * @name LogoutComponent#ngOnInit
   *
   * @description
   * On init set auth event hook
   */
  ngOnInit() {
    this.authentication.onAuthChange((auth: AuthStatus) => {
      this.hasError = auth === AuthStatus.INVALID_CREDENTIALS;
    })
  }
  /**
   * @function
   * @name LogoutComponent#onSubmit
   *
   * @description
   * Do login attempt
   */
  onSubmit() {
    if (this.inProgress) {
      return false;
    }
    this.inProgress = true;
    this.authentication
      .doLogin(this.email, this.password)
      .then(() => this.inProgress = false, () => this.inProgress = false);
  }
}
