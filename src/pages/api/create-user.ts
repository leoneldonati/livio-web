import type { APIRoute } from "astro";
import { validate } from "../../scripts/zod";
import { res } from "../../scripts/helpers";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const avatar = await request.blob();

    const payload  = Object.fromEntries(formData);

    const { ok, payload: parsedPayload, issues } = validate(payload)

    if (!ok) return res({ message: "Algunos datos no son válidos, por favor revísalos.", issues })

    return res({ payload, avatar })
  } catch (err) {
    console.log(err);
    return res({ message: "Error en el servidor." }, 500);
  }
};
