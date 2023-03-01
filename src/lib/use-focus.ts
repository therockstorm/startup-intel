import React from "react";

export function useFocus<T extends HTMLElement>(): [
  React.RefObject<T>,
  () => void
] {
  const ref = React.useRef<T>(null);

  function setFocus() {
    ref.current != null && ref.current.focus();
  }

  return [ref, setFocus];
}
