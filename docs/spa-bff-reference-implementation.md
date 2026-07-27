# Spartacus — BFF Reference Implementation

This document describes the complete reference implementation for integrating a Vivaldi
BFF (Backend for Frontend) with Spartacus. It covers all files you need to
create or modify on both the **Spartacus storefront** and the **Vivaldi BFF**
sides, and how they work together.

> **Scope:** This guide covers CSR (Client-Side Rendering) deployment only. SSR support on CCv2 is planned but not yet validated for the initial release.

## Table of Contents

- [Getting started from scratch](#getting-started-from-scratch)
  - [Step 1: Create the Vivaldi BFF workspace](#step-1-create-the-vivaldi-bff-workspace)
  - [Step 2: Create the Spartacus storefront](#step-2-create-the-spartacus-storefront)
  - [Step 3: Import the storefront into the Vivaldi workspace](#step-3-import-the-storefront-into-the-vivaldi-workspace)
  - [Step 4: Configure storefrontapp as an Nx project](#step-4-configure-storefrontapp-as-an-nx-project)
    - [4a. Register the @nx/angular plugin in nx.json](#4a-register-the-nxangular-plugin-in-nxjson)
    - [4b. Create apps/storefrontapp/project.json](#4b-create-appsstorefrontappprojectjson)
    - [4c. Migrate angular.json to project.json](#4c-migrate-angularjson-to-projectjson-existing-angular-cli-projects-only)
    - [4d. Add @repo/bff/* path aliases to the storefrontapp tsconfig.json](#4d-add-repobff-path-aliases-to-the-storefrontapp-tsconfigjson)
    - [4e. Fix .angular/cache appearing as untracked files](#4e-fix-angularcache-appearing-as-untracked-files)
  - [Step 5: Base Spartacus configuration](#step-5-base-spartacus-configuration)
- [Architecture and URL injection](#architecture-and-url-injection)
- [Spartacus changes](#spartacus-changes)
  - [CRITICAL: Remove hardcoded baseUrl](#critical-remove-hardcoded-baseurl-from-spartacus-configuration)
  - [CRITICAL: OCC URL must have a CA-signed certificate](#critical-occ-url-must-have-a-valid-ca-signed-certificate-for-bff-use)
  - [1. index.html](#1-srcindexhtml)
  - [2. bff-base-url.token.ts](#2-srcappbffbff-base-urltokents-new-file)
  - [3. bff-error-handling.link.ts](#3-srcappbffbff-error-handlinglinkts-new-file)
  - [4. bff-auth.link.ts](#4-srcappbffbff-authlinkts-new-file)
  - [5. bff-timeout.link.ts](#5-srcappbffbff-timeoutlinkts-new-file)
  - [6. bff-client.service.ts](#6-srcappbffbff-clientservicets-new-file)
  - [8. proxy.conf.js](#8-proxyconfjs-new-file-project-root)
  - [9. project.json](#9-projectjson-modify-storefrontapp)
  - [10. package.json scripts](#10-packagejson-scripts)
  - [11. .env-cmdrc](#11-env-cmdrc-create-or-modify-project-root)
  - [12. Example: custom BFF procedure](#12-example-custom-bff-procedure-srcappbffexamplessay-hellocomponentts)
  - [13. Example: OCC call via BFF](#13-example-occ-call-via-bff-srcappbffexamplesocc-base-sitescomponentts)
  - [14. bff-example.providers.ts](#14-appsrcbffexamplesbff-exampleprovidersts-new-file)
- [Known issue — E401 on CCv2 build agents](#known-issue--npm-error-code-e401-on-ccv2-build-agents)
- [Vivaldi BFF changes](#vivaldi-bff-changes)
  - [15. env.d.ts](#15-appsbffenvdts-modify)
  - [16. vivaldi.apis.ts](#16-appsbffvivaldiapists-modify)
  - [17. destinations.ts](#17-packagescontractsbffdestinationsts-modify)
  - [18. context.ts](#18-appsbffsrcapicontextts-modify)
  - [19. occ.ts router](#19-appsbffsrcapiroutersoccts-new-file)
  - [20. root.ts](#20-appsbffsrcapiroutersrootts-modify)
  - [21. .env](#21-appsbffenv-local-dev-only)
- [File overview](#file-overview)
- [Testing locally](#testing-locally)
- [Deployment notes](#deployment-notes)
- [References](#references)

---
 
## Getting started from scratch

These steps describe how to create a fresh Nx monorepo that contains both a Vivaldi BFF
and a Spartacus Angular storefront, starting from nothing. Follow them in order
before applying the BFF integration changes described in the rest of this document.

### Prerequisites

> **Version pinning note:** This guide pins exact versions of Spartacus and Vivaldi
> packages because it documents what was tested for the initial release. In future
> iterations the exact versions will be replaced with `@latest` so customers always
> start from the newest available release without needing doc updates on every version
> bump.

| Tool | Required version | Notes |
|---|---|---|
| Node.js | 20 LTS or 22 LTS | Earlier versions are not tested |
| Angular CLI | 21.2.x | Do **not** use 21.1.x — it has peer-dep conflicts with Spartacus 221121.13.1 |
| Spartacus schematics | 221121.13.1 | — |
| `@vivaldi/nx` generator | 0.25.0 | — |

#### SAP npm registry access

Both `@vivaldi/*` and `@spartacus/*` packages are hosted on SAP's internal npm registry (Artifactory), not the public npm registry. Every `npm install` in this guide requires a valid `SAP_RBSCTOKEN` in your shell environment:

```bash
export SAP_RBSCTOKEN=<your-token>
```

**Before running any command in this guide**, add both registry scopes to your **user-level `~/.npmrc`**. This is required because `npx @vivaldi/nx` in Step 1 must resolve `@vivaldi/nx` from the SAP registry before the workspace `.npmrc` exists — there is a chicken-and-egg problem if you rely solely on a workspace-level file.

```
@vivaldi:registry=https://73555000100900008602.npmsrv.base.repositories.cloud.sap/
//73555000100900008602.npmsrv.base.repositories.cloud.sap/:_auth=${SAP_RBSCTOKEN}
//73555000100900008602.npmsrv.base.repositories.cloud.sap/:always-auth=true
@spartacus:registry=https://73554900100900004337.npmsrv.base.repositories.cloud.sap/
//73554900100900004337.npmsrv.base.repositories.cloud.sap/:_auth=${SAP_RBSCTOKEN}
//73554900100900004337.npmsrv.base.repositories.cloud.sap/:always-auth=true
```

The `@vivaldi/nx` scaffolder also creates a `.npmrc` in the workspace root with the `@vivaldi` scope. The `@spartacus` scope is not added by the scaffolder — it must come from your user-level `~/.npmrc` as shown above.

> **Note:** The E401 lockfile-regeneration workaround in Step 4 (`NPM_CONFIG_REGISTRY=https://registry.npmjs.org/ npm install`) applies **only** to regenerating `package-lock.json` against the public registry to avoid Artifactory-resolved URLs in the lockfile. Use it only for that specific step — do not use it for the main `npm install` commands, as `@vivaldi/*` and `@spartacus/*` packages are not on the public registry.

---

### Step 1: Create the Vivaldi BFF workspace

Use the Vivaldi Nx generator to scaffold a workspace.

```bash
npx @vivaldi/nx@0.25.0 --no-interactive --workspace=my-vivaldi-workspace --nxCloud=skip
cd my-vivaldi-workspace
```

This creates an Nx monorepo with an `apps/bff` application pre-configured for Vivaldi.

> **Required:** the workspace must be a git repository before Step 3. The generator
> prints "Initializing git repository..." but does not complete the commit. Run:
> ```bash
> git init && git add -A && git commit -m "chore: initial vivaldi workspace"
> ```

Install `nx` and `@nx/angular` aligned to the same version as the other `@nx/*` packages
already installed by the scaffolder. The scaffolder pins `nx` at a lower version than
the `@nx/*` packages it installs — leaving them mismatched causes `nx import` to pick
the wrong `@nx/vitest` version and fail with an ERESOLVE error. Check the installed
`@nx/vite` version and use that for both:

```bash
node -e "console.log(require('./node_modules/@nx/vite/package.json').version)"

npm install --save-dev nx@22.7.7 @nx/angular@22.7.7
```

The scaffolded `tsconfig.base.json` uses `"baseUrl": "."` which TypeScript 5.9+ treats
as deprecated, causing `nx run bff:typecheck` to fail with `TS5101`. Add
`"ignoreDeprecations": "6.0"` to `tsconfig.base.json` to silence it:

```json
"baseUrl": ".",
"ignoreDeprecations": "6.0"
```

> **Required before Step 3:** the workspace must be in a clean git state before
> running `nx import`. Two things can make it dirty after this point:
>
> 1. The `npm install` above modifies `package-lock.json`
> 2. Running any `nx` workspace command for the first time prompts "Share usage
>    data with the Nx team?" — answering either way writes `"analytics": false/true`
>    to `nx.json`. Note: `nx --version` does **not** trigger this prompt — use a
>    real workspace command such as `nx show projects`.
>
> Trigger the analytics prompt now (before Step 3), then commit everything:
> ```bash
> npx nx show projects   # triggers the analytics prompt if not yet answered
> git add -A && git commit -m "chore: align nx and @nx/angular versions"
> ```

---

### Step 2: Create the Spartacus storefront

> **Skip this step** if you already have an existing Angular application.

> **Important:** create the storefront **outside** `my-vivaldi-workspace`. If you run
> `ng new` from inside the Vivaldi workspace, the storefront lands as a subfolder of
> that git repository — making the workspace dirty and causing `nx import` to refuse
> with "You have uncommitted changes". The storefront must be a sibling directory,
> not a child of `my-vivaldi-workspace`.

**Prerequisite:** install the Angular CLI globally.

```bash
npm install -g @angular/cli@21
```

Navigate out of the Vivaldi workspace before creating the storefront:

```bash
cd .. 
ng new my-storefront-app --style=scss --zoneless=false \
  --file-name-style-guide=2016
cd my-storefront-app
```

Commit immediately after `ng new` — before adding Spartacus. If the schematics fail
or produce only a partial result, this gives you a clean rollback point without having
to recreate the Angular app from scratch:

```bash
git init && git add -A && git commit -m "chore: initial Angular app"
```

Add the Spartacus schematics:

```bash
ng add @spartacus/schematics@221121.13.1 --skip-confirmation
```

When the feature selection prompt appears, use **Space** to toggle features and **Enter**
to confirm. Accept the defaults or customise the selection to match your project's needs.

Commit the Spartacus changes:

```bash
git add -A && git commit -m "chore: add Spartacus schematics"
```

---

### Step 3: Import the storefront into the Vivaldi workspace

Return to the Vivaldi workspace root and run the import:

```bash
cd ../my-vivaldi-workspace
npx nx import ../my-storefront-app apps/storefrontapp --ref=main
```

The command asks two questions interactively — press **Enter** at both (import the
entire repository, do not update package.json scripts). It then shows a plugin
selection prompt:

```
? Which plugins would you like to add? Press <Space> to select and <Enter> to submit.
```

Press **Space** to deselect `@nx/vitest` (and any other pre-selected plugin), then
**Enter** to submit with nothing selected. `@nx/vitest` cannot be installed cleanly
due to a version split in the workspace (see Step 1), and `@nx/angular` is registered
manually in Step 4 — no plugins are needed here.

> **Note:** `--plugins=skip` is documented by Nx but only takes effect in AI agent
> mode (`isAiAgent() === true`). It is silently ignored in a regular interactive
> terminal session — the interactive prompt always appears regardless.

---

### Step 4: Configure storefrontapp as an Nx project

After importing, manual wiring is needed to make Nx aware of the Angular targets.

> **Note:** the `project.json` paths below (`apps/storefrontapp/src/...`) assume the
> storefront was imported as a plain Angular CLI project. Do not run `nx init --integrated`
> on the storefront before importing — it nests the source at the wrong depth and breaks
> all paths in the template below.

#### 4a. Register the `@nx/angular` plugin in `nx.json`

Add to `nx.json` → `plugins` array:

```json
{
  "plugin": "@nx/angular/plugin",
  "options": {
    "buildTargetName": "build",
    "serveTargetName": "serve",
    "testTargetName": "test",
    "extractI18nTargetName": "extract-i18n",
    "serveStaticTargetName": "serve-static"
  }
}
```

#### 4b. Create `apps/storefrontapp/project.json`

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "storefrontapp",
  "projectType": "application",
  "sourceRoot": "apps/storefrontapp/src",
  "tags": [],
  "targets": {
    "build": {
      "executor": "@angular/build:application",
      "options": {
        "outputPath": "dist/apps/storefrontapp",
        "browser": "apps/storefrontapp/src/main.ts",
        "polyfills": ["zone.js"],
        "tsConfig": "apps/storefrontapp/tsconfig.app.json",
        "inlineStyleLanguage": "scss",
        "assets": [
          { "glob": "**/*", "input": "apps/storefrontapp/public" },
          {
            "glob": "**/*",
            "input": "node_modules/@spartacus/smartedit/assets",
            "output": "assets/"
          }
        ],
        "styles": [
          "apps/storefrontapp/src/styles.scss",
          "apps/storefrontapp/src/styles/spartacus/user.scss",
          "apps/storefrontapp/src/styles/spartacus/cart.scss",
          "apps/storefrontapp/src/styles/spartacus/order.scss",
          "apps/storefrontapp/src/styles/spartacus/checkout.scss",
          "apps/storefrontapp/src/styles/spartacus/storefinder.scss",
          "apps/storefrontapp/src/styles/spartacus/asm.scss",
          "apps/storefrontapp/src/styles/spartacus/product.scss"
        ],
        "stylePreprocessorOptions": {
          "includePaths": ["node_modules/"],
          "sass": { "silenceDeprecations": ["import"] }
        }
      },
      "configurations": {
        "production": {
          "budgets": [
            { "type": "initial", "maximumWarning": "500kB", "maximumError": "3.5mb" },
            { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" }
          ],
          "outputHashing": "all"
        },
        "development": {
          "optimization": false,
          "extractLicenses": false,
          "sourceMap": true
        }
      },
      "defaultConfiguration": "production"
    },
    "serve": {
      "continuous": true,
      "executor": "@angular/build:dev-server",
      "options": {
        "buildTarget": "storefrontapp:build",
        "proxyConfig": "apps/storefrontapp/proxy.conf.js"
      },
      "configurations": {
        "production": { "buildTarget": "storefrontapp:build:production" },
        "development": { "buildTarget": "storefrontapp:build:development" }
      },
      "defaultConfiguration": "development"
    },
    "test": {
      "executor": "@angular/build:unit-test",
      "options": {
        "tsConfig": "apps/storefrontapp/tsconfig.spec.json"
      },
      "configurations": {
        "test": {
          "stylePreprocessorOptions": { "includePaths": ["node_modules/"] }
        }
      }
    }
  }
}
```

> **Important:** make sure `outputPath` is `dist/apps/storefrontapp` (not
> `dist/apps/my-storefront-app` or whatever the Angular CLI defaulted to).

> **Note:** After `nx import`, `apps/storefrontapp/angular.json` is present alongside
> this `project.json`. Nx uses `project.json` when the `@nx/angular` plugin is registered
> (step 4a), but keeping both files can cause confusing target merges. Once
> `nx run storefrontapp:build` succeeds, delete `apps/storefrontapp/angular.json`. This
> applies to the fresh Spartacus path (Steps 1–2) as well as existing projects.

> **Note:** This template already includes `proxyConfig` in `serve`. If you are
> following the fresh Spartacus path (Steps 1–2), step 9 (`project.json` modify) in
> the Spartacus changes section is already covered by this template — you do not need
> to add `proxyConfig` again separately.

#### 4c. Migrate `angular.json` to `project.json` (existing Angular CLI projects only)

> **Skip this step** if you followed Step 2 and created a fresh storefront — you already
> have `angular.json` from `ng new` and the `project.json` above replaces it entirely.
> This step is for teams who bring in an **existing** Angular CLI project whose
> `angular.json` was not yet converted to the Nx-native format.

After `nx import`, the storefront still has an `angular.json` in its subdirectory
(`apps/storefrontapp/angular.json`). Nx can read targets from `angular.json` via the
`@nx/angular` plugin registered in step 4a, but the file uses Angular CLI conventions
that differ from what `project.json` expects in a Vivaldi workspace:

| `angular.json` | `project.json` |
|---|---|
| `architect` object | `targets` object |
| `builder` key | `executor` key |
| All paths relative to the app directory (`src/main.ts`) | All paths relative to workspace root (`apps/storefrontapp/src/main.ts`) |
| No `outputPath` — defaults to project `root` | Explicit `outputPath: "dist/apps/storefrontapp"` required |
| `serve` has no top-level `options` block | `serve` carries `proxyConfig` in top-level `options` |
| `test` options inline under `options` | `test` delegates to `buildTarget` for shared build config |

**Automated option — `nx init`:**

If the storefront is still a standalone Angular CLI workspace (i.e. you have not yet
run `nx import`), Nx provides an automated path:

```bash
# Inside the standalone storefront directory (before nx import)
npx nx@latest init
```

After `nx init` completes, commit the newly added `nx.json` and `project.json` before
running `nx import` — the workspace must be in a clean git state:

```bash
git add nx.json project.json
git commit -m "chore: run nx init"
```

This command installs Nx, creates `nx.json`, and converts `angular.json` into a
`project.json` using the modern `@angular/build:application` executor — no
`architect`/`builder` keys to rename manually.

> **What `nx init` does NOT do:** it does not prefix paths to the workspace root.
> After `nx import`, all paths in the generated `project.json` are still relative
> to the app directory (`src/main.ts`, `tsconfig.app.json`, etc.), not the workspace
> root (`apps/storefrontapp/src/main.ts`). `nx import` itself warns about this:
> *"Source directory (.) differs from destination (apps/storefrontapp) — update
> relative paths in configuration files."* Building immediately fails until the
> paths are fixed.
>
> After the import you still need to apply steps 2–8 from the manual migration below:
> prefix all paths with `apps/storefrontapp/`, update `outputPath`, add `proxyConfig`,
> fix `buildTarget` references, rename the project to `storefrontapp`
> (the `name` field in `project.json` keeps the original app name), and ensure
> dependencies are merged into the workspace root `package.json` (step 8).
>
> **If `nx run storefrontapp:build` fails after completing the migration steps**, run
> `nx reset` to clear any stale cached configuration from before the import, then retry.
> Nx can cache the old project graph and fail even after paths are correctly updated.

> **Limitation:** `nx init` is designed for standalone Angular CLI workspaces. Once
> the storefront has been imported into the Vivaldi monorepo via `nx import` (Step 3),
> running `nx init` inside `apps/storefrontapp/` will not produce the correct result —
> it would re-scaffold an Nx workspace inside a sub-directory instead of registering
> the project in the existing workspace. For projects that are **already inside the
> monorepo**, use the manual steps below.

**Manual migration:**

To convert, apply the following transformations to `apps/storefrontapp/angular.json`
and save the result as `apps/storefrontapp/project.json`:

1. **Rename top-level keys.** Inside the project entry, replace `architect` with `targets`.
   Inside each target, replace `builder` with `executor`.

2. **Prefix all paths** with `apps/storefrontapp/`. Every file reference that was
   relative to the app directory (e.g. `src/main.ts`, `src/styles.scss`, `public`)
   must become workspace-root-relative (e.g. `apps/storefrontapp/src/main.ts`).
   The `node_modules/` input path in the SmartEdit asset glob is the one exception —
   it should stay as `node_modules/@spartacus/smartedit/assets` (no prefix) because
   it resolves from the workspace root already.

3. **Add `outputPath`** to the `build` target's `options`:
   ```json
   "outputPath": "dist/apps/storefrontapp"
   ```

4. **Add `proxyConfig`** to the `serve` target (a new top-level `options` block):
   ```json
   "options": {
     "proxyConfig": "apps/storefrontapp/proxy.conf.js"
   }
   ```

5. **Update `buildTarget` references** in `serve` configurations. The Angular CLI
   `angular.json` names them after the original project name
   (e.g. `ccv2-spa-doc-test4-storefront:build:development`). Change all
   references to use the Nx project name `storefrontapp`:
   ```json
   "production": { "buildTarget": "storefrontapp:build:production" },
   "development": { "buildTarget": "storefrontapp:build:development" }
   ```

6. **Simplify the `test` target.** The `angular.json` `test` target inlines all style
   options directly. Replace it with the leaner form that delegates to the `build`
   target's `test` configuration (which carries the style preprocessor options):
   ```json
   "test": {
     "executor": "@angular/build:unit-test",
     "options": {
       "buildTarget": "storefrontapp:build:test",
       "tsConfig": "apps/storefrontapp/tsconfig.spec.json"
     }
   }
   ```
   And add a `test` configuration to the `build` target's `configurations` block:
   ```json
   "test": {
     "optimization": false,
     "extractLicenses": false,
     "sourceMap": false,
     "stylePreprocessorOptions": {
       "includePaths": ["node_modules/"],
       "sass": { "silenceDeprecations": ["import"] }
     },
   }
   ```

7. **Add Nx project metadata** at the top level:
   ```json
   {
     "$schema": "../../node_modules/nx/schemas/project-schema.json",
     "name": "storefrontapp",
     "projectType": "application",
     "sourceRoot": "apps/storefrontapp/src",
     "tags": [],
     ...
   }
   ```

8. **Delete `angular.json`.** Once `project.json` is in place, ensure
   `apps/storefrontapp/package.json` dependencies have been merged into the workspace
   root `package.json` and `npm install` has been run at the workspace root — the build
   requires all packages to be resolved from the workspace root `node_modules`. Then
   run `nx run storefrontapp:build` to verify, and remove `apps/storefrontapp/angular.json`.
   Keeping both files causes Nx to merge targets from both, which can produce
   confusing duplicates.

> **Tip:** The `nx migrate` command does not automate this conversion — it is a
> one-time manual step per project. After the conversion, commit both the new
> `project.json` and the deletion of `angular.json` together so the changeset is
> atomic and easy to revert.

#### 4d. Add `@repo/bff/*` path aliases to the storefrontapp `tsconfig.json`

The storefrontapp was originally a standalone Angular CLI project whose `tsconfig.json`
does not inherit from the Vivaldi workspace's `tsconfig.base.json`. The BFF client files
(`bff-client.service.ts` etc.) import `@repo/bff/clients` which is only defined in
`tsconfig.base.json`. Add the relevant paths directly to `apps/storefrontapp/tsconfig.json`
under `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@repo/bff/clients": ["../../packages/clients/bff/index.ts"],
  "@repo/bff/clients/*": ["../../packages/clients/bff/*.ts", "../../packages/clients/bff/*/index.ts"],
  "@repo/bff/contracts": ["../../packages/contracts/bff/index.ts"],
  "@repo/bff/router": ["../../apps/bff/src/api/routers/root.ts"],
  "@repo/bff/trpc": ["../../apps/bff/src/api/trpc.ts"]
}
```

> **Note:** Do not add `"extends": "../../tsconfig.base.json"` to the storefrontapp tsconfig.
> The Vivaldi workspace `tsconfig.base.json` uses different compiler settings (e.g. `module: esnext`,
> `target: es2015`) that conflict with Angular 21's required `module: preserve` and `target: ES2022`
> settings. Adding the paths manually avoids this conflict.

**Merge `apps/storefrontapp/package.json` into the workspace root:**

1. Move all `dependencies` and `devDependencies` from `apps/storefrontapp/package.json`
   into the root `package.json`, resolving any version conflicts.
2. Delete `apps/storefrontapp/package.json` and `apps/storefrontapp/package-lock.json`.

3. Run `npm install` at the workspace root.
4. Verify: `nx run storefrontapp:build` completes successfully.

> **Note:** `nx run storefrontapp:serve` requires `proxy.conf.js` which is created in
> step 8. Use `build` for the verification at this stage.

#### 4e. Fix `.angular/cache` appearing as untracked files

After `nx import`, `apps/storefrontapp/.gitignore` contains `/.angular/cache` — but
that path is relative to `apps/storefrontapp/`, while Angular actually writes its build
cache to the **workspace root** `.angular/cache/`. The entry has no effect, so the
entire Angular cache appears as untracked files in `git status` after every build.

Add `.angular/cache` to the **workspace root** `.gitignore`:

```
.angular/cache
```

---

### Step 5: Base Spartacus configuration

After the import, configure the site context in
`apps/storefrontapp/src/app/spartacus/spartacus-configuration.module.ts`.
The schematics generate a `provideConfig(<SiteContextConfig>{ context: {} })` block —
you have two options:

**Option A — Automatic site context (recommended for existing customers)**

Leave the `context` block empty. Spartacus will make an initial call to the
`/basesites` OCC endpoint, compare the current URL against the URL patterns defined
in the CMS, and determine the active base site, languages, and currencies automatically.
No code change is needed:

```ts
provideConfig(<SiteContextConfig>{
  context: {},
}),
```

See [Automatic Multi-Site Configuration](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/c9d3b569e57f4db19d4e62a69609f3f0/5b91ded34aaf4a0a91c3e19c7601e4b2.html)
for details on URL pattern matching and caching strategies (SSR, PWA service worker).

**Option B — Static site context**

Explicitly define the base sites, languages, and currencies. Use this if you want
deterministic bootstrapping without the initial `/basesites` call, or if your URL
patterns require it. Replace the example values with your own:

```ts
provideConfig(<SiteContextConfig>{
  context: {
    urlParameters: ['baseSite', 'language', 'currency'],
    baseSite: ['electronics-spa', 'apparel-uk-spa'],
    currency: ['USD', 'GBP'],
  },
}),
```

Do not add a second `SiteContextConfig` block — update the one that already exists.

---

## Architecture and URL injection

CCv2 injects backend URLs into `index.html` at deploy time by replacing placeholder
strings with real values configured on the environment variable page.

The `BFF_BASE_URL` injection token reads the substituted value from the meta tag at
Angular bootstrap time — before any component renders. `BffClientService` then uses
this URL to construct a fully typed tRPC client backed by `RootRouter`, so every call
to a BFF procedure is type-checked at compile time against the actual procedure
signatures. Auth is forwarded via a tRPC link that reads the Spartacus Bearer token
from `AuthStorageService` and injects it as an `Authorization` header before each call.

In local development, the Angular dev-server proxy forwards `/bff/*` to the real BFF
so the browser never makes a cross-origin call.

---

## Spartacus changes

**Prerequisites:** install `@vivaldi/angular` before applying the changes below:

```bash
npm install @vivaldi/angular@0.25.0
```

### 1. `src/index.html`

Add the `bff-base-url` meta tag inside `<head>`. CCv2 replaces the placeholders
at deploy time.

> **Note:** The Spartacus schematics already generate
> `<meta name="occ-backend-base-url" content="https://localhost:9002" />`.
> Replace the hardcoded value with the placeholder and add the `media-backend-base-url`
> and `bff-base-url` tags alongside it:

```html
<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />
<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />
<meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
```

| Placeholder | Environment variable | Set by |
|---|---|---|
| `OCC_BACKEND_BASE_URL_VALUE` | `OCC_BASE_URL` | User via VariableSet |
| `MEDIA_BACKEND_BASE_URL_VALUE` | `MEDIA_BASE_URL` | User via VariableSet |
| `BFF_BASE_URL_VALUE` | `BFF_BASE_URL` | Platform auto-injects on "Connect to BFF" (value: `/bff/api`) |

> **Note:** If no BFF is connected, `BFF_BASE_URL_VALUE` is left unreplaced.
> The `BFF_BASE_URL` token treats the placeholder as "not configured" and falls
> back to `/bff/api` — BFF calls will fail gracefully rather than silently.

---

### CRITICAL: Remove hardcoded `baseUrl` from Spartacus configuration

`provideConfig()` takes precedence over meta tag factories. If your
`spartacus-configuration.module.ts` contains a hardcoded `baseUrl`, the meta tag
is ignored and CCv2 URL injection will not work.

**Remove this:**
```ts
provideConfig(<OccConfig>{
  backend: {
    occ: {
      baseUrl: 'https://hardcoded-url.example.com', // ← remove this
    },
  },
}),
```

With this removed, Spartacus reads `<meta name="occ-backend-base-url">` which CCv2
replaces at deploy time.

---

### CRITICAL: OCC URL must have a valid CA-signed certificate for BFF use

The BFF runs as a Node.js server on CCv2. Node.js is strict about TLS certificate
verification and will **reject self-signed certificates** (e.g. raw IP addresses like
`https://40.x.x.x:9002`).

- The **browser** works with self-signed certs because users can manually accept the
  security exception
- **Node.js** (the BFF container) has no such mechanism — it rejects self-signed certs
  by default in production
- Vivaldi builds the HTTPS agent as `new Agent({ rejectUnauthorized: !vivaldi.env.isDev })`
  — in development mode, outgoing requests with certificates not authorized by known
  authorities are allowed (see docs: [Environment variables](https://help.sap.com/docs/CC_CEE/098d0a4925094840a656c02370c78e30/854a20159b0e401fad32c13e368b26d2.html?locale=en-US&state=PRODUCTION&version=SHIP&q=environment%20variable#development-environment));
  on CCv2 `vivaldi.env.isDev=false` so self-signed certs are rejected

**Fix:** The `OCC_BASE_URL` used by the BFF must point to an OCC hostname with a
CA-signed certificate (e.g. `https://api.xxx.model-t.myhybris.cloud`), not a raw IP.

---

### 2. `src/app/bff/bff-base-url.token.ts` *(new file)*

Reads the `bff-base-url` meta tag at Angular bootstrap time. Falls back to `/bff/api`
for local development (handled by the dev-server proxy). CCv2 injects the full tRPC
endpoint URL as `BFF_BASE_URL_VALUE` (e.g. `/bff/api`) — the token uses it directly.

```ts
import { InjectionToken, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

// Inlined until BFF meta tag constants are released in @spartacus/core (CXSPA-13587).
const BFF_BASE_URL_META_TAG_NAME = 'bff-base-url';
const BFF_BASE_URL_META_TAG_PLACEHOLDER = 'BFF_BASE_URL_VALUE';

export const BFF_BASE_URL = new InjectionToken<string>('BFF_BASE_URL', {
  providedIn: 'root',
  factory: () => {
    const meta = inject(Meta);
    const tag = meta.getTag(`name="${BFF_BASE_URL_META_TAG_NAME}"`);
    const content = tag?.content ?? '';
    return content && content !== BFF_BASE_URL_META_TAG_PLACEHOLDER
      ? content
      : '/bff/api';
  },
});
```

---

### 3. `src/app/bff/bff-error-handling.link.ts` *(new file)*

Forwards BFF procedure errors to Angular's global `ErrorHandler`. In the browser it only fires in dev mode to avoid leaking potentially confidential information to the console.

Place this as the **first** link in the array so it can observe errors from all
subsequent links.

```ts
import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, inject, isDevMode, PLATFORM_ID } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import type { TRPCLink } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import { tap } from '@trpc/server/observable';

export class OutboundHttpError extends Error {
  constructor(cause: unknown) {
    super('Outbound HTTP Error', { cause });
  }
}

export const bffErrorHandlingLink: TRPCLink<AnyTRPCRouter> = () => {
  const errorHandler = inject(ErrorHandler);
  const platformId = inject(PLATFORM_ID);
  const logger = inject(LoggerService);

  return ({ next, op }) => {
    try {
      return next(op).pipe(
        tap({
          error: (error: unknown) => {
            if (!isPlatformBrowser(platformId) || isDevMode()) {
              errorHandler.handleError(new OutboundHttpError(error));
            }
          },
        }),
      );
    } catch (error) {
      logger.error(op.path, error);
      if (!isPlatformBrowser(platformId) || isDevMode()) {
        errorHandler.handleError(new OutboundHttpError(error));
      }
      throw error;
    }
  };
};
```

---

### 4. `src/app/bff/bff-auth.link.ts` *(new file)*

Injects the Spartacus user's Bearer token into every BFF call using the Observable-
based Spartacus auth APIs:

- `AuthService.isUserLoggedIn()` — skips token injection for anonymous sessions
  entirely, so the BFF calls OCC anonymously without an `Authorization` header.
- `AuthHttpHeaderService.getStableToken()` — waits for any in-progress token refresh
  to complete before reading the token, preventing 401s caused by attaching a
  mid-refresh expired token.
- `Injector` lazy injection — breaks the circular dependency that `AuthService`
  creates with Angular's DI graph at module initialisation time.

This link must be placed **before** `createTerminationLink`. Vivaldi's termination
link intentionally omits `headers` and `fetch` from its options, so auth must be
injected at the link layer via `OperationHeaders`.

```ts
import { inject, Injector } from '@angular/core';
import { AuthHttpHeaderService, AuthService, AuthToken } from '@spartacus/core';
import type { Operation, TRPCLink } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import { fromRxObservable, toRxObservable } from '@vivaldi/angular/utils';
import { OperationHeaders } from '@vivaldi/trpc/universal';
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

export const bffAuthLink: TRPCLink<AnyTRPCRouter> = () => {
  const injector = inject(Injector);

  return ({ next, op }) => {
    const authService = injector.get(AuthService);
    const authHeaderService = injector.get(AuthHttpHeaderService);

    return fromRxObservable(
      authService.isUserLoggedIn().pipe(
        switchMap((isLoggedIn) =>
          isLoggedIn ? authHeaderService.getStableToken() : of(undefined),
        ),
        switchMap((token) =>
          toRxObservable(
            token ? next(createAuthHeader(op, token)) : next(op),
          ),
        ),
        first(),
      ),
    );
  };
};

function createAuthHeader(op: Operation, token: AuthToken) {
  const headers = new OperationHeaders(op);
  const tokenType = token.token_type || 'Bearer';
  const accessToken = token.access_token;

  if (!accessToken || typeof accessToken !== 'string') {
    return op;
  }

  // Strip newlines — Node.js rejects header values containing \r or \n with
  // "Invalid character in header content". OAuth tokens can contain newline
  // characters from base64 padding or copy-paste artifacts.
  const sanitizedToken = accessToken.replace(/[\r\n]/g, '');

  return headers.append('Authorization', `${tokenType} ${sanitizedToken}`);
}
```

---

### 5. `src/app/bff/bff-timeout.link.ts` *(new file)*

Aborts BFF calls that exceed a platform-specific timeout:

- **Browser**: no timeout by default. The browser's own network stack handles
  stalled requests.
- **Dev mode**: a 20-second timeout applies in the browser so issues surface during
  development.

Place this as the **last** link before `createTerminationLink` so the `AbortController`
signal reaches the fetch.

```ts
import { isPlatformBrowser } from '@angular/common';
import { inject, isDevMode, PLATFORM_ID } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import type { TRPCLink } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import { fromRxObservable, toRxObservable } from '@vivaldi/angular/utils';
import { timeout, catchError, TimeoutError } from 'rxjs';

const DEFAULT_TIMEOUT_MS = 20_000;

export const bffTimeoutLink: TRPCLink<AnyTRPCRouter> = () => {
  const platformId = inject(PLATFORM_ID);
  const logger = inject(LoggerService);

  return ({ next, op }) => {
    const isBrowser = isPlatformBrowser(platformId);
    const timeoutMs = isBrowser ? undefined : DEFAULT_TIMEOUT_MS;

    if (!timeoutMs && !isDevMode()) {
      return next(op);
    }

    const effectiveTimeout = timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const abortController = new AbortController();
    op.signal = abortController.signal;

    return fromRxObservable(
      toRxObservable(next(op)).pipe(
        timeout(effectiveTimeout),
        catchError((error) => {
          if (error instanceof TimeoutError) {
            abortController.abort();
            const message = `BFF procedure "${op.path}" timed out after ${effectiveTimeout}ms.`;
            logger.warn(message);
            throw new Error(message, { cause: error });
          }
          throw error;
        }),
      ),
    );
  };
};
```

---

### 6. `src/app/bff/bff-client.service.ts` *(new file)*

Typed tRPC client for the BFF. Wires all four links in the correct order and binds
the client to `RootRouter` from `@repo/bff/clients` (type-only import — never
included in the browser bundle).

Every procedure call is fully type-checked at compile time. TypeScript infers input
and return types directly from the BFF router definition — no manual generic
annotations needed.

**Link order matters:**

| Position | Link                   | Purpose                                              |
|----------|------------------------|------------------------------------------------------|
| 1st      | `bffErrorHandlingLink` | Observes all errors; forwards to `ErrorHandler`      |
| 2nd      | `bffAuthLink`          | Injects `Authorization` header when user is logged in |
| 3rd      | `bffTimeoutLink`       | Aborts calls that exceed the timeout (dev mode only) |
| 4th      | `createTerminationLink` | Vivaldi's HTTP link (superjson, OTEL, error envelope) |

```ts
import { Injectable, inject } from '@angular/core';
import { createTRPCClient, createTerminationLink } from '@vivaldi/trpc/client';
import type { RootRouter } from '@repo/bff/clients';
import { BFF_BASE_URL } from './bff-base-url.token';
import { bffErrorHandlingLink } from './bff-error-handling.link';
import { bffAuthLink } from './bff-auth.link';
import { bffTimeoutLink } from './bff-timeout.link';

@Injectable({ providedIn: 'root' })
export class BffClientService {
  readonly client;

  constructor() {
    const bffBaseUrl = inject(BFF_BASE_URL);

    this.client = createTRPCClient<RootRouter>({
      links: [
        bffErrorHandlingLink,
        bffAuthLink,
        bffTimeoutLink,
        createTerminationLink<RootRouter>({ url: bffBaseUrl }),
      ],
    });
  }
}
```

**Usage:**
```ts
// Return type inferred from RootRouter — no generic needed
const res = await this.bff.client.sample.sayHello.query({ name: 'Spartacus' });
console.log(res.message); // string

// TypeScript errors if input or property is wrong:
const bad = await this.bff.client.sample.sayHello.query({ name: 123 }); // ← compile error
```

---

### 8. `proxy.conf.js` *(new file, project root)*

Reads `CX_BFF_BASE_URL` at dev-server startup and sets the proxy target dynamically.
The browser always calls `/bff/api` (same origin — no CORS).

In `@vivaldi` 0.25.0 `vivaldi dev bff` runs as an HTTPS server (self-signed cert)
on port 8482 and mounts tRPC at `/bff/api`. The proxy forwards `/bff` directly to the
BFF — no path rewriting needed since the paths already match.

```js
const bffBaseUrl =
  process.env['CX_BFF_BASE_URL'] || 'https://localhost:8482/bff/api';
const bffTarget = new URL(bffBaseUrl).origin;

module.exports = {
  '/bff': {
    target: bffTarget,
    secure: false,
    changeOrigin: true,
    ws: false,
    logLevel: 'info',
  },
};
```

---

### 9. `project.json` *(modify, storefrontapp)*

> **Note:** If you followed Step 2 (fresh Spartacus app) and used the `project.json`
> template from step 4b, `proxyConfig` is already included — skip this step.
> This step is for existing Angular CLI projects that created `project.json` manually
> via the 4c migration.

Add `proxyConfig` to the `serve` target's `options`. The executor for a standard Angular
app is `@angular/build:dev-server`:

```json
"serve": {
  "executor": "@angular/build:dev-server",
  "options": {
    "buildTarget": "storefrontapp:build",
    "proxyConfig": "apps/storefrontapp/proxy.conf.js"
  }
}
```

---

### 10. `package.json` scripts

Add the following convenience scripts to the root `package.json`. They give all team
members consistent commands regardless of which nx target names are used internally:

```json
{
  "scripts": {
    "build:bff": "vivaldi build bff",
    "dev:bff": "vivaldi dev bff",
    "start:storefrontapp": "nx serve storefrontapp",
    "build:storefrontapp": "nx build storefrontapp",
    "test:storefrontapp": "nx test storefrontapp"
  }
}
```

| Script                             | What it does                                                     |
|------------------------------------|------------------------------------------------------------------|
| `npm run build:bff`                | Builds the BFF into `dist/apps/bff/vivaldi.mjs`                 |
| `npm run dev:bff`                  | Starts the BFF dev server via `vivaldi dev bff`                 |
| `npm run start:storefrontapp`      | Starts the Angular dev server on port 4200                      |
| `npm run build:storefrontapp`      | Production build of the storefront                               |
| `npm run test:storefrontapp`       | Runs unit tests for the storefront                               |

> **Note:** The Hosting Portal builds each application by running `npm run build:<appname>`
> where `<appname>` is the application folder name (e.g. `build:bff`, `build:storefrontapp`).
> The scripts above follow this convention. Please see the Hosting Portal docs 
> [Hosting Portal documentation](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/83616e9e152b4d16aaa4ee747ca8cad7/bb67d998b3d943d9887f3a2d2fa98eff.html?state=DRAFT&profile=20682543&profile=20682543&ai=true&version=DEV&locale=en-US)
> for the full build and deployment requirements.

---

### 11. `.env-cmdrc` *(create or modify, project root)*

Create this file at the workspace root (or add to it if it already exists). Holds
`CX_BFF_BASE_URL` for each dev profile. Used **only** by `proxy.conf.js` at
dev-server startup — never read by the Angular app itself.

To pass these variables automatically when starting the dev server, install `env-cmd`
and update the `start:storefrontapp` script:

```bash
npm install --save-dev env-cmd
```

```json
"start:storefrontapp": "env-cmd -e dev nx serve storefrontapp"
```

```jsonc
{
  "dev": {
    "CX_BASE_URL": "https://your-commerce-host",
    "CX_BFF_BASE_URL": "https://localhost:8482/bff/api"
  }
}
```

> **Note:** In `@vivaldi` 0.25.0 the BFF runs with a self-signed HTTPS cert on port 8482
> with tRPC at `/bff/api`. The proxy forwards `/bff` to the BFF without path rewriting.

---

### 12. Example: custom BFF procedure (`src/app/bff/examples/say-hello.component.ts`)

Route: `/bff-say-hello`

Calls `sample.sayHello` via `BffClientService`. The input type `{ name?: string }` and
return type `{ message: string }` are both inferred from `RootRouter` — no manual
annotations. TypeScript will error if either is wrong.

```ts
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BffClientService } from '../bff-client.service';

@Component({
  selector: 'app-say-hello',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <h2>BFF Say Hello</h2>
    <input [(ngModel)]="name" placeholder="Your name" />
    <button (click)="sayHello()">Say Hello</button>
    @if (message()) { <p>{{ message() }}</p> }
    @if (error()) { <p style="color:red">{{ error() }}</p> }
  `,
})
export class SayHelloComponent {
  private readonly bff = inject(BffClientService);

  name = '';
  message = signal('');
  error = signal('');

  async sayHello(): Promise<void> {
    const res = await this.bff.client.sample.sayHello.query({ name: this.name });
    this.message.set(res.message); // res.message: string — inferred
  }
}
```

---

### 13. Example: OCC call via BFF (`src/app/bff/examples/occ-base-sites.component.ts`)

Route: `/occ-base-sites`

Calls `occ.getBaseSites` via `BffClientService`. The BFF procedure proxies to
`GET /occ/v2/basesites` on the OCC backend. The return type is inferred from
`RootRouter`.

```ts
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { BffClientService } from '../bff-client.service';

@Component({
  selector: 'app-occ-base-sites',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <h2>OCC Base Sites (via BFF)</h2>
    <button (click)="load()">Load Base Sites</button>
    @if (result()) { <pre>{{ result() | json }}</pre> }
    @if (error()) { <p style="color:red">{{ error() }}</p> }
  `,
})
export class OccBaseSitesComponent {
  private readonly bff = inject(BffClientService);

  result = signal<unknown>(null);
  error = signal('');

  async load(): Promise<void> {
    const res = await this.bff.client.occ.getBaseSites.query();
    this.result.set(res); // fully typed response from OCC
  }
}
```

---

### 14. `app/src/bff/examples/bff-example.providers.ts` *(new file)*

```ts
import { Provider } from '@angular/core';
import { ROUTES } from '@angular/router';

export const bffExampleProviders: Provider[] = [
  {
    provide: ROUTES,
    multi: true,
    useValue: [
      {
        path: 'bff-say-hello',
        loadComponent: () =>
          import('./say-hello.component').then((m) => m.SayHelloComponent),
      },
      {
        path: 'occ-base-sites',
        loadComponent: () =>
          import('./occ-base-sites.component').then((m) => m.OccBaseSitesComponent),
      },
    ],
  },
];
```

Spread into `app.module.ts` providers: `providers: [privateProviders, ...bffExampleProviders]`

```ts
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from '@spartacus/storefront';
import { SpartacusModule } from './spartacus/spartacus.module';
import { bffExampleProviders } from './bff/examples/bff-example.providers';

@NgModule({
  imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), AppRoutingModule, SpartacusModule],
  providers: [...bffExampleProviders],
})
export class AppModule {}
```

> **Important:** Register `bffExampleProviders` directly in `NgModule.providers`, not
> inside `makeEnvironmentProviders()`. Lazy routes registered via the `ROUTES` token
> inside `makeEnvironmentProviders()` cause Angular pending task leaks.

---

## Known issue — `npm error code E401` on CCv2 build agents

The `package-lock.json` generated by the Angular CLI may contain resolved URLs pointing
at the SAP Artifactory mirror (`common.repositories.cloud.sap/artifactory/...`). CCv2
build agents that only have `SAP_RBSCTOKEN` cannot authenticate against Artifactory and
every tarball fetch fails with 401 (invisible at default log level). This does not affect
local development.

If `npm install` fails with E401 on CCv2, regenerate the lockfile against the public
registry **before** pushing:

```bash
rm -rf node_modules package-lock.json
NPM_CONFIG_REGISTRY=https://registry.npmjs.org/ npm install
git add package-lock.json
git commit -m "chore: regenerate lockfile against public registry"
```

---

## Vivaldi BFF changes

### 15. `apps/bff/env.d.ts` *(modify)*

Declare `OCC_BASE_URL` so Vivaldi's typed env system recognises it:

```ts
declare global {
  interface VivaldiCustomEnv {
    FRONTEND_BASE_URL: string;
    OCC_BASE_URL: string;
  }
}
export {};
```

---

### 16. `apps/bff/vivaldi.apis.ts` *(modify)*

Register the OCC backend as a host and expose it as the `occ_v2` destination.
Vivaldi auto-discovers this file — no change to `vivaldi.ts` needed.

```ts
import { $, type VivaldiApi } from '@vivaldi/config';

const hosts = [
  {
    name: 'occ',
    origin: $.OCC_BASE_URL,
  },
] satisfies VivaldiApi['hosts'];

export default {
  hosts,
  apis: [
    {
      name: 'occ_v2',
      destination: {
        host: 'occ',
        path: '/occ/v2',
      },
    },
  ],
} satisfies VivaldiApi<typeof hosts>;
```

---

### 17. `packages/contracts/bff/destinations.ts` *(modify)*

Expose `occ_v2` to the tRPC context so procedures can call `ctx.destinations.occ.v2()`:

```ts
import { createDestinations } from '@vivaldi/config';

export default createDestinations(['occ_v2']);
```

---

### 18. `apps/bff/src/api/context.ts` *(modify)*

Rewrite using a typed interface that extends `RequiredContext`. This is required so
the storefrontapp's typecheck can walk into BFF source files via the `@repo/bff/clients`
path alias without encountering `vivaldi.*` ambient globals, which are only declared in
`apps/bff/tsconfig.app.json` and not in the storefront tsconfig.

```ts
import type { RequiredContext } from '@vivaldi/config';
import { destinations } from '@repo/bff/contracts';

export interface Context extends RequiredContext {
  greeting: string;
}

export const createContext: () => Promise<Context> = async () => ({
  destinations,
  greeting: 'Hello',
});
```

> **Why this matters for type safety:** `@repo/bff/clients` re-exports `RootRouter`
> from the BFF router, which transitively imports `context.ts`. If `context.ts`
> references `vivaldi.env.isDev`, the storefront typecheck fails with
> `Cannot find name 'vivaldi'`. Keeping `context.ts` free of ambient globals ensures
> both the BFF and the storefront can type-check cleanly from the same source.

---

### 19. `apps/bff/src/api/routers/occ.ts` *(new file)*

tRPC router for OCC proxy procedures. Each procedure forwards to OCC via
`ctx.execute.http` and the `occ_v2` destination. The `Authorization` header from the
storefront is forwarded to OCC via `ctx.forwardHeaders`.

The `occV2` helper casts `ctx.destinations` to the concrete type from
`@repo/bff/contracts` — necessary because the Vivaldi context types the destinations
map generically, but `createDestinations(['occ_v2'])` produces a strongly typed accessor.

```ts
import { HttpRequestBuilder } from '@vivaldi/connectivity';
import { destinations } from '@repo/bff/contracts';
import { ProcedureParams } from '@vivaldi/trpc';
import { z } from 'zod';
import { Context } from '../context';
import { publicProcedure, router } from '../trpc';

type TypedDestinations = typeof destinations;
const occV2 = (ctx: { destinations: Context['destinations'] }) =>
  (ctx.destinations as unknown as TypedDestinations).occ.v2();

const getBaseSitesHeaders = {
  authorization: z.string().optional(),
};

export type getBaseSitesOptions = ProcedureParams<
  Context,
  z.ZodUndefined,
  typeof getBaseSitesHeaders
>;

export const getBaseSitesFn = async ({ ctx }: getBaseSitesOptions) => {
  return ctx.execute.http(
    HttpRequestBuilder.get<unknown>('/basesites').addCustomHeaders({
      authorization: ctx.forwardHeaders['authorization'],
    }),
    occV2(ctx),
  );
};

export const occ = router({
  getBaseSites: publicProcedure
    .meta({ headers: getBaseSitesHeaders })
    .query(getBaseSitesFn),
});
```

To add more OCC procedures, follow the same pattern — `HttpRequestBuilder.get/post`
with the desired path (relative to `/occ/v2`), forwarded headers, and `occV2(ctx)`.

---

### 20. `apps/bff/src/api/routers/root.ts` *(modify)*

Register the new `occ` router alongside `sample`:

```ts
import { createCallerFactory, router } from '../trpc';
import { occ } from './occ';
import { sample } from './sample';

export const rootRouter = router({
  occ,
  sample,
});

export type RootRouter = typeof rootRouter;
export const createCaller = createCallerFactory(rootRouter);
```

---

### 21. `apps/bff/.env` *(local dev only)*

Set `OCC_BASE_URL` for local BFF development. Must be a hostname with a **CA-signed
certificate** — the BFF container on CCv2 runs Node.js in production mode which rejects
self-signed certs. For deployed environments, set this in the CCv2 BFF VariableSet.

```bash
OCC_BASE_URL=https://api.your-commerce-host.model-t.myhybris.cloud
```

---

## File overview

### Spartacus storefront

```
src/
  index.html                                  ← add bff-base-url meta tag
  app/
    app.module.ts                             ← spread bffExampleProviders
    bff/
      bff-base-url.token.ts                   ← InjectionToken reading meta tag
      bff-error-handling.link.ts              ← tRPC link: error propagation
      bff-auth.link.ts                        ← tRPC link: Bearer token injection
      bff-timeout.link.ts                     ← tRPC link: timeout + abort (dev mode)
      bff-client.service.ts                   ← typed TRPCClient<RootRouter>
      examples/
        bff-example.providers.ts              ← lazy route registration
        say-hello.component.ts                ← demo: custom BFF procedure (typed)
        occ-base-sites.component.ts           ← demo: OCC call via BFF (typed)
proxy.conf.js                                 ← dev-server proxy (reads CX_BFF_BASE_URL)
package.json                                  ← add build:bff, dev:bff, start:storefrontapp scripts
.env-cmdrc                                    ← add CX_BFF_BASE_URL to dev profiles
project.json                                  ← point serve to proxy.conf.js
```

### Vivaldi BFF

```
apps/bff/
  env.d.ts                                    ← add OCC_BASE_URL env var type
  vivaldi.apis.ts                             ← register OCC host + occ_v2 destination
  src/api/
    context.ts                                ← keep free of vivaldi.* ambient globals
    routers/
      occ.ts                                  ← new router: OCC procedures
      root.ts                                 ← register occ router
packages/contracts/bff/
  destinations.ts                             ← add occ_v2 to createDestinations
```

---

## Testing locally

```bash
# Terminal 1 — start the BFF dev server (HTTPS, self-signed cert, port 8482)
OCC_BASE_URL=https://your-occ-host npm run dev:bff

# Terminal 2 — start Spartacus
npm run start:storefrontapp

# Navigate to:
# http://localhost:4200/electronics-spa/en/USD/bff-say-hello
# http://localhost:4200/electronics-spa/en/USD/occ-base-sites
```

---

## Deployment notes

### Required custom variables

Two separate applications need environment variables configured in the CCv2 Hosting Portal.

#### BFF application

Set in the BFF application's Variable Set:

| Variable | Description |
|---|---|
| `OCC_BASE_URL` | Full OCC API hostname with CA-signed certificate, e.g. `https://api.your-tenant.model-t.myhybris.cloud` |

Without `OCC_BASE_URL` the BFF container fails to start with:
```
HostOriginMissingError: Host "occ" has no origin configured.
```

#### Storefront application

The storefront reads its OCC backend URL from the `occ-backend-base-url` meta tag in
`index.html`, which CCv2 replaces at deploy time using:

| Variable | Placeholder replaced in `index.html` | Description |
|---|---|---|
| `OCC_BASE_URL` | `OCC_BACKEND_BASE_URL_VALUE` | OCC API hostname for the browser to call |

Without this variable set, the placeholder remains unreplaced and Spartacus falls back
to `https://localhost:9002`, causing all OCC requests to fail.

#### CA-signed certificate requirement

Both variables must use a hostname with a CA-signed certificate — not a raw IP address
(e.g. `https://40.x.x.x:9002`). Node.js in production mode rejects self-signed
certificates, and the browser will also reject them without a manual exception.

## References

[Hosting Portal Documentation](https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/83616e9e152b4d16aaa4ee747ca8cad7/bb67d998b3d943d9887f3a2d2fa98eff.html?state=DRAFT&profile=20682543&profile=20682543&ai=true&version=DEV&locale=en-US)

[Composable Storefront for SAP Commerce Cloud](https://help.sap.com/docs/CC_CEE/24176fb554b4410caf1bcd0c6c7cf633/6698db3d8f92441ca3f364879e6bb4cf.html?locale=en-US&state=DRAFT&version=DEV&ai=true)

