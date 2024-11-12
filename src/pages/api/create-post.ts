import type { APIRoute } from "astro";
import { res } from "~/scripts/helpers";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    const assets = await request.blob()
    
    const { content } = Object.fromEntries(formData)
   
    
  }
  catch (e) {

    return res({}, 500)
  }
}