import { formatDate } from "~/scripts/date";
import type { Post } from "~/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="w-full flex flex-row p-2 gap-1 border-t border-b border-black/60">
      {/* SEPARADOR IZQUIERDO */}
      <div>
        <a href="/admin/profile">
          <img
            src={post.author.avatar?.secureUrl}
            alt={post.author.name}
            width={post.author.avatar?.width}
            height={post.author.avatar?.height}
            loading="lazy"
          />
        </a>
      </div>

      {/* SEPARADOR DERECHO */}
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-1 [&>span]:text-black/60">
          <h2>
            <strong>{post.author.name}</strong>
          </h2>

          <span>
            <a href="/admin/profile">@{post.author.username}</a>
          </span>

          <span className="w-1 h-1 rounded-full bg-black/60"></span>
          <span>{formatDate(post.created)}</span>
        </div>

        <p>{post.content}</p>

        <div>
          <button className="flex flex-row items-end gap-1 transition-colors ">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-auto">
              <g>
                <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
              </g>
            </svg>

            {post.likes.length}
          </button>
        </div>
      </div>
    </article>
  );
}
