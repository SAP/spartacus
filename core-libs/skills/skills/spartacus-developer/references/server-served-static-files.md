# Server-Served Static Files

Server-served static files are documents fetched directly from the application's server, independently of Angular page rendering. Their content can come from a deployed file or an application-owned handler. Follow the workflow for the requested document below.

## Supported files

- [robots.txt](#robotstxt)

## robots.txt

### Rule

Treat "add robots.txt" as publishing a working domain-root `/robots.txt` response, not merely creating a file or registering a route. Ask the user to choose the content source, then publish it through the base-site-aware Express handler. A physical file is needed only when the user chooses one. The public URL remains `/robots.txt` regardless of the file's project location or the storefront's base-site path.

### 1. Read the sources and inspect the application

Before changing code or creating a file:

- Read the [robots.txt documentation](https://developers.google.com/search/docs/crawling-indexing/robots/intro) and [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html), not just these links or a summary. Robots.txt controls cooperative crawling; authentication protects private content, and `noindex` addresses indexing separately.
- Read [Base-Site-Aware Express Handlers](base-site-aware-handlers.md), especially application validation, resolution-source configuration, middleware order, and callback/error behavior. Inspect the selected application's real SSR entry point, existing route factory, OCC configuration, and existing robots files or handlers.
- Inspect the installed `@spartacus/setup/ssr` export `EXAMPLE_ROBOTS_TXT` and its actual text. Confirm that `@spartacus/setup/ssr/express-base-site` supports `configureBaseSiteAwareRoutes`, `withBaseSiteInPath: false`, and `BaseSiteHandlerContext<string | null>`. In the framework repository, the content source is `core-libs/setup/ssr/robots/example-robots-txt.ts`; in a customer application, inspect its installed version rather than assuming the repository's version is available.

Complete this step only after reading the protocol references, inspecting the actual example text, and establishing the application's API and server configuration. If a required source cannot be read, report what is unavailable rather than silently proceeding from assumptions. Follow the base-site reference's prerequisites: missing SSR or an incompatible API requires discussion, not an automatic setup or dependency upgrade.

### 2. Ask the user to choose the content source

Unless the request already explicitly chooses a source, ask:

> Would you like to use the example content exported by Spartacus (`EXAMPLE_ROBOTS_TXT`), or create your own robots.txt file?

Wait for the answer before creating content or registering the endpoint. If robots content or a handler already exists, explain what would be reused or changed; preserve existing user content unless its replacement is explicitly requested.

- **Spartacus example:** import `EXAMPLE_ROBOTS_TXT` from `@spartacus/setup/ssr` and serve that string directly. Spartacus supplies content, not a ready-made endpoint or a file to copy into `public/`.
- **Own file:** follow step 3. If the user supplies rules, use them. Otherwise copy the complete current `EXAMPLE_ROBOTS_TXT` text as the initial UTF-8 file and identify it as an editable example, not an inferred production crawler policy.

When adapting content, inspect the application's route aliases and base-site, language, and currency prefixes. Keep the full requested policy: exact pages, subpaths, and query URLs can need separate rules (`/cart$`, `/cart/`, `/cart?`). Wildcards such as `/*/cart` can cover multiple context segments. The example leaves other paths crawlable, including for AI crawlers; search and training crawler policies are separate user decisions. Stores sharing an origin share one discovered file, so its rules must cover all applicable store paths.

### 3. Agree the own-file location and deployment

This step applies only to an own file. Inspect the selected project's asset-copy configuration, browser/server output directories, Express static root, and deployment layout before proposing a path. Distinguish:

- **Source path:** where the developer edits the file, for example `public/robots.txt` if suitable for this application.
- **Deployed path:** where the server can read that file after the application's build and deployment.
- **Public URL:** the domain-root `/robots.txt`, served by the registered handler.

Explain the source-to-deployment mapping, then ask:

> I propose `<source path>` for your robots.txt file, deployed to `<deployed path>` and served at `/robots.txt`. Is this location OK, or would you prefer another path?

Wait for confirmation unless the user already specified the location. Recheck the mapping for a different requested path. A directory called `public` does not establish root-level publishing: the build can copy its contents under `assets/` instead. File creation alone does not complete this task.

Create or reuse the agreed file, ensure it is copied into the application's deployment output, and resolve its deployed location to an absolute server-side path. Use the application's existing runtime directory bindings rather than assuming a working directory or the demo application's layout. Spartacus does not generate or copy this customer file.

### 4. Register the domain-root handler

Use the routing setup from [Base-Site-Aware Express Handlers](base-site-aware-handlers.md). Both content choices use `createBaseSiteAwareRoute` with `route: '/robots.txt'` and `withBaseSiteInPath: false`; neither choice is a static-file-only implementation. This route requires OCC resolution. Reuse an existing OCC-backed factory and preserve its options. If the existing factory uses local UIDs, explain the incompatibility and agree an OCC-backed configuration before changing it.

Keep the named handler at module scope and registration inside the existing Express setup function. Mount at the application root after applicable protective middleware, but before static handlers that could consume the request and before the Angular rendering catch-all. Add only the requested `/robots.txt` endpoint, using the customer's actual bindings.

For the Spartacus-content choice, with the OCC-backed factory already in scope:

```typescript
import { EXAMPLE_ROBOTS_TXT } from '@spartacus/setup/ssr';
import { type BaseSiteHandlerContext } from '@spartacus/setup/ssr/express-base-site';

export function robotsHandler({
  res,
}: BaseSiteHandlerContext<string | null>): void {
  res.status(200).type('text/plain').send(EXAMPLE_ROBOTS_TXT);
}

server.use(
  createBaseSiteAwareRoute({
    route: '/robots.txt',
    withBaseSiteInPath: false,
    handler: robotsHandler,
  })
);
```

For the own-file choice, keep the same registration and use a named handler that sends the confirmed absolute deployed file path with `res.status(200).type('text/plain').sendFile(...)`. Wire that path into the handler using the application's actual server setup; a source path is not automatically a runtime file path. Preserve Express error forwarding when handling file-send errors.

### 5. Return the selected default without requiring a base site

For a storefront identified by a path such as `https://domain.com/en`, `https://domain.com/robots.txt` may match no OCC site pattern. The callback then receives `baseSite: null`. Return the user's selected source anyway: the exported text or the own file. Do not require a base-site prefix, `?site=`, or an inferred default UID to publish the domain file.

The selected source is also the default if the user requests additional per-site content and a resolved UID has no override. Preserve intentionally empty text or zero-byte files as empty HTTP 200 responses; use `??`, not `||`, when selecting text overrides.

An unreadable or missing selected file is a deployment error, not a reason to silently replace the user's content with the Spartacus example. OCC failures and concurrency limits remain the wrapper's 503 responses; they are distinct from a successful resolution with no match and must not be disguised as the default-content case.

### 6. Verify publication, not just registration

Use the application's actual build and SSR start commands. For an own file, confirm that the built/deployed file exists at the exact path the handler uses. Request the running origin-root URL without a base-site prefix or `?site=`:

```bash
curl -i --max-time 10 "<STOREFRONT_ORIGIN>/robots.txt"
```

Complete the task only after checking:

- HTTP 200, UTF-8 `text/plain`, and the complete selected content rather than Angular HTML or a storefront 404 page.
- The same domain-root URL works when the storefront uses a base-site path such as `/en` and OCC resolution returns `null`. Check configured matching and unmatched cases where available; never change production site patterns just to make a test pass.
- Existing per-site overrides, if any, work, and `null` or a UID without an override receives the selected default. An intentionally empty policy stays an empty HTTP 200 response.
- Representative transactional URLs are covered using the application's real route aliases and context prefixes, not merely that the response has the expected status.

Report the chosen content source, the source/deployed paths for an own file, the public URL, and the checks performed. If build or runtime verification is unavailable, state the limitation explicitly; file creation or route registration alone is not verified publication.
