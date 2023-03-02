import React from "react";

import { Container } from "@/components/container";
import { Layout } from "@/components/layout";
import { Prose } from "@/components/prose";
import Seo from "@/components/seo";
import { SITE_TITLE } from "@/lib/seo";

export default function ThankYou() {
  return (
    <>
      <Seo
        description={`Thanks for subscribing to ${SITE_TITLE}.`}
        title={`You're subscribed - ${SITE_TITLE}}`}
      />
      <Layout>
        <Container>
          <Prose>
            <div>
              <h1 className="font-medium">Thanks for subscribing.</h1>
            </div>
            <p>You&apos;ll get an email as new features are released.</p>
          </Prose>
        </Container>
      </Layout>
    </>
  );
}
