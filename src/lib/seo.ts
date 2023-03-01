const isPublic = !process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost");
export const SITE_URL = `http${isPublic ? "s" : ""}://${
  process.env.NEXT_PUBLIC_SITE_URL
}`;
export const SITE_TITLE = "StartupIntel";

export function toJsonLdString(i: string): string {
  return JSON.stringify(i).slice(1, -1);
}
