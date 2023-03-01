import Head from "next/head";
import { usePathname } from "next/navigation";
import { NextSeo } from "next-seo";

import { SITE_URL } from "@/lib/seo";

type Props = Readonly<{
  description: string;
  title: string;
}>;

export default function Seo({ description, title }: Props): JSX.Element {
  const path = usePathname();
  const url = `${SITE_URL}${path}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NextSeo
        canonical={url}
        description={description}
        openGraph={{ description, title, url }}
        title={title}
      />
    </>
  );
}
