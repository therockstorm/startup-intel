import React from "react";

import { isNullOrUndefined } from "./util";

export function useFocus<T extends HTMLElement>(): [
  React.RefObject<T>,
  () => void
] {
  const ref = React.useRef<T>(null);

  function setFocus() {
    if (isNullOrUndefined(ref.current)) return;

    ref.current.focus();
  }

  return [ref, setFocus];
}
