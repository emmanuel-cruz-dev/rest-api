import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

export class MovieModel {
  static async getAll({ genre }) {}

  static async getById({ id }) {}

  static async create({ input }) {}

  static async delete({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  static async update({ id, input }) {
    const db = await connect();
    const objectId = new ObjectId(id);

    const { ok, value } = await db.findOneAndUpdate(
      { _id: objectId },
      { $set: input },
      { returnNewDocument: true }
    );

    if (!ok) return false;

    return value;
  }
}
