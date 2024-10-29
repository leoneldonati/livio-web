import { z } from "astro/zod";

const userSch = z.object({
  
})

export const validate = (payload: any) => {
  try {
    userSch.parse(payload)

    return {
      ok: true,
      payload,
      issues: null
    }
  }
  catch (err: any) {
    return {
      ok: false,
      payload: null,
      issues: err?.issues
    }
  }
}