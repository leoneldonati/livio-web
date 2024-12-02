import type { APIRoute } from "astro";
import { ObjectId, userModel } from "~/db";
import { upload } from "~/scripts/cloudinary";
import { res } from "~/scripts/helpers";
import { optimize } from "~/scripts/sharp";

export const PATCH: APIRoute = async ({ request, url }) => {
  try {
    const formData = await request.formData();
    const id = url.searchParams.get("id");
    // AVATAR Y FOTO DE PORTADA
    const initialAssets = formData.get("initial-assets") ?? "";
    const avatar = formData.get("avatar") as File | "";
    const headerPhotoAsset = formData.get("header-photo") as File | "";
    // OTRA INFORMACION
    const username = formData.get("username");
    const name = formData.get("name");
    const bio = formData.get("bio");

    const notHaveContent =
      !username && !name && !bio && !avatar && !headerPhotoAsset;

    if (notHaveContent)
      return res(
        { message: "No hay datos nuevos!", status: 400, otherIssues: null },
        400
      );
    // COMPROBAR SI EXISTE AVATAR O PORTADA
    let assets: Array<File> = [];
    if (avatar) {
      assets.push(avatar);
    }
    if (headerPhotoAsset) {
      assets.push(headerPhotoAsset);
    }

    let uploadedHeaderPhoto = null;
    let uploadedAvatar = null;
    if (assets.length !== 0) {
      const optimized = await optimize(assets);
      const uploaded = await upload(optimized, {
        folder: `livio-web/users/${id}`,
      });

      // if just one updates
      if (uploaded.length === 1) {
        if (avatar) {
          uploadedAvatar = uploaded[0];
        }
        if (headerPhotoAsset) {
          uploadedHeaderPhoto = uploaded[0];
        }
      }

      // if update all
      if (uploaded.length > 1) {
        uploadedAvatar = uploaded[0];
        uploadedHeaderPhoto = uploaded[1];
      }
    }
    const parsedInitialAssets = JSON.parse(initialAssets.toString());

    const { h_photo, avatar: av } = parsedInitialAssets;
    // update user
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: new ObjectId(id!) },
      {
        $set: {
          headerPhoto: headerPhotoAsset ? uploadedHeaderPhoto : h_photo,
          avatar: avatar ? uploadedAvatar : av,
          bio,
          name,
          username,
        },
      },
      {
        returnDocument: "after",
      }
    );
    console.log(updatedUser);
    return res({});
  } catch (e) {
    return res({}, 500);
  }
};
