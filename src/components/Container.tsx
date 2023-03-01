type Props = Readonly<{
  children: React.ReactNode;
}>;

export function Container({ children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  );
}
