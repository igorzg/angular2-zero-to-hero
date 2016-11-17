import {Injectable, isNull, Logger, Inject} from "typeix";
import {MongoClient, Db, Collection} from "mongodb";
/**
 * Mongodb connection provider
 * @constructor
 * @function
 * @name MongodbProvider
 *
 * @description
 * Mongodb connection provider
 */
@Injectable()
export class MongodbProvider {
  /**
   * @param {Db} db
   * @description
   * Db instance
   */
  private db: Db;
  /**
   * @param {String} connection
   * @description
   * Mongodb connection string
   */
  @Inject("connection")
  private connection: string;
  /**
   * @param {Logger} logger
   * @description
   * Logger service
   */
  @Inject(Logger)
  logger: Logger;
  /**
   * @function
   * @name MongodbProvider#getConnection
   *
   * @description
   * Get connection
   */
  getConnection(): Promise<Db> {
    return MongoClient.connect(this.connection);
  }
  /**
   * @function
   * @name MongodbProvider#getCollection
   *
   * @description
   * Return collection
   */
  async getCollection(name: string): Promise<Collection> {
    if (!isNull(this.db)) {
      this.db = await this.getConnection();
      this.logger.info("Connection", this.db);
    }

    return await this.db.collection(name);
  }

}
