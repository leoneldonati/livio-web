import { z } from "astro/zod";

const userSch = z.object({
  email: z.string().email({ message: 'El email debe tener un formato de email válido.' }),
  password: z.string(),
  username: z.string().max(10, 'Nombre de usuario demasiado largo.')
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