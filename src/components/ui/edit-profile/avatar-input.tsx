import { useState } from "react";
import type { Asset } from "~/definitions";

export default function AvatarInput({ avatar }: { avatar: Asset | null }) {
  const [asset, setAsset] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesMap = Object.values(files);

      const srcMap = filesMap.map((file) => URL.createObjectURL(file));

      setAsset(srcMap[0]);
    }
  };
  return (
    <label
      className="admin-profile__avatar"
      title="Cambia la foto del avatar"
      htmlFor="avatar"
    >
      <input
        type="file"
        accept="image/*"
        hidden
        name="avatar"
        id="avatar"
        onChange={handleChange}
      />
      {(avatar || asset) && (
        <img src={avatar?.secureUrl ?? asset} alt="Avatar" loading="lazy" />
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform ${(asset || avatar) && "hidden"}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 8h.01" />
        <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
        <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
    </label>
  );
}
