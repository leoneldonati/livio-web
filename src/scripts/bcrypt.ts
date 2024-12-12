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

export function compareHash(hash: string, str: string) {
  return bcrypt
    .compare(str, hash)
    .then((isMatched) => isMatched)
    .catch((err) => false);
}
