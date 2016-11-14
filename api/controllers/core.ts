import {Assets} from "../components/assets";
import {Inject, Produces, Action, Controller, Param, RequestReflection, uuid, isEqual} from "typeix";
import {lookup} from "mime";
/**
 * Controller example
 * @constructor
 * @function
 * @name CoreController
 *
 * @description
 * Define controller, assign action and inject your services.
 * Each request create new instance of controller, your Injected type is injected by top level injector if is not defined
 * as local instance as providers to this controllers
 */
@Controller({
  name: "core",
  providers: [] // type of local instances within new request since controller is instanciated on each request
})
export class CoreController {

  /**
   * @param {Assets} assetLoader
   * @description
   * Custom asset loader service
   */
  @Inject(Assets)
  assetLoader: Assets;
  /**
   * @param {RequestReflection} request
   * @description
   * Request reflection
   */
  @Inject(RequestReflection)
  request: RequestReflection;
  /**
   * @function
   * @name fileLoadAction
   *
   * @description
   * This action loads file from disk
   * \@Produces("image/x-icon") -> content type header
   */
  @Produces("image/x-icon")
  @Action("favicon")
  faviconLoader(): Promise<Buffer> {
    return this.fileLoadAction("favicon.ico");
  }

  /**
   * @function
   * @name setDefaultHeaders
   *
   * @description
   * Set set default headers
   *
   */
  private setDefaultHeaders() {
    this.request.setResponseHeader("Access-Control-Allow-Origin", "*");
    this.request.setResponseHeader("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, X-Api-Version, X-File-Name");
    this.request.setResponseHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, PATCH");
  }

  /**
   * @function
   * @name optionsMethod
   *
   * @description
   * Handler for options method
   */
  @Action("options")
  optionsMethod() {
    this.setDefaultHeaders();
    return "";
  }
  /**
   * @function
   * @name fileLoadAction
   *
   * @description
   * This action loads file from disk
   *
   */
  @Action("assets")
  fileLoadAction(@Param("file") file: string): Promise<Buffer> {
    let type = lookup(Assets.publicPath(file));
    this.request.setContentType(type);
    return this.assetLoader.load(file);
  }

  /**
   * @function
   * @name actionIndex
   *
   * @description
   * There is no naming convention of function names only what is required to define action is \@Action metadata
   *
   * @example
   * \@Action("index")
   *  iIgnoreNamingConvention(): string {
   *    return "Only important fact is a \@Action param";
   * }
   *
   */
  @Action("index")
  @Produces("application/json")
  actionIndex(): string {
    return JSON.stringify({
      name: "zeroToHeroService",
      message: "Running",
      time: Date.now()
    });
  }


  /**
   * @function
   * @name doLogin
   *
   * @description
   * Authenticate user
   *
   */
  @Action("authenticate")
  @Produces("application/json")
  doLogin(): string {

    this.setDefaultHeaders();

    let body: any = JSON.parse(this.request.getRequestBody().toString());

    if (isEqual(body.username, "admin") && isEqual(body.password, "admin")) {
      return JSON.stringify({
        token: uuid(),
        message: "Success",
        time: Date.now()
      });
    }

    this.request.setStatusCode(401);

    return JSON.stringify({
      message: "Invalid credentials",
      time: Date.now()
    });

  }
}
