import { usePostStore } from "~/store";
import PostCard from "./post-card";
import type { Post } from "~/types";
import { useEffect } from "react";
import ApiServices from "~/services/api";

export default function Feed({ origin }: { origin: string }) {
  const { posts: savedPosts, addPosts } = usePostStore();
  const { getPosts } = new ApiServices(origin);
  useEffect(() => {
    getPosts().then(({ response }) => {
      addPosts(response);
    });
  }, []);
  return savedPosts.map((post) => <PostCard post={post} key={post._id} />);
}
