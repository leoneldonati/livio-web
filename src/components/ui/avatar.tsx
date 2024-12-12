import type { Asset } from "~/definitions";
import defaultAvatar from "~/assets/user.png";

export default function Avatar({
  avatar,
  name,
  size,
  withLetter,
  className,
}: {
  avatar: Asset | null;
  name: string;
  size?: number;
  withLetter: boolean;
  className?: string;
}) {
  const firstLetter = name?.charAt(0);
  return (
    <div className="relative backdrop-blur-md rounded-full overflow-hidden aspect-square border-4 border-white">
      <img
        src={avatar?.secureUrl ?? defaultAvatar.src}
        alt={name}
        loading="lazy"
        width={size || avatar?.width}
        height={size || avatar?.height}
        className={`object-cover object-center aspect-square ${className}`}
      />

      {!avatar && withLetter && (
        <span
          style={{
            color: "var(--color_p)",
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 font-bold px-1 rounded-md bg-white/45"
        >
          {firstLetter}
        </span>
      )}
    </div>
  );
}
