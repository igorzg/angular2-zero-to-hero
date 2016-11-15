import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {Authentication} from "../services/authentication.service";

/**
 * LoggedInGuard guardian
 * @constructor
 * @function
 * @name LoggedInGuardian
 *
 * @description
 * Check if user is logged in and if so it will redirect you from login page
 */
@Injectable()
export class LoggedInGuard implements CanActivate {


  constructor(private auth: Authentication, private router: Router) {}

  /**
   * @function
   * @name LoggedInGuardian#canActivate
   *
   * @description
   * Check if user is logged in and if so redirect to admin
   */
  canActivate() {
    if (!this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl("/admin");
    return false;
  }
}
