import type { AstroGlobal } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";


export function getSessionValue (astro: Readonly<AstroGlobal<Record<string, any>, AstroComponentFactory, Record<string, string | undefined>>>): string | null {
  const session = astro.cookies.get('session')

  if (!session) return null

  const value = session.value

  return value
}