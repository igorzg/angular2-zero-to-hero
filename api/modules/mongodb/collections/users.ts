import {Inject, Injectable, Logger} from "typeix";
import {MongodbProvider} from "../mongodb.provider";
import {Collection, InsertOneWriteOpResult} from "mongodb";
/**
 * Users collection provider
 * @constructor
 * @function
 * @name UsersCollection
 *
 * @description
 * Modify user collection
 */
@Injectable()
export class UsersCollection {
  /**
   * @param {Logger} logger
   * @description
   * Logger service
   */
  @Inject(Logger)
  logger: Logger;
  /**
   * @param {MongodbProvider} provider
   * @description
   * Mongodb provider
   */
  @Inject(MongodbProvider)
  private provider: MongodbProvider;

  /**
   * @function
   * @name UsersCollection#collection
   *
   * @description
   * Get collection
   */
  collection(): Promise<Collection> {
    return this.provider.getCollection("users");
  }

  /**
   * Create user
   * @param username
   * @param password
   * @returns {Promise<InsertOneWriteOpResult>}
   */
  async createUser(username: string, password: string): Promise<InsertOneWriteOpResult> {
    let collection = await this.collection();
    return await collection.insertOne({username, password});
  }

  /**
   * @function
   * @name UsersCollection#getUser
   *
   * @description
   * List users
   */
  async list(): Promise<Array<any>> {
    let collection = await this.collection();
    return collection.find().toArray();
  }

  /**
   * @function
   * @name UsersCollection#getUser
   *
   * @description
   * Get user data based on user and password
   */
  async getUser(username: string, password: string): Promise<any> {
    let collection = await this.collection();
    let items = await collection.find({username, password}).limit(1).toArray();

    this.logger.error("Username password", {username, password, items});

    if (items.length > 0) {
      return items.shift();
    }
    return null;
  }

}
