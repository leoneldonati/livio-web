import type { Post } from "~/definitions";
import { useEffect, useState } from "react";
import ApiServices from "~/services/api";

export default function usePosts(origin: string) {
  const { getPosts } = new ApiServices(origin);

  // BOOLEAN STATES
  const [loading, setLoading] = useState(false);
  const [hasNewPosts, setHasNewPosts] = useState(false);

  // NEW POSTS
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  // OLD POSTS
  const [posts, setPosts] = useState<Post[]>([]);

  //ERRORS
  const [errors, setErrors] = useState<any>(null);

  // HANDLERS
  const handleVisibilityChange = async () => {
    if (document.hidden) return;
    setLoading(true);

    const { response, ok } = await getPosts(10);

    if (!ok) return setErrors(response);

    const filteredPosts = response.filter(
      (post: Post) => posts.find((p) => p._id === post._id) == undefined
    );

    if (filteredPosts.length > 0) {
      setHasNewPosts(true);
      setNewPosts(filteredPosts);
    }
    setLoading(false);
  };
  const addPosts = () => {
    setPosts([...newPosts, ...posts]);
    setHasNewPosts(false);
  };
  const addOnePost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  // VERIFY IF THE DOCUMENT IS HIDDEN
  useEffect(() => {
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // GET POSTS IN THE FIRST RENDER
  useEffect(() => {
    setLoading(true);
    getPosts(10)
      .then(({ ok, response }) => {
        if (!ok) return setErrors(response);
        setPosts(response);
      })
      .finally(() => setLoading(false));
  }, []);
  return {
    errors,
    loading,
    hasNewPosts,
    posts,
    newPosts,
    addOnePost,
    addPosts,
  };
}
