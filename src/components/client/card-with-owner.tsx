import type { Author } from "~/types";
import Avatar from "./avatar";

export default function CardWithOwner({ owner }: { owner: Author }) {
  return (
    <article className="absolute bg-black/75 backdrop-blur-md p-4 rounded-md text-white opacity-0 pointer-events-none scale-50 transition">
      <div className="flex items-center gap-2">
        <a href="/admin/profile">
          <Avatar
            avatar={owner.avatar}
            name={owner.name}
            withLetter
            size={70}
          />
        </a>

        <div className=" flex flex-col items-start gap-1">
          <h2 className="">{owner.name}</h2>

          <span className="text-sm text-white/65">@{owner.username}</span>
        </div>
      </div>

      <p>{owner.bio ? owner.bio : "Usuario sin biografía."}</p>

      <footer className="flex text-sm gap-2 text-white/65">
        <span>{owner.followed.length} seguidos.</span>
        <span>{owner.followers.length} seguidores.</span>
      </footer>
    </article>
  );
}
