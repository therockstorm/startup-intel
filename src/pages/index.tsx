import React from "react";

import { Layout } from "@/components/layout";
import Seo from "@/components/seo";
import Table from "@/components/table";
import { SITE_TITLE } from "@/lib/seo";

export default function Home(): JSX.Element {
  return (
    <>
      <Seo
        description="Life is too short for bullshit jobs. Wisely invest the 2,000 hours a year you spend at work. Use StartupIntel: discover tech startups that matter."
        title={`${SITE_TITLE}: discover career-launching tech startups.`}
      />
      <Layout>
        <Table />
      </Layout>
    </>
  );
}
