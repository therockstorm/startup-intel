import { isNullOrUndefined, typedParse } from "../util";

export function parseBody<T>(body: string) {
  if (isNullOrUndefined(body)) return undefined;
  if (typeof body === "string") return typedParse<T>(body);

  return body;
}
