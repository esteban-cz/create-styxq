import Link from "next/link";
import { type ReactNode } from "react";

interface LinkAnimatedProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export default function LinkAnimated({
  href,
  onClick,
  children,
  className = "",
}: LinkAnimatedProps) {
  const common = `group relative inline-block cursor-pointer ${className}`;
  const inner = (
    <>
      <span className="decoration-current decoration-1">{children}</span>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-[width] duration-300 ease-in-out group-hover:w-full"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={common}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={common}>
      {inner}
    </button>
  );
}
