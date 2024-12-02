import type { APIRoute } from "astro";
import { ObjectId, postModel } from "~/db";
import { res } from "~/scripts/helpers";

export const PATCH: APIRoute = async ({ url }) => {
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");
  const from = url.searchParams.get("from");

  if (!type || !id || !from) return res({}, 400);

  try {
    if (type === "like") {
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $push: { likes: from as any } },
        { returnDocument: "after" }
      );

      return res(updatedPost?.likes);
    }
    if (type === "dislike") {
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $pull: { likes: from as any } },
        { returnDocument: "after" }
      );

      return res(updatedPost?.likes);
    }
    if (type === "comment") {
    }
    if (type === "get_updated_likes") {
      const post = await postModel.findOne({ _id: new ObjectId(id) });
      return res(post?.likes);
    }
    return res({});
  } catch (e) {
    return res({}, 500);
  }
};
