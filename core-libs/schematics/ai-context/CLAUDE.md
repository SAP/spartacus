# Spartacus Storefront — AI Development Guidelines

This is a Spartacus (SAP Commerce Cloud) storefront application. Spartacus has its own architecture that differs significantly from standard Angular patterns; the rules below capture where it diverges.

## Skills

Each skill lives in its own folder under `.claude/skills/spartacus/<name>/SKILL.md` and starts with YAML frontmatter (`name`, `description`) so Claude Code auto-discovers it and decides which to load based on the task. Some skills offload deep-dive material into `<name>/references/*.md` and link to it from the main `SKILL.md`. The `spartacus/` namespace keeps Spartacus-shipped skills isolated from any custom skills you author.

Read a skill when its trigger applies — you do not need to read every file before starting.

- `backend-communication/SKILL.md` — read when wiring a service to the backend, adding an OCC endpoint, or anywhere you'd reach for `HttpClient`.
- `cms-component-wiring/SKILL.md` — read when introducing a new component the CMS should place, or replacing an existing CMS component.
- `lazy-loading/SKILL.md` — read when adding a new feature module or wondering whether `loadChildren` belongs here.
- `correct-injector/SKILL.md` — read when a customization works in dev but not at runtime, or when deciding where to register an override.
- `configuration/SKILL.md` — read when adding `provideConfig` / `provideDefaultConfig`, or when an expected config value isn't taking effect.
- `state-management/SKILL.md` — read before introducing a `BehaviorSubject` or NgRx feature for Spartacus data, or when a Spartacus feature uses Commands/Queries instead of NgRx.
- `change-detection/SKILL.md` — read when authoring a new component.
- `subscriptions/SKILL.md` — read when reaching for `.subscribe()` in a component or service, or when adding `markForCheck()`.
- `styling/SKILL.md` — read when adding SCSS or wiring up CSS for a new component.
- `i18n/SKILL.md` — read when adding user-facing strings or translation chunks.
- `configurable-urls/SKILL.md` — read when changing a URL pattern, generating router links, or adding a custom CMS-driven route.
- `existing-features/SKILL.md` — read before building anything that sounds like it might already exist in Spartacus.
- `extending-spartacus-classes/SKILL.md` — read when customizing a Spartacus component, service, or facade.
- `normalizers/SKILL.md` — read when surfacing extra OCC fields in the UI model.
- `facades-not-store/SKILL.md` — read when reading or writing Spartacus state from a component.
- `ssr-safety/SKILL.md` — read when touching `window`, `document`, `localStorage`, or any browser-only API.
- `outlets/SKILL.md` — read when sprinkling new UI into an existing Spartacus page without replacing it.

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
- ALWAYS use `provideConfig()` (not `provideDefaultConfig()`) in customer apps.
- ALWAYS check `node_modules/@spartacus/` for existing features before building from scratch.
- PREFER outlets for targeted UI additions; CMS mapping for whole-component replacement.
