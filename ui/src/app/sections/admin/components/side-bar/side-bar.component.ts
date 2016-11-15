import {Component, Output, EventEmitter} from "@angular/core";
import {Authentication} from "../../../services/authentication.service";

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
  templateUrl: "side-bar.component.html"
})
export class SideBarComponent {
  /**
   * @param {EventEmitter} navBarToggle
   * @description
   * Navigation bar change event
   */
  @Output("toggle")
  navBarToggle: EventEmitter<any> = new EventEmitter();
  /**
   * @param {Boolean} brandImage
   * @description
   * Brand image
   */
  brandImage: string = "/assets/angular.svg";
  /**
   * @param {Boolean} showNavBar
   * @description
   * Show navigation bar
   */
  isNavBarToggled: boolean = false;
  /**
   * @param {Boolean} showNavBar
   * @description
   * Show navigation bar
   */
  isSubMenuToggled: boolean = false;

  constructor(private auth: Authentication) {
  }

  /**
   * @function
   * @name SideBarComponent#toggleNavBar
   *
   * @description
   * Toggle navigation bar
   */
  toggleNavBar() {
    this.isNavBarToggled = !this.isNavBarToggled;
    this.navBarToggle.next(this.isNavBarToggled);
  }
  /**
   * @function
   * @name SideBarComponent#toggleSubMenu
   *
   * @description
   * Toggle sub menu
   */
  toggleSubMenu($event) {
    $event.preventDefault();
    this.isSubMenuToggled = !this.isSubMenuToggled;
  }
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
