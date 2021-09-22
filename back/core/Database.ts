import { MongoClient } from "mongodb";
import config from "./config";

class DBWrapper {
  private __client: any;
  private db: any = null;
  constructor() {}

  async connect() {
    if (this.db === null) {
      this.__client = new MongoClient(
        (config as any)[config.env].database.uri,
        {}
      );
      this.db = (await this.__client.connect()).db();
    }

    return this.db;
  }

  async close() {
    if (this.db && this.__client) {
      await this.__client.close();
      this.__client = null;
      this.db = null;
    }
  }
}

export const DB = new DBWrapper();
