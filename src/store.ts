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
    set({ posts: postsFromDb });
  },
}));

type OriginStore = {
  origin: string;
  setOrigin: (origin: string) => void;
};
export const useOrigin = create<OriginStore>((set) => ({
  origin: "",
  setOrigin: (origin) => set({ origin }),
}));
