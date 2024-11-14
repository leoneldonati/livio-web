import type { APIRoute } from "astro";
import { format } from "@formkit/tempo";
import { postModel } from "~/db";
import { res } from "~/scripts/helpers";
import { optimize } from "~/scripts/sharp";
import { upload } from "~/scripts/cloudinary";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const assets = formData.getAll("assets");
    const content = formData.get("content") as string;

    if (content === "" && assets[0] === "") return res({
      message: "La publicación debe contener una imagen o contenido.",
      status: 400,
      otherIssues: null
    }, 400);

    // OPTIMIZAR ARCHIVOS PARA LIGERAR PESO
    const optimizedAssets = await optimize(assets as File[]);

    // SUBIR ARCHIVOS
    const uploadedAssets = await upload(optimizedAssets);

    const postSchema = {
      content,
      assets: uploadedAssets,
      created: format(new Date(), "medium"),
      modified: format(new Date(), "medium"),
    };

    console.log(assets);
    // const { insertedId } = await postModel.insertOne({content})
    return res({});
  } catch (e) {
    console.log(e);
    return res({}, 500);
  }
};
