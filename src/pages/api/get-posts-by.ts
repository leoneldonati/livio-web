import type { APIRoute } from "astro";
import { ObjectId, postModel } from "~/db";
import { res } from "~/scripts/helpers";

export const GET: APIRoute = async ({ url }) => {
  const userId = url.searchParams.get("userid");

  if (!userId)
    return res(
      { message: "Error en la petición, debe contener ?userid", status: 400 },
      400
    );

  try {

    const posts = await postModel.find({ $where: () => this?.author._id == userId }).toArray();

    return res(posts)
  }
  catch (err) { 

    return res({}, 500)
  }
};
