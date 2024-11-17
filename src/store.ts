import { create } from "zustand";
import type { Post } from "./types";

type PostStore = {
  posts: Post[];
  addOnePost: (newPost: Post) => void;
  addPosts: (posts: Post[]) => void;
};
export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  addOnePost: (newPost) => {
    const { posts: oldPosts } = get();

    set({ posts: [...oldPosts, newPost] });
  },
  addPosts: (postsFromDb) => {
    const { posts: oldPosts } = get();
    set({ posts: [...postsFromDb, ...oldPosts] });
  },
}));
