import { formatDate } from "~/scripts/date";
import type { Post } from "~/definitions";
import Avatar from "./avatar";
import CardWithOwner from "./card-with-owner";
import LikeBtn from "./post/like-btn";
import PostAssets from "./post/post-assets";

export default function PostCard({
  post,
  adminId,
}: {
  post: Post;
  adminId: string;
}) {
  return (
    <article className="w-full flex flex-row p-2 gap-1 border-t border-b border-black/60 relative">
      {/* SEPARADOR IZQUIERDO */}
      <div className="[&:hover>article]:opacity-100 [&:hover>article]:scale-100 flex">
        <a href={`/${post.author.username}`}>
          <Avatar
            avatar={post.author.avatar}
            name={post.author.name}
            size={300}
            withLetter={false}
          />
        </a>

        <CardWithOwner owner={post.author} />
      </div>

      {/* SEPARADOR DERECHO */}
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1 [&>span]:text-black/60">
          <h2>
            <strong>{post.author.name}</strong>
          </h2>

          <span>
            <a href={`/${post.author.username}`}>@{post.author.username}</a>
          </span>

          <span className="w-1 h-1 rounded-full bg-black/60"></span>
          <span>{formatDate(post.created)}</span>
        </div>

        <p>{post.content}</p>

        {post.assets && <PostAssets id={post._id} assets={post.assets} />}

        <div className="mt-2">
          <LikeBtn initialState={post.likes} from={adminId} postId={post._id} />
        </div>
      </div>
    </article>
  );
}
