export function parseBody(body: string) {
  if (body == null) return {};
  if (typeof body === "string") return JSON.parse(body);

  return body;
}
