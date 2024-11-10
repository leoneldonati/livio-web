import bcrypt from "bcrypt";

export function encryptString(str: string) {
  return bcrypt
    .hash(str, 10)
    .then((hash) => hash)
    .catch((err) => {
      console.error(err);
      return "";
    });
}
