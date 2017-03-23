import {IAfterConstruct, Inject, Methods, Module, Router} from "typeix";
import {UserController} from "./controllers/user";
import {MongodbModule} from "../mongodb/mongodb.module";
/**
 * Module definition
 *
 * @since 1.0
 */
@Module({
  name: "admin",
  imports: [MongodbModule],
  controllers: [UserController]
})
export class AdminModule implements IAfterConstruct {

  /**
   * @param {Router} router
   * @description
   * Router service
   */
  @Inject(Router)
  router: Router;

  /**
   * Add admin rules
   */
  afterConstruct(): void {
    this.router.addRules([
      {
        methods: [Methods.GET],
        route: "admin/user/create",
        url: "/admin/create-user"
      }
    ]);
  }
}
