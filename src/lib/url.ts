export function toDisplayUrl(url: string) {
  return url.replace(/https?:\/\//i, "").replace("www.", "");
}
