import type { APIRoute } from "astro";
import { userModel } from "~/db";
import { res } from "~/scripts/helpers";
import { validate } from "~/scripts/zod";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const payload = Object.fromEntries(formData);

    const { ok, issues } = validate(payload, { partial: true });

    if (!ok)
      return res(
        {
          message: "Algunos datos no son válidos, por favor revísalos.",
          status: 404,
          otherIssues: issues,
        },
        400
      );
    const user = await userModel.findOne({ email: payload.email });

    if (!user)
      return res(
        {
          message:
            "No se encontró un usuario con ese email, asegúrate de estar registrado.",
          status: 404,
          otherIssues: null,
        },
        404
      );

    return res({ insertedId: user._id });
  } catch (e) {
    return res({ message: "Error en el servidor.", status: 500 }, 500);
  }
};
