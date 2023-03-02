import clsx from "clsx";
import React from "react";

const VARIANTS = {
  primary:
    "bg-blue-700 font-semibold text-gray-100 hover:bg-blue-600 active:bg-blue-700 active:text-gray-100/70",
  secondary:
    "bg-blue-50 font-medium text-gray-900 hover:bg-blue-100 active:bg-blue-100 active:text-gray-900/60",
};

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
    variant?: keyof typeof VARIANTS;
  }>;

export function Button({
  variant = "primary",
  className,
  onClick,
  ...props
}: Props) {
  className = clsx(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
    VARIANTS[variant],
    className
  );

  return (
    <button className={className} type="button" onClick={onClick} {...props} />
  );
}
