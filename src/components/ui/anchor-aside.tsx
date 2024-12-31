import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  hoverTitle: string;
  href: string;
  styles?: string;
  children: ReactNode;
}
export default function AnchorAside({
  hoverTitle,
  href,
  styles,
  children,
}: Props) {
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === href && anchorRef.current) {
      anchorRef.current.style.backgroundColor = "rgba(134,290,110,.8)";
    }
  }, []);
  return (
    <a
      href={href}
      ref={anchorRef}
      title={hoverTitle}
      className={styles}
      id="anchor"
    >
      {children}
    </a>
  );
}
