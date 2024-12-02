import { useState } from "react";
import ApiServices from "~/services/api";
import { usePostStore } from "~/store";
import Carousel from "./carousel";

export default function CreatePostForm({ origin }: { origin: string }) {
  const [assets, setAssets] = useState<string[] | null>(null);
  const [content, setContent] = useState("");
  const { addOnePost } = usePostStore();
  const { createPost } = new ApiServices(origin);

  // MANEJAR ENVIO DE FORMULARIO
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    createPost(form).then(({ ok, response }) => {
      if (ok) {
        addOnePost(response);

        setAssets(null);
        setContent("");
      }
    });
  };

  // MANEJAR CAMBIO DE ESTADO DEL INPUT FILES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesMap = Object.values(files);

      const srcMap = filesMap.map((file) => URL.createObjectURL(file));

      setAssets(srcMap);
    }
  };

  // MANEJAR CAMBIO DE ESTADO INPUT TEXT (contenido)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // BORRAR UN ASSET
  const handleDeleteAsset = (path: string) => {
    if (assets) {
      const filteredAssets = assets.filter((asset) => asset !== path);

      setAssets(filteredAssets);

      if (assets.length === 0) setAssets(null);
    }
  };
  return (
    <form
      encType="multipart/form-data"
      className={`border-t border-b border-black/60 flex flex-col p-2 overflow-hidden`}
      onSubmit={handleSubmit}
    >
      <label htmlFor="content">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="¿¡Qué deseas compartir?!"
          className="focus:outline-none focus:border-none py-2 px-4 my-4 w-full"
          onChange={handleTextChange}
          value={content}
        />
      </label>

      {assets && <Carousel paths={assets} deleteAsset={handleDeleteAsset} />}
      <label
        htmlFor="assets"
        className="w-fit h-auto aspect-square rounded-full border border-black grid place-items-center p-1 cursor-pointer transition "
      >
        <input
          type="file"
          name="assets"
          id="assets"
          accept="images/*"
          multiple
          max={3}
          hidden
          onChange={handleChange}
          title="Sube fotos (max 3)."
        />
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
          <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
          <path d="M4 16v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
        </svg>
      </label>

      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-[rgba(134,290,110,0.8)] w-fit mx-auto"
      >
        Publicar
      </button>
    </form>
  );
}
