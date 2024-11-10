import { MongoClient } from "mongodb";
export { ObjectId } from "mongodb"
const url = `mongodb+srv://leonelroman:${
  import.meta.env.DB_PASS
}@cluster0.fo3dmlm.mongodb.net/?w=majority`;
const client = new MongoClient(url, { retryWrites: true, appName: "Cluster0" });

await client.connect().catch((err) => console.log(err));

export const postModel = client.db("livio-web").collection("posts");

export const userModel = client.db("livio-web").collection("users");