# Shared research results

GitHub Pages serves static files. To show scores from other devices, a school project administrator must deploy this Worker and its D1 database under an account they manage. The site currently leaves `resultsEndpoint` empty until that deployment is ready.

1. In this directory, run `npx wrangler d1 create slangify-results`; copy the returned database ID into `wrangler.jsonc`.
2. Run `npx wrangler d1 execute slangify-results --remote --file=schema.sql`.
3. Generate a private random value of at least 32 characters and set it with `npx wrangler secret put RESULT_SALT`. Do not put that value in GitHub or the website.
4. Run `npx wrangler deploy`. Confirm `GET https://YOUR-WORKER-URL/aggregate` returns a JSON object.
5. Set `resultsEndpoint:'https://YOUR-WORKER-URL'` in the site's `site-config.js`, publish that change, and confirm a consenting research session appears in the shared summary after synchronization.

Only opt-in research sessions send scores. The Worker hashes session codes with a private salt, stores group and three test scores, and excludes demo sessions. The summary hides score averages for groups with fewer than three participants. Local imported details are separate from the shared summary.

**Limitations:** No existing participant can be synchronized remotely until they revisit the site and opt in on their Results page. This service cannot verify whether a self-reported score is genuine; use teacher-supervised collection for formal research. The aggregate endpoint is public because the existing five-second click combination is visible in client code and cannot act as authentication. Keep identifiable student data out of this service. Consult the school about consent and data handling before enabling uploads.
