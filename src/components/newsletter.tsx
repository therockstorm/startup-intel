import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Button } from "@/components/button";

type Props = Readonly<{
  className?: string;
  subtitle?: string;
  title?: string;
}>;

export function Newsletter({
  className,
  title = "Get updates",
  subtitle = "New startups form and data update often. Stay in the loop. Unsubscribe at any time.",
}: Props) {
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
    <form
      className={`not-prose rounded-2xl border border-zinc-100 p-6 text-sm dark:border-zinc-700/40 ${
        className ?? ""
      }`}
      onSubmit={async (event) => handleSubmit(event)}
    >
      <h2 className="flex font-semibold text-zinc-900 dark:text-zinc-100">
        <FontAwesomeIcon className="h-6 w-6 flex-none" icon={faEnvelope} />
        <span className="ml-3">{title}</span>
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">{subtitle}</p>
      {subscribed && (
        <p className="mt-2 text-green-700 dark:text-green-500">
          Thanks for subscribing!
        </p>
      )}
      <div className="mt-6 flex">
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
        <Button className="ml-4 flex-none" type="submit">
          Get updates
        </Button>
      </div>
    </form>
  );
}
