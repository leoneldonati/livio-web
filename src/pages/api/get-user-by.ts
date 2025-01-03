import type { APIRoute } from "astro";
import { ObjectId, userModel } from "~/db";
import { res } from "~/scripts/helpers";

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");
  const username = url.searchParams.get("username");

  if (!id && !username)
    return res(
      {
        message: "La petición debe contener un query param (id) obligatorio.",
        status: 400,
        otherIssues: null,
      },
      400
    );

  try {
    if (id) {
      const user = await userModel.findOne({ _id: new ObjectId(id) });

      if (!user)
        return res(
          {
            message:
              "No se ha encontrado el usuario, verifica que no haya sido borrado.",
            status: 404,
            otherIssues: null,
          },
          404
        );

      return res(user);
    }
    if (username) {
      const user = await userModel.findOne({ username });

      if (!user)
        return res(
          {
            message:
              "No se ha encontrado el usuario, verifica que no haya sido borrado.",
            status: 404,
            otherIssues: null,
          },
          404
        );

      return res(user);
    }

    return res({});
  } catch (e) {
    console.error(e);

    return res(
      {
        message: "Ha ocurrido un error en el servidor.",
        status: 500,
      },
      500
    );
  }
};
