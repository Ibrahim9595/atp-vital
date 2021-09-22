import { DB } from "../core/database";
import { ObjectId } from "mongodb";
/**
 * This class represent the centeral logic in all models
 */

export class BaseModel {
  collection: string;
  constructor(collection: string) {
    this.collection = collection;
  }

  async db() {
    return (await DB.connect()).collection(this.collection);
  }

  async findOneQuery(query: any) {
    const db = await this.db();
    const res = await db.findOne(query);
    return res;
  }

  async update(data: any, extraFilter = {}) {
    const db = await this.db();
    const res = await db.findOneAndUpdate(
      { ...extraFilter },
      {
        $set: {
          ...data,
          updated_at: Date.now(),
        },
      },
      {
        returnOriginal: false,
      }
    );

    console.log(res);
    return res.value;
  }
}
