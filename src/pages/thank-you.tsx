import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import { Prose } from "@/components/Prose";
import Seo from "@/components/Seo";
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
            <p>You{"'"}ll get an email as new features are released.</p>
          </Prose>
        </Container>
      </Layout>
    </>
  );
}
