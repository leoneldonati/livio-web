import { useState } from "react";

export default function ExpandableMenu({ id }: { id: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpened(!opened)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-6 w-6 transition-transform ${opened ? "rotate-180" : "rotate-0"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <ul
        className={`absolute top-6 right-0 backdrop-blur z-50 bg-white border border-black/60 rounded-md ${!opened && "-translate-y-10"} ${!opened && "opacity-0"} ${!opened && "pointer-events-none"} transition duration-300`}
      >
        <li>
          <button>Borrar</button>
        </li>
        <li>
          <a href={`/post/${id}/edit`}>Editar</a>
        </li>
        <li>
          <button>Guardar</button>
        </li>
      </ul>
    </div>
  );
}
