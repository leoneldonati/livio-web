export default function HasNewPostsBtn({
  hasNewPosts,
  newPostsLength,
  handler,
}: {
  hasNewPosts: boolean;
  newPostsLength: number;
  handler: () => void;
}) {
  return (
    <button
      className={`${hasNewPosts ? "opacity-100" : "opacity-0"} ${hasNewPosts ? "translate-y-0" : "-translate-y-10"} sticky top-0 z-50 transition border-4 border-accent bg-accent/60 hover:text-accent  hover:bg-black/60 text-black backdrop-blur-sm py-2 px-4 rounded-md`}
      onClick={handler}
    >
      {newPostsLength} nuevas publicaciones
    </button>
  );
}
