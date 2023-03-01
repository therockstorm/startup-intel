import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <script data-domain="startupintel.dev" defer src="/js/script.js" />
        <link href="/favicon.svg" rel="icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
