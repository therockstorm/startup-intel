import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
  text: string;
}>;

export function Tooltip({ children, text }: Props): JSX.Element {
  return (
    <span className="group relative">
      <span className="pointer-events-none absolute -top-10 left-3/4 -translate-x-3/4 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-white opacity-0 transition before:absolute before:left-3/4 before:top-full before:-translate-x-3/4 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
        {text}
      </span>

      {children}
    </span>
  );
}
