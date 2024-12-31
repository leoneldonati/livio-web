import PostCard from "./post";
import QueryProvider from "./query-provider";
import CreatePostForm from "./create-post-form";
import SyncLoader from "react-spinners/SyncLoader";
import usePosts from "~/hooks/usePosts";
import HasNewPostsBtn from "./has-new-posts-btn";

export default function Feed({
  origin,
  adminId,
}: {
  origin: string;
  adminId: string;
}) {
  const {
    posts: savedPosts,
    newPosts,
    loading,
    hasNewPosts,
    addPosts,
  } = usePosts(origin);

  return (
    <QueryProvider>
      {/* CREATE POST */}
      <CreatePostForm origin={origin} />

      {/* NEW POSTS BTN */}
      <div className="relative w-full">
        <HasNewPostsBtn
          hasNewPosts={hasNewPosts}
          newPostsLength={newPosts.length}
          handler={addPosts}
        />
      </div>

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
    </QueryProvider>
  );
}
