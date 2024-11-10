/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 *
 */

await import("./src/env.js");

/** @type {import("next").NextConfig} */

const config = {
  i18n: {
    locales: ["en-US", "fr", "nl-NL"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
};

export default config;
