export default class ApiServices {
  private origin: string = "";
  constructor(origin: string) {
    this.origin = origin;
  }

  signIn = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/create-user`, {
        method: "POST",
        body: payload,
      });

      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };
  logIn = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/login-user`, {
        method: "POST",
        body: payload,
        credentials: "include",
      });

      if (!response.ok) {
        return { ok: false, response: null };
      }
      return {
        ok: true,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };

  getUserById = async (id: string) => {
    try {
      const response = await fetch(`${this.origin}/api/get-user-by?id=${id}`, {
        method: "GET",
      });

      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };
  getUserByUsername = async (username: string) => {
    try {
      const response = await fetch(
        `${this.origin}/api/get-user-by?username=${username}`,
        {
          method: "GET",
        }
      );

      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };
  getPostsByUserid = async (id: string) => {
    try {
      const response = await fetch(
        `${this.origin}/api/get-posts-by?userid=${id}`,
        {
          method: "GET",
        }
      );

      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };
  getPosts = async (q: number = 20) => {
    try {
      const response = await fetch(`${this.origin}/api/get-posts?q=${q}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error();
      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };

  createPost = async (payload: FormData) => {
    try {
      const response = await fetch(`${this.origin}/api/create-post`, {
        method: "POST",
        body: payload,
      });

      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };

  editUser = async (payload: FormData, id: string) => {
    try {
      const response = await fetch(`${this.origin}/api/edit-profile?id=${id}`, {
        method: "PATCH",
        body: payload,
      });

      return {
        ok: response.ok,
        response: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        response: null,
      };
    }
  };
}
