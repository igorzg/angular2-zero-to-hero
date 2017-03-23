import {Module} from "typeix";
import {MongodbProvider} from "./mongodb.provider";
import {UsersCollection} from "./collections/users";

/**
 * Module definition
 *
 * @since 1.0
 */
@Module({
  name: "mongodb",
  exports: [
    MongodbProvider,
    UsersCollection
  ],
  providers: [
    MongodbProvider,
    UsersCollection
  ]
})
export class MongodbModule {}
