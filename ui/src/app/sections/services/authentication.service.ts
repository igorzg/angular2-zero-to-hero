import {Injectable} from "@angular/core";
import {Http, BaseRequestOptions} from "@angular/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {getCookie, removeCookie, setCookie} from "../../helpers";
import {Router} from "@angular/router";
import {setTimeout} from "timers";

export const SESSION_KEY = 'Authorization';
/**
 * @enum
 * @name AuthStatus
 *
 * @description
 * Three authentication statuses
 */
export enum AuthStatus {
  LOGIN,
  LOGGED_IN,
  INVALID_CREDENTIALS,
  LOGIN_ATTEMPT,
  LOGOUT
}

/**
 * Authentication service
 * @constructor
 * @function
 * @name Authentication
 *
 * @description
 * Is responsible for authenticating in to system
 */
@Injectable()
export class Authentication {
  /**
   * @param {Boolean} statusChange
   * @description
   * Authentication status
   */
  private authStatus: BehaviorSubject<AuthStatus> = new BehaviorSubject(AuthStatus.LOGIN);

  /**
   * @function
   * @name Authentication#constructor
   *
   * @description
   * On construct assign status change
   */
  constructor(private router: Router, private http: Http) {
    this.onAuthChange((status) => {
      let auth = getCookie(SESSION_KEY);
      switch (status) {
        case AuthStatus.LOGIN:
          if (!!auth) {
            this.authStatus.next(AuthStatus.LOGGED_IN);
          }
          break;
        case AuthStatus.LOGGED_IN:
          if (!auth) {
            removeCookie(SESSION_KEY);
            this.authStatus.next(AuthStatus.LOGIN);
          } else {
            router.navigateByUrl("/admin");
          }
          break;
        case AuthStatus.INVALID_CREDENTIALS:
        case AuthStatus.LOGOUT:
          removeCookie(SESSION_KEY);
          router.navigateByUrl("/login");
          break;
      }
    });

    /**
     * Check if there is cookie
     */
    if (!getCookie(SESSION_KEY)) {
      this.doLogout();
    }
  }
  /**
   * @function
   * @name Authentication#getServiceApi
   *
   * @description
   * Return service api url
   */
  private getServiceApi(): string {
    return environment.services.api;
  }

  /**
   * @function
   * @name Authentication#onAuthChange
   *
   * @description
   * Auth status change event
   */
  onAuthChange(generatorOrNext?: any, error?: any, complete?: any) {
    this.authStatus.subscribe(generatorOrNext, error, complete);
  }

  /**
   * @function
   * @name Authentication#doLogin
   *
   * @description
   * authenticate to system via username and password
   */
  doLogin(username: string, password: string): Promise<AuthStatus> {
    return new Promise((resolve, reject) => {
      let requestOptions: BaseRequestOptions = new BaseRequestOptions();
      requestOptions.headers.set("Content-Type", "application/json");
      this.authStatus.next(AuthStatus.LOGIN_ATTEMPT);
      this.http.post(
        this.getServiceApi() + "/authenticate",
        JSON.stringify({
          username: username,
          password: password
        }),
        requestOptions
      )
        .map(item => item.json())
        .subscribe(
          (data: any) => {
            setCookie(SESSION_KEY, data.token, 14);
            setTimeout(() => this.authStatus.next(AuthStatus.LOGGED_IN), 100);
            resolve(AuthStatus.LOGGED_IN);
          },
          () => {
            this.authStatus.next(AuthStatus.INVALID_CREDENTIALS);
            reject(AuthStatus.INVALID_CREDENTIALS);
          }
        );
    });

  }

  /**
   * @function
   * @name Authentication#isLoggedIn
   *
   * @description
   * Get info if user is logged in into system
   */
  isLoggedIn(): boolean {
    return this.authStatus.getValue() === AuthStatus.LOGGED_IN;
  }

  /**
   * @function
   * @name Authentication#doLogout
   *
   * @description
   * Send logout event
   */
  doLogout() {
    this.authStatus.next(AuthStatus.LOGOUT);
  }
}
