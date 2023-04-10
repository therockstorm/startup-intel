import { faBuilding } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { paramCase } from "param-case";
import React from "react";

import COMPANIES from "@/data/list.json";
import { HWOW, LINKS, LISTS } from "@/lib/lists";
import { SITE_TITLE } from "@/lib/seo";
import type { Company } from "@/lib/types";
import { toDisplayUrl } from "@/lib/url";
import { truncate } from "@/lib/util";

import { Button } from "./button";
import { ExternalLink } from "./external-link";
import Search from "./filter";
import { Tooltip } from "./tooltip";

function sortCompanies(cs: Company[], sortNameAsc: boolean) {
  return cs.sort(
    (a, b) =>
      (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1) *
      (sortNameAsc ? 1 : -1)
  );
}

const companies: Company[] = sortCompanies(COMPANIES, true);

const PAGE_SIZE = 25;

export default function Table() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [filter, setFilter] = React.useState<string>();
  const router = useRouter();

  const filtered = companies.filter((d) =>
    filter ? d.name.toLowerCase().includes(filter) : true
  );

  const startIndex = page * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filtered.length);

  React.useEffect(() => {
    // https://tailwindcss.com/docs/screens
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });
  });

  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
    setPage(0);
  }

  function handlePrevious() {
    setPage(Math.max(page - 1, 0));
  }

  function handleNext() {
    setPage(Math.min(page + 1, filtered.length / PAGE_SIZE + 1));
  }

  return (
    <>
      <h1 className="sr-only">{SITE_TITLE}</h1>
      <div className="sm:flex sm:items-center">
        <Search filter={{ onChange: handleFilterChange, value: filter }} />
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="py-3.5 pl-4 pr-3 text-left font-medium sm:pl-6"
                      scope="col"
                    >
                      Name
                    </th>
                    <th
                      className="hidden px-3 py-3.5 text-left font-medium lg:table-cell"
                      scope="col"
                    >
                      Description
                    </th>
                    <th
                      className="px-3 py-3.5 text-left font-medium"
                      scope="col"
                    >
                      Research
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filtered.length > 0 ? (
                    filtered
                      .slice(startIndex, startIndex + PAGE_SIZE)
                      .map((company) => (
                        <tr
                          key={paramCase(company.name)}
                          className=" hover:bg-gray-50"
                        >
                          <td
                            className="cursor-pointer whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6"
                            onClick={async () =>
                              router.push(
                                `/details/${encodeURIComponent(company.name)}`
                              )
                            }
                          >
                            <div className="group block flex-shrink-0">
                              <div className="flex items-center">
                                <div className="h-5 w-5 flex-shrink-0">
                                  {company.urls.logo ? (
                                    <Image
                                      alt={`${company.name} logo`}
                                      className="h-5 w-5 rounded-full"
                                      height={20}
                                      src={company.urls.logo}
                                      width={20}
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      className="h-5 w-5"
                                      icon={faBuilding}
                                    />
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {company.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                            <p>{truncate(company.description, 65)}</p>
                            {company.urls.website && (
                              <div className="mt-2 text-sm text-gray-500">
                                <ExternalLink href={company.urls.website}>
                                  {toDisplayUrl(company.urls.website)}
                                </ExternalLink>
                              </div>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex w-40 gap-x-2">
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
                            <div className="mt-2 flex gap-x-2">
                              {company.lists.map((l) => {
                                const list = LISTS[l.list];
                                return (
                                  <Tooltip key={l.list} text={list.title}>
                                    <ExternalLink href={list.url}>
                                      <Image
                                        alt={list.title}
                                        className="h-6 w-6 rounded-full"
                                        src={list.logo}
                                      />
                                    </ExternalLink>
                                  </Tooltip>
                                );
                              })}
                              {/* <span className="inline-flex items-center">+2</span> */}
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        colSpan={3}
                      >
                        No results
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={isMobile ? 2 : 3}>
                      <nav
                        aria-label="Pagination"
                        className="flex items-center justify-between bg-white px-4 py-3 sm:px-6"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing{" "}
                            <span className="font-medium">
                              {endIndex === 0 ? 0 : startIndex + 1}
                            </span>{" "}
                            to <span className="font-medium">{endIndex}</span>{" "}
                            of{" "}
                            <span className="font-medium">
                              {filtered.length}
                            </span>{" "}
                            results
                          </p>
                        </div>
                        <div className="flex flex-1 justify-between sm:justify-end">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              handlePrevious();
                            }}
                          >
                            Previous
                          </Button>
                          <Button
                            className="ml-3"
                            variant="secondary"
                            onClick={() => {
                              handleNext();
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </nav>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
