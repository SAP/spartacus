---
name: spartacus-major-upgrade
description: Migrate a customized SAP Commerce Cloud composable storefront from Spartacus 221121.22 and Angular 21 to the Spartacus 221121.24 / Angular 22 major release. Use when preparing the dependency update, reviewing schematic changes, or fixing remaining customer subclass, template, styling, SSR, and test migration errors.
license: Apache-2.0
---

# Spartacus major upgrade for customer applications

Complete the upgrade in the customer's application while preserving its storefront behavior and customizations. This guidance is for consumer applications, not for modernizing the Spartacus framework repository.

Read [the Angular 22 migration reference](references/angular-22.md) for dependency, automation and SSR changes. For customer code diagnostics, read the matching [before/after recipes](references/code-migrations.md) and [removed API table](references/removed-apis.md). Use the installed target packages' declarations, peer dependencies and schematic output as the source of truth for exact APIs and versions. The reference distinguishes automatic changes from customer work; schematic completion alone does not mean the application is migrated.

## What changed and how to migrate

| Change in this major | Migration action |
| --- | --- |
| Angular 22 and compatible ecosystem dependencies | Update installed peers together; run Angular and Spartacus migrations using the selected target metadata. |
| Base DI constructors replaced by inject() | Review super-call edits; preserve customer dependencies, initialization and provider overrides. |
| Deprecated exports, class members and copied template bindings removed | Apply the recorded replacement or adapt customer behavior to the current feature; resolve schematic review comments. |
| Outlet context now asynchronous | Consume context$ and validate delayed/repeated rendering. |
| EPD Visualization retired | Remove the confirmed integration, styles and CMS placements; no replacement is provided. |
| SSR host validation and prerender configuration | Configure trusted hosts/public origin and validate actual server/browser behavior. |
| Theme, configurator formatting and current feature templates changed | Preserve branding and supported flags; review copied templates, locales and affected interactions. |

For every applicable change, identify the customer's old usage, explain the target API/behavior, implement the manual migration and verify it. Read only the recipes needed by that application. A schematic review comment is a work item, not a completed migration.

## Establish the actual migration scope

Inspect the application's package.json, lockfile, Angular build/test targets, SSR entry point and custom classes/templates that extend or replace Spartacus features. Record the starting Angular/Spartacus versions and existing build/test results. Identify which B2C, B2B, SSR, PWA and integration scenarios this application uses.

Use the customer's selected target release and registry. Keep installed Spartacus packages on that release, resolve Angular ecosystem peers together, and run the corresponding Angular and Spartacus migrations. Review scripts and existing customer assertions before changing them. Do not use an unconstrained latest dependency update, force peer resolution, or replace the application with a generated demo.

## Review the changes schematics cannot decide

- Check each custom subclass against its target base declaration. Remove obsolete forwarded DI arguments without deleting dependencies or initialization that customer code still uses. Validate provider overrides at the injector where the feature is created.
- Resolve every relevant TODO:Spartacus review comment and missing/removed API diagnostic against the target declarations. Update customer templates as well as TypeScript. Do not recreate removed framework compatibility APIs to make compilation pass.
- Remove a confirmed EPD Visualization integration, including its package, providers, styles and CMS mappings. Other customer visualization features are outside that retirement.
- Preserve supported feature-toggle choices, lazy feature boundaries, branding, backend URLs and authentication behavior. If a target declaration proves a flag has been retired, record and remove only that stale configuration entry; do not change other flags to work around a failure.
- Keep SSR request-host validation and configure the application's real deployment hosts and prerender origin. Preserve browser-only guards and test real hydration, not just annotated HTML.

## Prove the customer behavior

Run a clean install with the updated lockfile, production builds, relevant application tests and actual browser interactions for the features customized by this app. For SSR, include hydration/event replay, allowed/rejected hosts and the requested prerender routes. For PWA apps, test the affected worker/cache behavior.

Use real backend fixtures for authenticated workflows when available. Separate a code regression from an invalid OAuth client/redirect configuration or missing fixture. State the exact unverified scenario and the configuration or fixture needed to finish it; do not count a stub, disabled test or compilation as backend/browser coverage.

Finish with the target package versions, changes schematics made, manual customer changes, commands/results and remaining failures or fixture limitations. Distinguish old baseline results from evidence on the upgraded packages. Publication and merge follow the customer's existing process.

## Using this with different assistants

The same skill is copied to .agents/skills/spartacus-major-upgrade/ for compatible Agent Skills assistants and .claude/skills/spartacus-major-upgrade/ for Claude Code. An LLM without skill discovery can read this file and its relative reference directly.

Example request:

~~~text
Use the Spartacus major-upgrade skill in this project to migrate this customized application to our selected 221121.24 release. Review schematic TODOs, preserve customer behavior, and validate the affected browser and SSR scenarios. Report manual changes and any remaining blockers.
~~~
