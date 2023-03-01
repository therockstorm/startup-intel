import { Container } from "@/components/Container";
import { ExternalLink } from "@/components/ExternalLink";
import { Layout } from "@/components/Layout";
import { Newsletter } from "@/components/Newsletter";
import { Prose } from "@/components/Prose";
import Seo from "@/components/Seo";
import { SITE_TITLE } from "@/lib/seo";

export default function About() {
  return (
    <>
      <Seo
        description={`Learn more about StartupIntel, helping job seekers discover tech startups worth their time.`}
        title={`About - ${SITE_TITLE}`}
      />
      <Layout>
        <Container>
          <Prose className="my-12">
            <h1>About</h1>
            <blockquote>
              Do you want to sell sugar water for the rest of your life or come
              with me and change the world? ―Steve Jobs
            </blockquote>

            <p>
              What if finding the perfect company to invest your precious time
              into sucked less?
            </p>
            <p>40 hours a week. 2,000 hours a year.</p>
            <p>
              That{"'"}s a lot of time to spend at a place that isn{"'"}t doing
              good or going anywhere.
            </p>
            <p>
              StartupIntel gathers lists of startups published by reputable
              sources. Links to insight and review sites enable further
              research. With this information, you can apply for jobs at your
              top choices.
            </p>
            <p>
              Life is too short for{" "}
              <ExternalLink href="https://en.wikipedia.org/wiki/Bullshit_Jobs">
                bullshit jobs
              </ExternalLink>
              . Discover tech startups that matter with StartupIntel.
            </p>
          </Prose>
          <Newsletter />
          <Prose className="my-12">
            <h2>Roadmap</h2>

            <ul>
              <li>
                More lists!
                <ul>
                  <li>
                    <a href="https://news.crunchbase.com/emerging-unicorn-list/">
                      Crunchbase Emerging Unicorn Board
                    </a>
                  </li>
                  <li>
                    <a href="https://wellfound.com/10-of-10-in-2022">
                      AngelList/wellfound 10 of 10
                    </a>
                  </li>
                  <li>
                    <a href="https://www.wealthfront.com/blog/career-launching-companies-list/">
                      Wealthfront Career Launching Companies
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nytimes.com/2019/02/10/technology/these-50-start-ups-may-be-the-next-unicorns.html">
                      New York Times Next Unicorns
                    </a>
                  </li>
                  <li>
                    <a href="https://builtin.com/awards/us/2023/best-places-to-work">
                      builtin Best Places to Work
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <p>
              Did you find a bug or have a feature request that isn{"'"}t on the
              roadmap? This project is open-source, please create a{" "}
              <a href="https://github.com/therockstorm/startup-intel/issues">
                GitHub issue
              </a>
              .
            </p>
          </Prose>
        </Container>
      </Layout>
    </>
  );
}
