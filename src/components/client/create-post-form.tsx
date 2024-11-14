import { useState } from "react";
import ApiServices from "~/services/api";
import { usePostStore } from "~/store";
import Carousel from "./carousel";

export default function CreatePostForm({ origin }: { origin: string }) {
  const [assets, setAssets] = useState<string[] | null>(null);
  const { addOnePost } = usePostStore();
  const { createPost } = new ApiServices(origin);

  // MANEJAR CAMBIO DE ESTADO DEL INPUT FILES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesMap = Object.values(files);

      const srcMap = filesMap.map((file) => URL.createObjectURL(file));

      setAssets(srcMap);
    }
  };
  return (
    <form
      encType="multipart/form-data"
      className="border border-black/80 flex flex-col"
    >
      <label htmlFor="content">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="¿¡Qué deseas compartir?!"
          className="focus:outline-none focus:border-none"
        />
      </label>

      {assets && (
        <Carousel
          paths={assets}
          deleteAsset={(path) => {
            const filteredAssets = assets.filter((asset) => asset !== path);

            setAssets(filteredAssets);
          }}
        />
      )}
      <label
        htmlFor="assets"
        className="w-7 h-7 aspect-square rounded-full border border-black"
      >
        <input
          type="file"
          name="assets"
          id="assets"
          accept="images/*"
          multiple
          hidden
          onChange={handleChange}
        />
      </label>

      <button type="submit">Publicar</button>
    </form>
  );
}
