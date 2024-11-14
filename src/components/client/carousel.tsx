import { useState } from "react";

export default function Carousel({ paths }: { paths: string[] }) {
  const [position, setPosition] = useState(0);
  return (
    <div className="relative overflow-hidden max-w-[82%] mx-auto aspect-video">
      <div className="flex flex-row gap-2 transition-transform" style={{
        transform: `translateX(-${(position / 2) * 100}%)`
      }}>
        {paths.map((path, index) => (
          <img
            key={index}
            src={path}
            alt=""
            loading="lazy"
            className="max-w-[200px] h-[230px] object-cover aspect-square rounded-xl"
          />
        ))}
      </div>

      <div className="absolute z-20 left-0 top-0 bottom-0 grid place-items-center">
        <button
          type="button"
          className="bg-black/60 fill-white p-2 rounded-full backdrop-blur-md transition hover:bg-black/45 active:bg-black/60"
          onClick={() => {
            if (position === 0) return;
            setPosition(position - 1);
          }}
          style={{
            opacity: paths.length <= 2 || position === 0 ? "0" : "1",
            pointerEvents:
              paths.length <= 2 || position === 0 ? "none" : "auto",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-6 h-auto rotate-180 fill-inherit"
          >
            <g>
              <path d="M12.957 4.54L20.414 12l-7.457 7.46-1.414-1.42L16.586 13H3v-2h13.586l-5.043-5.04 1.414-1.42z"></path>
            </g>
          </svg>
        </button>
      </div>

      <div className="absolute z-20 right-0 top-0 bottom-0 grid place-items-center">
        <button
          type="button"
          className="bg-black/60 fill-white p-2 rounded-full backdrop-blur-md transition hover:bg-black/45 active:bg-black/60"
          onClick={() => {
            if (position === paths.length - 2) return;
            setPosition(position + 1);
          }}
          style={{
            opacity:
              paths.length <= 2 || position === paths.length - 2 ? "0" : "1",
            pointerEvents:
              paths.length <= 2 || position === paths.length - 2
                ? "none"
                : "auto",
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-auto">
            <g>
              <path d="M12.957 4.54L20.414 12l-7.457 7.46-1.414-1.42L16.586 13H3v-2h13.586l-5.043-5.04 1.414-1.42z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
