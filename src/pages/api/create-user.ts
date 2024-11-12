import type { APIRoute } from "astro";
import { validate } from "~/scripts/zod";
import { res } from "~/scripts/helpers";
import { encryptString } from "~/scripts/bcrypt";
import { userModel } from "~/db";
import { format } from "@formkit/tempo"

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const payload = Object.fromEntries(formData);

    const { ok, issues } = validate(payload);

    if (!ok)
      return res({
        status: 400,
        message: "Algunos datos no son válidos, por favor revísalos.",
        otherIssues: issues,
      });

    const hash = await encryptString(payload.password.toString());

    const modelToSave = {
      ...payload,
      password: hash,
      created: format(new Date(), 'medium'),
      modified: format(new Date(), 'medium'),
      headerPhoto: null,
      avatar: null,
      bio: null,
      webSite: null,
      othersLinks: null,
      location: null,
      bornDate: null,
      followers: [],
      followed: [],
    };

    const { insertedId } = await userModel.insertOne(modelToSave);

    return res({ insertedId });
  } catch (err) {
    console.error(err);
    return res({ message: "Error en el servidor.", status: 500 }, 500);
  }
};
