import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {Authentication} from "../services/authentication.service";

/**
 * AdminGuardian guardian
 * @constructor
 * @function
 * @name AdminGuardian
 *
 * @description
 * Check if user is logged in and if not it redirects to login page
 */
@Injectable()
export class AdminGuardian implements CanActivate {

  constructor(private auth: Authentication, private router: Router) {}

  /**
   * @function
   * @name AdminGuardian#canActivate
   *
   * @description
   * Check if user is logged in and if not it redirects to login page
   */
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl("/login");
    return false;
  }
}
