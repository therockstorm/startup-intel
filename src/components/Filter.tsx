import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useFocus } from "@/lib/use-focus";

type Props = Readonly<{
  filter: Readonly<{
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
  }>;
}>;

export default function Filter({ filter }: Props) {
  const [ref, setFocus] = useFocus<HTMLInputElement>();

  useHotkeys("meta+k", () => setFocus(), { preventDefault: true });

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="filter"
      >
        Company search
      </label>
      <div className="relative mt-1 flex items-center">
        <input
          className="block w-full rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          id="filter"
          name="filter"
          onChange={filter.onChange}
          ref={ref}
          type="text"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-500">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
}
