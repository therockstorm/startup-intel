import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <script defer data-domain="startupintel.dev" src="/js/script.js" />
        <link href="/favicon.svg" rel="icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
