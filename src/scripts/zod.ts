import { z } from "astro/zod";

const userSch = z.object({
  email: z
    .string()
    .email({ message: "El email debe tener un formato de email válido." }),
  password: z.string(),
  name: z.string(),
  username: z.string().max(15, "Nombre de usuario demasiado largo."),
});
const loginSch = userSch.partial({ username: true, name: true });
export const validate = (payload: any, config?: { partial: boolean }) => {
  try {
    config?.partial ? loginSch.parse(payload) : userSch.parse(payload);

    return {
      ok: true,
      payload,
      issues: null,
    };
  } catch (err: any) {
    return {
      ok: false,
      payload: null,
      issues: err?.issues,
    };
  }
};
