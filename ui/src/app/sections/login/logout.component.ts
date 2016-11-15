import {Component} from "@angular/core";
import {Authentication} from "../services/authentication.service";
/**
 * LogoutComponent
 * @constructor
 * @function
 * @name LogoutComponent
 *
 * @description
 * Login component
 */
@Component({
  selector: "logout",
  template: ""
})
export class LogoutComponent {

  constructor(private authentication: Authentication) {
    authentication.doLogout();
  }

}
