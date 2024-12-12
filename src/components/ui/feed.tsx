import { usePostStore, useOrigin } from "~/store";
import PostCard from "./post-card";
import { useEffect } from "react";
import ApiServices from "~/services/api";
import QueryProvider from "./query-provider";

export default function Feed({
  origin,
  adminId,
}: {
  origin: string;
  adminId: string;
}) {
  const { posts: savedPosts, addPosts } = usePostStore();
  const { setOrigin } = useOrigin();
  const { getPosts } = new ApiServices(origin);

  useEffect(() => {
    getPosts().then(({ response }) => {
      addPosts(response);
      console.log(response);
    });
    setOrigin(origin);
  }, []);

  return (
    <QueryProvider>
      {savedPosts.map((post) => (
        <PostCard post={post} key={post._id} adminId={adminId} />
      ))}
    </QueryProvider>
  );
}
