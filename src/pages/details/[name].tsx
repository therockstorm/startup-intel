import { faBuilding } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Container } from "@/components/container";
import { ExternalLink } from "@/components/external-link";
import { Layout } from "@/components/layout";
import Seo from "@/components/seo";
import { Tooltip } from "@/components/tooltip";
import COMPANIES from "@/data/byId.json";
import { HWOW, LINKS, LISTS } from "@/lib/lists";
import { SITE_TITLE } from "@/lib/seo";
import type { CompaniesById } from "@/lib/types";
import { toDisplayUrl } from "@/lib/url";
import { head } from "@/lib/util";

const companies: CompaniesById = COMPANIES;

export default function Details() {
  const router = useRouter();
  if (typeof router.query.name === "undefined") return null;

  const name = head(router.query.name) ?? "";
  const company = companies[name];

  return (
    <>
      <Seo
        description={`${SITE_TITLE} on ${company.name}.`}
        title={`${company.name} - ${SITE_TITLE}`}
      />
      <Layout>
        <Container>
          <div className="py-5">
            <div className="flex items-center">
              <div className="h-14 w-14 flex-shrink-0">
                {company.urls.logo ? (
                  <Image
                    alt={`${company.name} logo`}
                    className="h-14 w-14 rounded-full"
                    height={56}
                    src={company.urls.logo}
                    width={56}
                  />
                ) : (
                  <FontAwesomeIcon className="h-14 w-14" icon={faBuilding} />
                )}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl text-gray-900">{company.name}</h1>
                {company.urls.website && (
                  <div className="mt-1 text-sm text-gray-500">
                    <ExternalLink href={company.urls.website}>
                      {toDisplayUrl(company.urls.website)}
                    </ExternalLink>
                  </div>
                )}
              </div>
              <div className="ml-4 flex flex-1 justify-end gap-x-2">
                {Object.values(LINKS).map((l) => {
                  return (
                    <Tooltip key={l.name} text={l.name}>
                      <ExternalLink
                        href={`${l.searchUrl}${encodeURIComponent(
                          company.name
                        )}`}
                      >
                        <Image
                          alt={l.name}
                          className="h-6 w-6 rounded-full"
                          src={l.logo}
                        />
                      </ExternalLink>
                    </Tooltip>
                  );
                })}
                {company.hiringWithoutWhiteboards && (
                  <Tooltip text={HWOW.title}>
                    <ExternalLink href={HWOW.url}>
                      <Image
                        alt={HWOW.title}
                        className="h-6 w-6 rounded-full"
                        src={HWOW.logo}
                      />
                    </ExternalLink>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          {company.lists.map((l) => {
            const list = LISTS[l.list];
            return (
              <div
                key={list.url}
                className="border-t border-gray-400 py-5 sm:p-0"
              >
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Source
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ExternalLink
                        className="link group block flex-shrink-0"
                        href={list.url}
                      >
                        <div className="flex items-center">
                          <Image
                            alt={list.title}
                            className="m-0 inline-block h-6 w-6 rounded-full"
                            src={list.logo}
                          />
                          <div className="ml-3">
                            <p className="m-0 text-sm">{list.title}</p>
                          </div>
                        </div>
                      </ExternalLink>
                    </dd>
                  </div>
                  {list.keys.map((k) => {
                    const text = l[k.key as keyof typeof l] as string;
                    return (
                      <div
                        key={k.key}
                        className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5"
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          {k.display}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {k.type === "link" ? (
                            <ExternalLink className="link" href={text}>
                              {toDisplayUrl(text)}
                            </ExternalLink>
                          ) : (
                            text
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            );
          })}
        </Container>
      </Layout>
    </>
  );
}
