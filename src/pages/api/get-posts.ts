import type { APIRoute } from "astro";
import { postModel } from "~/db";
import { res } from "~/scripts/helpers";

export const GET: APIRoute = async ({ url }) => {
  const q = url.searchParams.get("q");
  if (!q) return res({}, 400);

  const limit = parseInt(q);
  try {
    const posts = await postModel.find().limit(limit).toArray();

    const sortedPosts = posts.toSorted(
      (a, b) => new Date(a.created).getDate() - new Date(b.created).getDate()
    );
    console.log(sortedPosts);
    return res(sortedPosts);
  } catch (e) {
    console.log(e);
    return res({}, 500);
  }
};
