import { faBars, faCheck, faXmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/images/logos/startup-intel.svg";
import { SITE_TITLE } from "@/lib/seo";

import { Button } from "./button";

const navigation: Array<Readonly<{ href: string; name: string }>> = [
  { href: "/about", name: "About" },
];

export function Header() {
  const logo = Logo as string;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
      >
        <div className="flex md:flex-1">
          <Link className="-m-1.5 flex items-center p-1.5" href="/">
            <Image
              alt={`${SITE_TITLE} logo`}
              className="h-8 w-auto"
              src={logo}
            />
            <span className="ml-2 text-3xl">StartupIntel</span>
          </Link>
        </div>
        <div className="hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              className="text-sm font-semibold leading-6 text-gray-900"
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 justify-end">
          <Form className="hidden md:block" />
        </div>
        <div className="flex md:hidden">
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            type="button"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <FontAwesomeIcon
              aria-hidden="true"
              className="h-6 w-6"
              icon={faBars}
            />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <Link className="-m-1.5 p-1.5" href="/">
              <span className="sr-only">{SITE_TITLE}</span>
              <Image
                alt={`${SITE_TITLE} logo`}
                className="h-8 w-auto"
                src={logo}
              />
            </Link>
            <button
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <span className="sr-only">Close menu</span>
              <FontAwesomeIcon
                aria-hidden="true"
                className="h-6 w-6"
                icon={faXmark}
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Form />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

function Form({ className }: Readonly<{ className?: string }>) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/subscriptions", {
      body: JSON.stringify({ email }),
      method: "POST",
    });
    if (response.status === 200) setSubscribed(true);
    else console.error(response.status, await response.json());
  }

  return (
    <form className={className} onSubmit={async (event) => handleSubmit(event)}>
      <div className="flex">
        <input
          required
          aria-label="Email address"
          className="min-w-0 flex-auto rounded-md text-sm"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Button
          className={clsx("ml-4 flex-none", subscribed && "bg-green-700")}
          disabled={subscribed}
          type="submit"
        >
          {subscribed ? (
            <FontAwesomeIcon className="h-5 w-5" icon={faCheck} />
          ) : (
            "Get updates"
          )}
        </Button>
      </div>
    </form>
  );
}
