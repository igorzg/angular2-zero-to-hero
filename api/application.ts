import {Module, Logger, Inject, IAfterConstruct, Router, Methods, LogLevels} from "typeix";
import {Assets} from "./components/assets";
import {CoreController} from "./controllers/core";
import {MongodbModule} from "./modules/mongodb/mongodb.module";
import {AdminModule} from "./modules/admin/admin.module";
/**
 * Application entry point
 * @constructor
 * @function
 * @name Application
 *
 * @description
 * \@Module is used to define application entry point class
 */
@Module({
  imports: [MongodbModule, AdminModule],
  controllers: [CoreController],
  providers: [
    Logger,
    Router,
    Assets
  ]
})
export class Application implements IAfterConstruct {

  /**
   * @param {Assets} assetLoader
   * @description
   * Custom asset loader service
   */
  @Inject(Assets)
  assetLoader: Assets;

  /**
   * @param {Logger} logger
   * @description
   * Logger service
   */
  @Inject(Logger)
  logger: Logger;

  /**
   * @param {Router} router
   * @description
   * Router service
   */
  @Inject(Router)
  router: Router;

  /**
   * @function
   * @name Application#afterConstruct
   *
   * @description
   * After construct use injected values to define some behavior at entry point
   * Defining main route, all routes are processed
   */
  afterConstruct() {

    this.logger.enable();
    this.logger.printToConsole();
    this.logger.setDebugLevel(LogLevels.INFO);

    this.logger.info("Application.arg", this.assetLoader);

    this.router.addRules([
      {
        methods: [Methods.OPTIONS],
        route: "core/options",
        url: "*"
      },
      {
        methods: [Methods.GET, Methods.POST],
        route: "core/authenticate",
        url: "/authenticate"
      },
      {
        methods: [Methods.GET],
        route: "core/favicon",
        url: "/favicon.ico"
      },
      {
        methods: [Methods.GET],
        route: "core/assets",
        url: "/assets/<file:(.*)>"
      },
      {
        methods: [Methods.GET],
        route: "core/index",
        url: "/"
      }
    ]);
  }
}
