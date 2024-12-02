import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PostActions from "~/services/posts";
import { useOrigin } from "~/store";

export default function LikeBtn({
  initialState,
  from,
  postId,
}: {
  initialState: string[];
  from: string;
  postId: string;
}) {
  const [count, setCount] = useState(initialState.length);
  const [hasLiked, setHasLiked] = useState(
    initialState.find((like) => like === from) != undefined
  );
  const { origin } = useOrigin();
  const { giveLike, quitLike, updateLikes } = new PostActions(
    from,
    postId,
    origin
  );

  const handleClick = async () => {
    !hasLiked ? setHasLiked(true) : setHasLiked(false);

    const { newLikes } = !hasLiked ? await giveLike() : await quitLike();

    setCount(newLikes?.length);

    const hasLikedByUser =
      newLikes?.find((like: string) => like === from) != undefined;
    setHasLiked(hasLikedByUser);
  };

  // UPDATE LIKES EACH 1s
  const { data } = useQuery({
    queryKey: ["update-likes"],
    queryFn: () => updateLikes(),
    select: (data) => data.newLikes as string[],
    refetchInterval: 4000,
  });
  useEffect(() => {
    const hasLiked = data?.find((like) => like === from);

    setHasLiked(hasLiked != undefined);
  }, [data]);
  return (
    <button
      className="flex flex-row items-end gap-1 transition"
      onClick={handleClick}
      style={{
        filter: hasLiked ? `drop-shadow(0 0 6px rgb(220,20,60))` : "",
        color: hasLiked ? `rgb(220,20,60)` : "",
      }}
      title={hasLiked ? "¡Quitar me gusta!" : "¡Me gusta!"}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-6 h-auto transition-colors text-inherit fill-inherit"
        style={{
          fill: hasLiked ? `rgb(220,20,60)` : "",
        }}
      >
        <g>
          <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
        </g>
      </svg>

      {count}
    </button>
  );
}
