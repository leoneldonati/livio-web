import type { APIRoute } from "astro";
import { validate } from "../../scripts/zod";
import { res } from "../../scripts/helpers";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const payload = Object.fromEntries(formData);

    const { ok, payload: parsedPayload, issues } = validate(payload);

    if (!ok)
      return res({
        status: 400,
        message: "Algunos datos no son válidos, por favor revísalos.",
        otherIssues: issues,
      });

    return res({ payload });
  } catch (err) {
    console.error(err)
    return res({ message: "Error en el servidor.", status: 500 }, 500);
  }
};
