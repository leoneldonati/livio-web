import type { APIRoute } from "astro";
import { ObjectId, postModel, userModel } from "~/db";
import { res } from "~/scripts/helpers";
import { optimize } from "~/scripts/sharp";
import { upload } from "~/scripts/cloudinary";
import type { Asset, Post } from "~/types";

export const POST: APIRoute = async ({ request }) => {
  const session = request.headers.get("cookie");

  if (!session) return res({}, 401);

  const userId = session.split("=")[1];
  try {
    const formData = await request.formData();

    const assets = formData.getAll("assets") as File[];
    const content = formData.get("content") as string;
    const haveAssets = assets[0].size !== 0;
    if (!content && !haveAssets)
      return res(
        {
          message: "La publicación debe contener una imagen o contenido.",
          status: 400,
          otherIssues: null,
        },
        400
      );

    let uploadedAssets = null;
    if (haveAssets) {
      const optimized = await optimize(assets);
      const uploaded = (await upload(optimized, {
        folder: "livio-web/posts",
      })) as Asset[];

      uploadedAssets = uploaded;
    }

    const author = await userModel.findOne({ _id: new ObjectId(userId) });

    const postSchema: Omit<Post, "_id"> = {
      content,
      assets: uploadedAssets,
      author: {
        _id: author!._id.toString(),
        avatar: author!.avatar,
        bio: author!.bio,
        followed: author!.followed,
        followers: author!.followers,
        name: author!.name,
        username: author!.username,
        webSite: author!.webSite,
      },
      likes: [],
      responses: [],
      created: `${new Date()}`,
      modified: `${new Date()}`,
    };

    const { insertedId } = await postModel.insertOne(postSchema);
    return res({ ...postSchema, _id: insertedId });
  } catch (e) {
    console.log(e);
    return res({}, 500);
  }
};
