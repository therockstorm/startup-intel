import { isNullOrUndefined, typedParse } from "../util";

export function parseBody<T>(body: string): T | undefined {
  if (isNullOrUndefined(body)) return undefined;

  return typedParse<T>(body);
}
