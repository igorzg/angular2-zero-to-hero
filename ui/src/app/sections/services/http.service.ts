import {Injectable, Inject} from "@angular/core";
import {Http, Response, RequestOptions, BaseRequestOptions} from "@angular/http";
import {Authentication, SESSION_KEY} from "./authentication.service";
import {getCookie, isString} from "../../helpers";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

/**
 * Http service
 * @constructor
 * @function
 * @name HttpService
 *
 * @description
 * Main service for request handling
 */
@Injectable()
export class HttpService {
  /**
   * @param {Http} http
   * @description
   * Http handler
   */
  @Inject(Http)
  private http;
  /**
   * @param {Authentication} auth
   * @description
   * Authentication service
   */
  @Inject(Authentication)
  private auth;

  /**
   * @function
   * @name HttpService#patchOptions
   *
   * @description
   * Patch request options
   */
  private patchOptions(requestOptions?: RequestOptions): RequestOptions {
    requestOptions = requestOptions || new BaseRequestOptions();
    if (!requestOptions.headers.has("Content-Type")) {
      requestOptions.headers.set("Content-Type", "application/json");
    }
    requestOptions.headers.set("Authorization", getCookie(SESSION_KEY));
    return requestOptions;
  }

  /**
   * @function
   * @name HttpService#patchUri
   *
   * @description
   * Patch uri with env options
   */
  private patchUri(url: string): string {
    return environment.services.api + url;
  }

  /**
   * @function
   * @name HttpService#patchMethod
   *
   * @description
   * Patch method with authentication check
   */
  private patchMethod(method: string, url: string, options?: RequestOptions, body?: any): Observable<Response> {
    return new Observable<Response>(observer => {
      let subscriber: Observable<Response>;

      if (["post", "put", "patch"].indexOf(method) > -1) {
        if (!isString(body)) {
          try {
            body = JSON.stringify(body);
          } catch (e) {
            return observer.error(e);
          }
        }
        subscriber = this.http[method].call(this.http, this.patchUri(url), body, this.patchOptions(options));
      } else {
        subscriber = this.http[method].call(this.http, this.patchUri(url), this.patchOptions(options));
      }

      subscriber.subscribe(observer.next, (data) => {
        if (data.status === 401) {
          this.auth.doLogout();
        }
        observer.error(data);
      });

    });
  }

  /**
   * @function
   * @name HttpService#get
   *
   * @description
   * Preform request with `GET` http method
   */
  get(url: string, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("get", url, options);
  }

  /**
   * @function
   * @name HttpService#post
   *
   * @description
   * Preform request with `POST` http method
   */
  post(url: string, body: any, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("post", url, options, body);
  }

  /**
   * @function
   * @name HttpService#put
   *
   * @description
   * Preform request with `PUT` http method
   */
  put(url: string, body: any, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("put", url, options, body);
  }

  /**
   * @function
   * @name HttpService#delete
   *
   * @description
   * Preform request with `DELETE` http method
   */
  delete(url: string, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("delete", url, options);
  }

  /**
   * @function
   * @name HttpService#patch
   *
   * @description
   * Preform request with `PATCH` http method
   */
  patch(url: string, body: any, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("patch", url, options, body);
  }

  /**
   * @function
   * @name HttpService#head
   *
   * @description
   * Preform request with `HEAD` http method
   */
  head(url: string, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("head", url, options);
  }

  /**
   * @function
   * @name HttpService#options
   *
   * @description
   * Preform request with `OPTIONS` http method
   */
  options(url: string, options?: RequestOptions): Observable<Response> {
    return this.patchMethod("options", url, options);
  }

}
