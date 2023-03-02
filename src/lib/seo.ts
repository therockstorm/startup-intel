import process from "process";

const url = process.env.NEXT_PUBLIC_SITE_URL;
const isPublic = !url?.includes("localhost");

export const SITE_URL = `http${isPublic ? "s" : ""}://${url ?? ""}`;
export const SITE_TITLE = "StartupIntel";
