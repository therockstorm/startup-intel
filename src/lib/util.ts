import process from "process";

export function envVar(name: string): string {
  return required(name, process.env[name]);
}

export function required<T>(name: string, value?: T): T | never {
  return value ?? thrw(`${name} required`);
}

export function head<T>(value: T | T[]): T | undefined {
  return isTypedArray<T>(value) ? value[0] : value ?? undefined;
}

export function truncate(value: string, n: number, useWordBoundary = true) {
  if (value.length <= n) return value;

  const subString = value.slice(0, n - 1);
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "\u2026"
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || typeof value === "undefined";
}

export function typedParse<T>(value: string): T {
  return JSON.parse(value) as T;
}

function thrw(error: string): never {
  throw new Error(error);
}

function isTypedArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}
