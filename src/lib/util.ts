export function required<T>(name: string, val?: T): T | never {
  return val || thrw(`${name} required`);
}

export function head<T>(val?: T | readonly T[]): T | undefined {
  return Array.isArray(val) ? val[0] : val ?? undefined;
}

export function truncate(str: string, n: number, useWordBoundary = true) {
  if (str.length <= n) return str;

  const subString = str.slice(0, n - 1);
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "\u2026"
  );
}

function thrw(error: string): never {
  throw new Error(error);
}
