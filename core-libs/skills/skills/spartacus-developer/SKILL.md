---
name: spartacus-developer
description: Use this skill whenever working in a SAP Spartacus (SAP Commerce Cloud composable storefront) Angular application — building or customizing storefront components, services, routing, CMS component wiring, configuration, state, i18n, styling, SSR, or backend integration. Spartacus diverges significantly from standard Angular patterns; this skill and its sub-topic files capture the Spartacus-specific rules to follow. Read the sub-topic whose trigger applies before writing or changing code.
license: Apache-2.0
compatibility: Targets SAP Spartacus 2211.x and later.
metadata:
  version: "1.0"
---

# Spartacus Storefront — AI Development Guidelines

This is a Spartacus (SAP Commerce Cloud) storefront application. Spartacus has its own architecture that differs significantly from standard Angular patterns; the rules below capture where it diverges.

## Version awareness

Before applying any guidance, determine the project's Spartacus version from `@spartacus/core` in the project's `package.json` (or `node_modules/@spartacus/core/package.json`). Most guidance applies to every supported version, but some is version-gated:

- A section or line marked `Since: <spartacus-version>` applies only when the project's Spartacus version is that version or newer — ignore it on older projects.
- A line marked `Deprecated: <spartacus-version>` should be avoided on that version or newer; follow the alternative it points to.

Unmarked guidance applies to all supported versions (Spartacus 2211.x and later).

## Sub-topics

Each topic lives in its own `.md` file in the `references/` folder. Read a topic when its trigger applies — you do not need to read every file before starting.

- [backend-communication.md](references/backend-communication.md) — read when wiring a service to the backend, adding an OCC endpoint, or anywhere you'd reach for `HttpClient`.
- [cms-component-wiring.md](references/cms-component-wiring.md) — read when introducing a new component the CMS should place, or replacing an existing CMS component.
- [lazy-loading.md](references/lazy-loading.md) — read when adding a new feature module or wondering whether `loadChildren` belongs here.
- [correct-injector.md](references/correct-injector.md) — read when a customization works in dev but not at runtime, or when deciding where to register an override.
- [configuration.md](references/configuration.md) — read when adding `provideConfig` / `provideDefaultConfig`, or when an expected config value isn't taking effect.
- [state-management.md](references/state-management.md) — read before introducing a `BehaviorSubject` or NgRx feature for Spartacus data, or when a Spartacus feature uses Commands/Queries instead of NgRx.
- [subscriptions.md](references/subscriptions.md) — read when reaching for `.subscribe()` in a component or service, or when adding `markForCheck()`.
- [styling.md](references/styling.md) — read when adding SCSS or wiring up CSS for a new component.
- [i18n.md](references/i18n.md) — read when adding user-facing strings or translation chunks.
- [configurable-urls.md](references/configurable-urls.md) — read when changing a URL pattern, generating router links, or adding a custom CMS-driven route.
- [existing-features.md](references/existing-features.md) — read before building anything that sounds like it might already exist in Spartacus.
- [extending-spartacus-classes.md](references/extending-spartacus-classes.md) — read when customizing a Spartacus component, service, or facade.
- [normalizers.md](references/normalizers.md) — read when surfacing extra OCC fields in the UI model.
- [facades-not-store.md](references/facades-not-store.md) — read when reading or writing Spartacus state from a component.
- [ssr-safety.md](references/ssr-safety.md) — read when touching `window`, `document`, `localStorage`, or any browser-only API.
- [outlets.md](references/outlets.md) — read when sprinkling new UI into an existing Spartacus page without replacing it.

Some topics link to further deep-dive material in the same `references/` folder.

## Quick Reference

Backend, routing, and lazy loading:
- NEVER use `HttpClient` directly in components or generic services — use the Adapter pipeline.
- NEVER add Angular routes for CMS-managed pages — components are placed by the CMS.
- NEVER define new Angular routes to change URL patterns — use `RoutingConfig`.
- NEVER use `loadChildren` — Spartacus has its own CMS-driven lazy loading.

Templates and styling:
- NEVER hardcode user-facing strings — use the `cxTranslate` pipe.
- NEVER hardcode router links — use the `cxUrl` pipe.
- For brand-new custom components, component-scoped styles are fine; for tweaking Spartacus OOTB components, use global SCSS so `@spartacus/styles` overrides win.

State and customization:
- NEVER inject `Store<...>` for Spartacus state — inject the corresponding Spartacus service.
- NEVER omit `multi: true` when registering normalizers — it wipes out the default converter chain.
- AVOID copying Spartacus source code; extend the class first, copy only when no public hook exists.

Components and SSR:
- ALWAYS use `ChangeDetectionStrategy.OnPush` on new components, paired with the `async` pipe (preserve `Default` when extending a Spartacus component that uses it).
- AVOID `.subscribe()` in components when the data drives the template; if you reach for `markForCheck()`, the data should be a stream.
- NEVER reference `window`/`document`/`localStorage` without guarding via `WindowRef.isBrowser()`.

Configuration:
- ALWAYS use `provideConfig()` (not `provideDefaultConfig()`)
- ALWAYS check `node_modules/@spartacus/` for existing features before building from scratch.
- PREFER outlets for targeted UI additions; CMS mapping for whole-component replacement.

Debugging:
- Most topics include a short "Debugging" section with copy-paste `console.log` recipes for the non-obvious Spartacus runtime state — resolved OCC endpoints ([backend-communication.md](references/backend-communication.md)), merged config ([configuration.md](references/configuration.md)), CMS page structure ([cms-component-wiring.md](references/cms-component-wiring.md)), and translations ([i18n.md](references/i18n.md)).
