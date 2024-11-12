
export default class ApiServices {
  private origin: string = "";
  constructor(origin: string) {
    this.origin = origin;
  }

  signIn = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/create-user`, {
        method: "POST",
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
  logIn = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/login-user`, {
        method: "POST",
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

  getUserById = async (id: string) => {
    try {
      const response = await fetch(`${this.origin}/api/get-user-by?id=${id}`, {
        method: "GET",
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
  }
  getPostsByUserid = async (id: string) => {
    try {
      const response = await fetch(`${this.origin}/api/get-posts-by?userid=${id}`, {
        method: "GET",
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
  }
  
  createPost = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/create-post`, {
        method: "POST",
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
  }
}
