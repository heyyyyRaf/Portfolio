import { profile } from "../data/profile.js";

// Files in /public are served from the site root. With `base: "./"` the path stays relative.
export const resumeHref = profile.resumeFile ? `${import.meta.env.BASE_URL}${profile.resumeFile}` : null;

export const resumeRequestHref = `mailto:${profile.email}?subject=Resume%20request`;
