
export default class ApiServices {
  private origin: string = "";
  constructor(origin: string) {
    this.origin = origin;
  }

  signIn = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/create-user`, {
        method: "POST",
        credentials: "same-origin",
        body: payload
      });

      return {
        ok: response.ok,
        response: await response.json()
      }
    } catch (e) {
      console.error(e)
      return {
        ok: false,
        response: null
      }
    }
  };
}
