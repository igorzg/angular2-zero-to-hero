import {Component} from "@angular/core";
import {Authentication} from "../services/authentication-service";

/**
 * AdminComponent
 * @constructor
 * @function
 * @name AdminComponent
 *
 * @description
 * Load navigation and main page area
 */
@Component({
  selector: "admin",
  templateUrl: "admin-component.html"
})
export class AdminComponent{

  constructor(private auth: Authentication) {}
  /**
   * @function
   * @name AdminComponent#doLogout
   *
   * @description
   * Logout action
   */
  doLogout($event) {
    $event.preventDefault();
    this.auth.doLogout();
  }
}
