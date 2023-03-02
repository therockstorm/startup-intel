import React from "react";

import { Footer } from "./footer";
import { Header } from "./header";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function Layout({ children }: Props) {
  return (
    <div className="min-h-full">
      <Header />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <main>
          <div className="my-6">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
