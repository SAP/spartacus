---
name: spartacus-developer
description: Build and customize SAP Spartacus (SAP Commerce Cloud composable storefront) Angular applications, including CMS components, configuration, styling, state and backend integration. Apply storefront loading, layout and interaction safeguards as part of ordinary feature development. Read the relevant references before changing Spartacus-specific behavior.
license: Apache-2.0
---

# Spartacus Storefront — AI Development Guidelines

Complete the requested feature using the installed Spartacus APIs and existing application conventions. For new or changed UI, identify what appears on first render, what remains offscreen/closed/inactive, and what work runs on interaction. Preserve CMS content, accessibility and business results while choosing loading, layout and scheduling behavior for those states. When a local preview and browser tools are available, run the relevant [browser acceptance checks](references/browser-verification.md), inspect actual requests/DOM and repair failures before finishing. Report unavailable verification honestly. Do not turn a small feature into unrelated optimization work.

Before wiring **any button, command or form submission**, open the supplied handler and follow its runtime imports. A short adapter can bring an engine, fonts or large data into the landing bundle. Keep the visible form, launcher and validation available immediately. If substantial dependencies serve only the operation, use `import type` for its contract and a literal `import('./action-adapter')` in a shared loader. Call the loader on activation, including when the UI is permanently visible and has only one button. Keep small or already-required dependencies together. Use the [action adapter example and production bundle check](references/on-demand-content.md#an-operation-behind-an-always-visible-control) to verify the **underlying dependency** first transfers when the workflow needs it.

For features with several states, trace each substantial dependency to its **first visible use**. Preserve the original CMS host, leading content and keyboard controls. Mount only the active state's media. Start optional requests, subscriptions and data processing on demand. If a costly operation usually follows a deliberate earlier edit or choice, prepare the same loader then, respecting reduced-data preferences. Test cold arrival, direct use and the complete journey from first intent to result.

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
- [performance.md](references/performance.md) — read for CMS first-view media, carousels, closed panels, responsive artwork or LCP/CLS diagnosis. For a leading image, trace its discovery from the delivered document through CMS rendering and use the [initial image discovery guide](references/initial-image-discovery.md) when Angular or CMS delays its request.
- [performance-interactions.md](references/performance-interactions.md) — read when adding handlers that calculate, rank, filter, parse or render substantial data, or investigating slow interactions. Covers profiling, bounded yielding, workers, cancellation and exact results.
- [browser-verification.md](references/browser-verification.md) — read when verifying changed UI. Covers actual responsive requests/geometry, functional interactions and reusable local browser evidence; a passing build is not browser acceptance.

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
- NEVER add `loading="lazy"` to the hero/LCP image — avoid deferring its fetch until viewport detection.
- For a predictable first-view image, inspect the navigation response and publish the hint only for an exact public placement. Use its site, language, currency and route scope for both the visible feature and the hint. Account or audience-dependent content needs its actual authorization/data boundary.
- ALWAYS reserve image space with accurate `width`/`height` attributes on the image or CSS sizing such as `aspect-ratio` to prevent layout shift (CLS).
- For different artwork crops, use one responsive `<picture>` through the supported media API or native markup; CSS-hiding separate eager images can still download both. See [performance.md](references/performance.md).
- Fit the generated `cx-media` picture/img as well as reserving its host. Parent component-scoped styles do not reach child-view internals; use a narrowly scoped global rule when needed.
- Keep initial LCP prioritization selective, global media lazy loading intact, and closed/inactive media unrequested when required. Immediate interaction feedback must be followed by genuinely yielding or off-thread work, not one deferred long task.

Configuration:
- ALWAYS use `provideConfig()` (not `provideDefaultConfig()`)
- ALWAYS check `node_modules/@spartacus/` for existing features before building from scratch.
- PREFER outlets for targeted UI additions; CMS mapping for whole-component replacement.

Debugging:
- Most topics include a short "Debugging" section with copy-paste `console.log` recipes for the non-obvious Spartacus runtime state — resolved OCC endpoints ([backend-communication.md](references/backend-communication.md)), merged config ([configuration.md](references/configuration.md)), CMS page structure ([cms-component-wiring.md](references/cms-component-wiring.md)), and translations ([i18n.md](references/i18n.md)).
