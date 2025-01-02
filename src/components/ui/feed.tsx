import PostCard from "./post";
import SyncLoader from "react-spinners/SyncLoader";
import HasNewPostsBtn from "./has-new-posts-btn";
import { useStore } from "~/store";
import { useEffect } from "react";
import ApiServices from "~/services/api";

export default function Feed({
  origin,
  adminId,
}: {
  origin: string;
  adminId: string;
}) {
  const { getPosts } = new ApiServices(origin);

  const { posts: savedPosts, loading, addPosts, setLoading } = useStore();

  // GET POSTS IN THE FIRST RENDER
  useEffect(() => {
    if (savedPosts.length !== 0) return;
    setLoading(true);
    getPosts(10)
      .then(({ ok, response }) => {
        if (!ok) return;
        addPosts(response);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      {/* NEW POSTS BTN
      <HasNewPostsBtn
        hasNewPosts={hasNewPosts}
        newPostsLength={newPosts.length}
        handler={addPosts}
      /> */}
      {/* POSTS */}
      {savedPosts.map((post) => (
        <PostCard
          post={post}
          key={post._id}
          adminId={adminId}
          origin={origin}
        />
      ))}
      {/* LOADER */}
      {loading && (
        <SyncLoader
          size={18}
          aria-label="Cargando publicaciones."
          color="#86ff6ecc"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
}
