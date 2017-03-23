import {Filter, IFilter, Inject, Methods, Request} from "typeix";

/**
 * @constructor
 * @function
 * @name Options
 *
 * @description
 * CorsFilter request filter
 */
@Filter(100)
export class CorsFilter implements IFilter {

  /**
   * @param {Request} request
   * @description
   * ControllerResolver reflection
   */
  @Inject(Request)
  request: Request;

  /**
   * @function
   * @name Options#before
   *
   * @description
   * Before each controller action here we check if method if options and if it is we apply cors to all actions
   * If request method is OPTIONS we stop any chain propagation and return empty buffer to client
   */
  before(data: string): string | Buffer | Promise<string | Buffer> {

    this.request.setResponseHeader("Access-Control-Allow-Origin", "*");
    this.request.setResponseHeader("Access-Control-Allow-Headers",
      "Content-Type, X-CSRF-Token, X-Requested-With" +
      ", Accept, Accept-Version, Content-Length, X-Api-Version, X-File-Name"
    );
    this.request.setResponseHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, PATCH");

    if (this.request.getMethod() === Methods.OPTIONS) {
      this.request.stopChain();
      return new Buffer(0);
    }
    return data;
  }

  /**
   * @function
   * @name Options#after
   *
   * @description
   * This filter will be applyed after each action and here we only return data to
   * typeix because we don't modify any output here.
   */
  after(data: string): string | Buffer | Promise<string | Buffer> {
    return data;
  }

}
