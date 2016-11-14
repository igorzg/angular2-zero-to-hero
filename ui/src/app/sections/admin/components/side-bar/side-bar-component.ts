import {Component} from "@angular/core";
import {Authentication} from "../../../services/authentication-service";

/**
 * SideBarComponent
 * @constructor
 * @function
 * @name SideBarComponent
 *
 * @description
 * Side bar handler
 */
@Component({
  selector: "side-bar",
  templateUrl: "side-bar-component.html"
})
export class SideBarComponent{

  constructor(private auth: Authentication) {}
  /**
   * @function
   * @name SideBarComponent#doLogout
   *
   * @description
   * Logout action
   */
  doLogout($event) {
    $event.preventDefault();
    this.auth.doLogout();
  }
}
