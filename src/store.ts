import { create } from "zustand";
import type { Post } from "./definitions";

type State = {
  posts: Post[];
  newPosts: Post[];
  loading: boolean;
  hasNewPosts: boolean;
  addPosts: (newPosts: Post[]) => void;
  addOnePost: (newPost: Post) => void;
  setHasNewPosts: (hasNewPosts: boolean) => void;
  setLoading: (loading: boolean) => void;
};

export const useStore = create<State>((set) => ({
  posts: [],
  newPosts: [],
  loading: false,
  hasNewPosts: false,
  addPosts: (newPosts) =>
    set((state) => ({ posts: [...newPosts, ...state.posts] })),
  addOnePost: (newPost) =>
    set((state) => ({ posts: [newPost, ...state.posts] })),
  setHasNewPosts: (hasNewPosts) => set({ hasNewPosts }),
  setLoading: (loading) => set({ loading }),
}));
