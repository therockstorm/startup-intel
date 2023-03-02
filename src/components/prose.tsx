import clsx from "clsx";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function Prose({ children, className }: Props) {
  return (
    <div className={clsx(className, "prose prose-blue max-w-none")}>
      {children}
    </div>
  );
}
