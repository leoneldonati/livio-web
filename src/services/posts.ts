export default class PostActions {
  private postId: string = "";
  private origin: string = "";
  private from: string = "";
  constructor(from: string, id: string, origin: string) {
    this.postId = id;
    this.origin = origin;
    this.from = from;
  }

  giveLike = async () => {
    try {
      const response = await fetch(
        `${this.origin}/api/post-actions?type=like&id=${this.postId}&from=${this.from}`,
        {
          method: "PATCH",
        }
      );

      return {
        ok: response.ok,
        newLikes: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        newLikes: null,
      };
    }
  };

  quitLike = async () => {
    try {
      const response = await fetch(
        `${this.origin}/api/post-actions?type=dislike&id=${this.postId}&from=${this.from}`,
        {
          method: "PATCH",
        }
      );

      return {
        ok: response.ok,
        newLikes: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        newLikes: null,
      };
    }
  };
  updateLikes = async () => {
    try {
      const response = await fetch(
        `${this.origin}/api/post-actions?type=get_updated_likes&id=${this.postId}&from=${this.from}`,
        {
          method: "PATCH",
        }
      );

      return {
        ok: response.ok,
        newLikes: await response.json(),
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        newLikes: null,
      };
    }
  };
}
