import Link from "next/link";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  href: string;
}>;

export function ExternalLink({ children, className, href }: Props) {
  return (
    <Link
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
}
