import {Inject, Produces, Action, Controller, Request, Param, isPresent} from "typeix";
import {UsersCollection} from "../../mongodb/collections/users";
import {InsertOneWriteOpResult} from "mongodb";

/**
 * Controller example
 * @constructor
 * @function
 * @name UserController
 *
 * @description
 * User controller actions
 */
@Controller({
  name: "user"
})
export class UserController {

  /**
   * @param {Request} request
   * @description
   * Request reflection
   */
  @Inject(Request)
  request: Request;

  /**
   * @param {UsersCollection} users
   * @description
   * Users connection
   */
  @Inject(UsersCollection)
  users: UsersCollection;

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
  @Action("create")
  @Produces("application/json")
  async actionIndex(@Param("user") username: string, @Param("pass") password: string): Promise<string> {
    if (isPresent(username) && isPresent(password)) {
      let result: InsertOneWriteOpResult = await this.users.createUser(username, password);
      return "USER_CREATED:" + JSON.stringify(result);
    }
    return "USER_NOT_CREATED";
  }

}
