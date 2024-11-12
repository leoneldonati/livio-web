import type { APIRoute } from "astro";
import { res } from "~/scripts/helpers";

export const GET: APIRoute = async ({ url }) => {
  const userId = url.searchParams.get("userid");

  if (!userId)
    return res(
      { message: "Error en la petición, debe contener ?userid", status: 400 },
      400
    );

  try {
    return res({})
  }
  catch (err) { 

    return res({}, 500)
  }
};
