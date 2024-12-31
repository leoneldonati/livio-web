import { formatDate } from "~/scripts/date";
import type { Post } from "~/definitions";
import Avatar from "../avatar";
import CardWithOwner from "../card-with-owner";
import LikeBtn from "./like-btn";
import PostAssets from "./post-assets";
import CommentBtn from "./comment-btn";

import { useEffect, useState } from "react";
import ExpandableMenu from "./expandable-menu";
import QueryProvider from "../query-provider";

export default function PostCard({
  origin,
  post,
  adminId,
}: {
  post: Post;
  adminId: string;
  origin: string;
}) {
  const [created, setCreated] = useState(formatDate(post.created));
  const ONE_MINUTE = 60 * 1000;
  useEffect(() => {
    const timer = setInterval(() => {
      setCreated(formatDate(post.created));
    }, ONE_MINUTE);

    return () => clearInterval(timer);
  }, []);
  return (
    <QueryProvider>
      <article className="w-full flex flex-row p-2 gap-1 border-t border-b border-black/60 relative">
        {/* SEPARADOR IZQUIERDO */}
        <div className="[&:hover>article]:opacity-100 [&:hover>article]:scale-100 flex">
          <a href={`/${post.author.username}`} className="w-full">
            <Avatar
              avatar={post.author.avatar}
              name={post.author.name}
              size={55}
              withLetter={false}
            />
          </a>

          <CardWithOwner owner={post.author} />
        </div>

        {/* SEPARADOR DERECHO */}
        <div className="flex flex-col flex-1">
          <header className="flex flex-row items-center gap-1 [&>span]:text-black/60">
            <h2>
              <strong>{post.author.name}</strong>
            </h2>

            <span>
              <a href={`/${post.author.username}`}>@{post.author.username}</a>
            </span>

            <span className="w-1 h-1 rounded-full bg-black/60"></span>
            <span>{created}</span>

            <div className="flex flex-1 justify-end items-center relative">
              <ExpandableMenu id={post._id} />
            </div>
          </header>

          <p>{post.content}</p>

          {post.assets && <PostAssets id={post._id} assets={post.assets} />}

          <div className="mt-2 flex flex-row justify-center gap-4">
            <LikeBtn
              initialState={post.likes}
              from={adminId}
              postId={post._id}
              origin={origin}
            />

            <CommentBtn
              comments={post.comments}
              from={adminId}
              postId={post._id}
            />
          </div>
        </div>
      </article>
    </QueryProvider>
  );
}
