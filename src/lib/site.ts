/** Canonical site origin used for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://mrsonam.github.io";
}

export const SITE_NAME = "Sonam Wangdi Sherpa";
export const SITE_TITLE = "Sonam Wangdi Sherpa | Software Engineer";
export const SITE_DESCRIPTION =
  "Portfolio of Sonam Wangdi Sherpa, a software engineer with extensive experience in fullstack development, based in Australia.";
