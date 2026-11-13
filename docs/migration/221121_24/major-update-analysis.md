# Angular 22 major update: customer impact and LLM guidance

This analysis separates customer migration work from changes needed only by the Spartacus development repository. It covers the Angular 22 branch through the cart/order entry fix, including its develop synchronization. It is not a claim that every customer integration has been tested.

The comparison from branch base 9b287004c2 to 9c9bc3af93 changes 2,946 paths. The constructor migration contains 919 base-constructor records, and the deprecated API migration contains 51 removed-member and 103 removed-export records, including EPD entry points. These are migration records, not a count of independent defects or a complete inventory of custom customer usage.

## Consumer impact

| Area | Result in this major | What the customer needs to do |
| --- | --- | --- |
| Dependencies | Angular 22; aligned CLI/build/CDK/SSR, NgRx 22, ng-select 24, OAuth 22, infinite-scroll 22; TypeScript 6-compatible i18next. | Update installed peers together using target package metadata. Add CDK when required. Preserve registry and customer dependency policy. |
| DI and subclass construction | Framework DI fields use inject(); many old public DI constructor arguments are removed. | Review automatic super-call changes, retain custom dependencies/initialization, and fix skipped inheritance patterns against target declarations. |
| Runtime and templates | Deprecated Angular template/API usage modernized; OnPush and delayed outlet context handling preserved. | Adapt copied templates and extension hooks; validate async rendering and provider scopes rather than only TypeScript. |
| Removed APIs | Deprecated exports, methods and properties removed; historical migration metadata retained. | Resolve TODO:Spartacus comments and remaining TypeScript/template diagnostics. Use current public entry points; do not rebuild compatibility shims. |
| EPD Visualization | Entire integration/package retired, including installation, styles and demo/E2E support. | Remove confirmed EPD dependencies/providers/styles/CMS placements. There is no replacement integration; other customer visualizations are outside this removal. |
| Feature configuration | The modernization preserves the feature-toggle compatibility surface. Develop has separate flag changes. | Preserve supported customer flag values. Remove only confirmed stale entries rejected by target declarations, such as enablePasswordExpiredErrorTranslation. |
| SSR | Angular CommonEngine integration, request-origin validation, host configuration and logging updated. | Configure real trusted hosts and prerender origin; inspect custom scripts/proxies; verify hydration/event replay and handler overrides in a browser. |
| Styles and formatting | Default theme is santorini-updated; configurator number/currency paths use Intl.NumberFormat. | Preserve branding/theme overrides and test supported customer locales, number input and currency formatting. |
| Cart/order actions | Upstream PDP price validation is retained; entry actions also support partial products with price stored on the entry. | Test PDP availability plus Buy Again/Add to Active Cart if extending or copying add-to-cart behavior. |
| Test configuration | Modern Angular unit-test and legacy Karma configurations remain distinct. | Preserve real customer assertions/providers and builder-specific configuration. Default fresh-app welcome assertions do not validate the storefront. |

The framework workspace also updates Nx, npm setup/cache handling, Jest/Vitest/Karma integration, Cypress 16 APIs and CI scripts. Do not copy these repository-only tools into a customer app that does not use them. Compatible TypeScript, Babel, Jasmine and Stylelint versions were retained where an unconstrained latest major breaks the associated tooling.

## What migration automation does and does not do

The three 221121.24 migrations add recognized SSR serve-script hosts, transform safely matched inherited constructors, and annotate removed API usage for review. The constructor migration deliberately skips ambiguous argument expressions, namespace imports, reordered/narrowed dependencies and indirect inheritance patterns it cannot match safely. The API migration adds review comments; it does not implement customer replacements or delete an EPD integration for the customer.

A passing schematic run cannot establish correctness of a copied template, a lazy provider override, a live OAuth/backend fixture or SSR hydration. These need application-specific inspection and verification. [The customer migration guide](migration.md) and [removed API guide](deprecated-api-cleanup.md) describe the manual work.

## Distributed LLM migration skill

The package now includes a dedicated [spartacus-major-upgrade skill](../../../core-libs/skills/skills/spartacus-major-upgrade/SKILL.md) with a relative Angular 22 reference. The existing developer skill routes upgrade requests to it. Both are copied from the installed @spartacus/skills package, so guidance follows the customer's selected release rather than whatever currently exists on the repository's develop branch.

The ai-context schematic copies both skills into the selected .agents/skills/ and/or .claude/skills/ folders and verifies each copy's contents. The existing add-or-update-ai-skills upgrade migration schedules the target skills package installation before that copy. It detects either installed skill, so a customer who installed only the upgrade skill can refresh it as well.

Existing installation choices are preserved: an interactive upgrade offers installation/update; a non-interactive upgrade refreshes already-installed tool guidance; an app with no installed skills gets the manual-install notice. Declining the prompt does not install skills. Customer CLAUDE.md/AGENTS.md and unrelated skill directories are preserved. The migration skill uses ordinary Agent Skills Markdown and relative references; an LLM without discovery can be given those files directly.

The instructions focus on observable customer behavior, distinguish automatic/manual changes and baseline/target evidence, and require explicit reporting of unverified backend fixtures. They do not grant publication/merge permission, change feature choices, replace a customized app with a demo, or equate compilation with browser success.

## Validation evidence and release limits

The earlier 39-package local candidate passed 14 fresh/customized consumer matrix runs on Node 22/24, including SSR and legacy Karma. Browser validation covered storefront interaction, actual hydration/event replay, allowed/rejected hosts, explicit prerender routes and affected PWA shell/cache behavior. That candidate corresponds to an earlier commit; it must be rebuilt to include later develop/runtime/skill changes.

For the subsequent PDP/entry-action regression, the original B2C order spec reproduced 6 passed / 2 failed before the fix and 8/8 passed afterward. Original B2B Saved Cart passed 22/22 after the fix, including previously failing keyboard tabbing and Add to Active Cart. Cart passed 113 files / 1,078 tests with coverage thresholds. No selected browser tests were disabled. Full CI 43406418264 passed all build/unit/SSR jobs and the affected order/Saved Cart shards, but failed a separate mobile product-search retry. A controlled first-attempt failure reproduced the missing searchbox on both retries with the original before hook. Recreating the page in beforeEach passed the original mobile/desktop scenarios and both retry probes (4/4 in Chrome). Full CI is not green yet; the rerun must validate the new head.

Shipping checks passed: all 59 schematics suites / 544 tests / 140 snapshots, the schematics build, targeted lint/format checks, skill frontmatter/reference validation, and npm package-content checks for both packages. Angular CLI copied both skills into both assistant folders from the extracted target tarballs and passed a repeat run. The packaged upgrade migration refreshed existing major guidance, removed stale references and preserved customer instructions/unrelated skills. All 46 installed skill files matched the source after the CLI's normal Prettier formatting; the schematic verifies exact source bytes inside its transactional Tree before CLI formatting. The installation task ordering was tested with the target skills tarball already available; this is not an external registry installation test. These establish distribution and content integrity; they do not claim a particular external LLM has successfully migrated every customer app.
