import "@/globals.css";

import { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import { SITE_TITLE, SITE_URL } from "@/lib/seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo
        openGraph={{
          images: [{ alt: SITE_TITLE, url: `${SITE_URL}/og.png` }],
          locale: "en_US",
          siteName: SITE_TITLE,
          type: "website",
          url: SITE_URL,
        }}
        twitter={{ cardType: "summary_large_image" }}
      />
      <Component {...pageProps} />
    </>
  );
}
