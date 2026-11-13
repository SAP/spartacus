# Spartacus 221121.24 / Angular 22 customer migration

Use this reference when upgrading an Angular 21 / Spartacus 221121.22 customer application. It describes this major release; check the selected patch's published package metadata before choosing dependency versions or assuming an API still exists.

## Dependencies and builders

Angular core, CLI/builders, CDK, SSR/platform-server and the installed NgRx packages need compatible Angular 22 peers. Other ecosystem majors include ng-select 24, angular-oauth2-oidc 22 and ngx-infinite-scroll 22. ng-select requires a direct CDK dependency. Include only libraries used by the customer application.

The framework's reviewed combination uses TypeScript 6.0.3, RxJS 7.8.2, Zone.js 0.16.3 and i18next 26.7.1. These are compatibility evidence, not permission to overwrite the customer's dependency policy. Angular 22 requires TypeScript >=6.0 <6.1; blindly installing the latest TypeScript major breaks that peer requirement. When upgrading TypeScript 5 to 6, prepare an i18next version supporting both before the combined update if the old version blocks resolution.

Check the target package and CLI Node engine ranges. Validation used Node 22.23.4 and 24.22.2 with npm 12.2.2. npm 12.2.2 is the framework workspace pin, not a requirement to add Nx or framework tooling to a customer app. Preserve the customer's registry/auth configuration; do not log tokens or overwrite global npm settings to resolve an installation problem.

Use the [official Angular 21 → 22 update guide](https://angular.dev/update-guide?v=21.0-22.0&l=3) and the installed Spartacus packageGroup migrations. Keep all installed Spartacus packages on the selected release and inspect the resulting lockfile. Resolve remaining third-party peer conflicts with compatible versions, not legacy-peer-deps or force.

Review the Angular application's actual builder configuration. The framework now uses @angular/build; an existing customer Nx or custom builder needs its own supported migration. Modern @angular/build:unit-test derives assets/styles from its associated build target; Karma-only styles, assets, polyfills, scripts and stylePreprocessorOptions must not be copied into that target. Legacy Karma configurations need their existing browser, Zone.js testing and Sass include paths preserved. Do not switch test runners solely to hide a failure.

## What the Spartacus migrations automate

| Migration | Automatic result | Customer review |
| --- | --- | --- |
| 10-migration-v221121_24-add-ng-allowed-hosts | Prefixes recognized serve:ssr scripts with NG_ALLOWED_HOSTS=localhost when missing. | Set deployment hosts; handle custom commands and non-POSIX shells. Existing explicit values are preserved. |
| 11-migration-v221121_24-constructor-deprecations | Removes matching legacy super arguments and constructor parameters used only for forwarding. | Review skipped inheritance patterns and dependencies still used by customer logic. |
| 12-migration-v221121_24-deprecated-api-cleanup | Adds review comments for removed exports/members and EPD Visualization. | Adapt the referenced code/templates and remove the retired integration. Comments are not completed fixes. |
| add-or-update-ai-skills | Refreshes installed tool guidance or offers installation in an interactive update. | Use the selected tool's project copy. An opt-out or non-interactive app with no installed skills retains the manual-install path. |

The constructor migration recognizes matching named base imports, including aliases, and direct subclasses with the expected old argument order/types. Expressions, namespace imports, indirect inheritance with explicit constructors, narrowed types and different argument sets can require manual work. Review output for TODO:Spartacus and remaining TypeScript errors; no review-comment inventory is a complete proof that all customer usage has been found.

## Constructors and Angular injection contexts

Spartacus services, components, guards, interceptors, adapters, connectors and converters now initialize DI fields with inject(). Many old base constructors accept no arguments; others retain initialization or non-DI arguments. Inspect the actual base declaration before editing super(...).

For a base whose constructor no longer accepts the old DI arguments:

~~~ts
export class CustomerAddToCart extends AddToCartComponent {
  protected customerState = inject(CustomerState);

  constructor() {
    super();
    // Keep customer initialization that was already required here.
  }
}
~~~

If no custom constructor logic remains, the constructor can be omitted. Retain the customer's own dependencies and behavior. Do not remove a parameter merely because it was also forwarded to super: the customer's methods or initialization may still use it. Check inherited field names/visibility and intentional overrides against the target declaration.

A narrowed concrete implementation passed through the old super call now needs the corresponding base facade/service token provided at the correct injector scope. A lazy feature may have its own injector; a root override does not necessarily replace its provider. Do not reintroduce old constructor signatures into framework code or create another injector just to avoid an error.

Custom services extending the abstract organization ItemService directly must supply the entity-specific currentItemService and formService properties. Subclasses of a concrete item service inherit these implementations. Verify streams after the subclass has initialized; do not expect synchronous outlet context emission.

Tests that directly construct a migrated class can fail with NG0203 because inject() needs an Angular injection context. Prefer TestBed.inject for services and TestBed.createComponent for components. If direct construction is needed, use TestBed.runInInjectionContext with the required providers. Preserve tests for the customer's custom DI and initialization instead of only asserting construction succeeds.

## Removed runtime APIs and customer templates

Use the target declaration and the schematic review comment to choose a replacement. Common mappings in this release are:

| Old usage | Customer migration |
| --- | --- |
| layoutConfig | Use layoutConfigFactory() and review how the app supplies layout configuration. |
| OutletContextData.context | Consume context$; preserve lifecycle cleanup and rendering for delayed emissions. |
| CartItemListComponent.setLoading | Use cartIsLoading. |
| ProductScrollComponent.setConfig | Use scrollConfig. |
| MergeCart | Use MergeCartAndIncrementProcessesCount. |
| SiteContextRoutesHandler.init | Use initOnce. |
| StoreFinder service/facade coordinate and direction helpers | Use StoreLocationService at its published entry point. |
| Configurator card attributeId / attributeLabel / attributeName | Supply the attribute object expected by the current card options. |
| ConfiguratorProductTitleComponent.product$ | Use the product in productTitleData$. |
| Configurator ghostStyle hooks | Use the target loading template. |

Other removed members include old organization table configuration exports, paragraph tab helpers, order-history query helpers, several subscription-billing filter handlers, S4 Service action hooks and OPF cartId compatibility properties. Some have no direct replacement. Search the installed entry-point declarations and current feature implementation rather than inventing a similarly named API.

Customer copies of framework templates can retain removed property bindings or old behavior even when TypeScript passes. Compare only the affected template with the target template, preserving outlets, translated labels, accessibility and customer content. Angular's migration handles deprecated structural control flow; review @if/@for conditions and tracking when changing a copied template. Inspect the base component's current change-detection strategy before modifying a subclass; do not switch all components to Eager to mask missing async rendering.

Cart/order entry products can be partial: their price can be on the entry instead of product.price. A PDP price/stock guard must not disable existing Buy Again or Add to Active Cart entry actions. Verify these interactions on actual order/saved-cart pages when customizing add-to-cart or copying its template.

## EPD Visualization and styles

EPD Visualization is retired with no replacement package in this release. Remove confirmed @spartacus/epd-visualization dependencies, imports, providers/modules, feature configuration, CMS mappings, global SCSS imports and customer routes that depend on it. Remove backend CMS placements or arrange that work with the backend owner. A similarly named independent customer visualization is not part of that removal.

The default theme is santorini-updated. Preserve explicit branding/theme choices and review resulting global styles; do not remove customer CSS merely because the default changed. Retained Sass forVersion gates and feature-toggle compatibility settings are separate from deprecated runtime API removal.

Configurator numeric and CPQ currency formatting now use Intl.NumberFormat. Test customer locales, input grouping/decimal separators, Latin input digits and currencies with different fraction digits. Locale registration for other customer Angular features may still be needed; do not remove it globally just because these formatter paths changed.

## Feature toggles and authentication

The framework modernization preserves its feature-toggle compatibility surface; it does not authorize changing the customer's supported feature choices. Upstream develop can separately retire a flag. For example, a stale enablePasswordExpiredErrorTranslation entry is rejected by this target's FeatureTogglesInterface. Confirm the target declaration, remove that stale entry and record the manual step. Do not remove or flip other flags based on a name, a TODO or a generic deprecated search.

Preserve the application's OAuth flow and registered client/redirect URIs. Invalid request from the backend authorization endpoint can be an OAuth fixture/configuration problem, not an Angular regression. Check the exact redirect URI (including callback path), allowed origins and client/PKCE configuration before changing frontend authentication. Record an unavailable authenticated backend fixture as unverified coverage.

## SSR, hydration, prerender and PWA

Angular's CommonEngine validates hosts. NG_ALLOWED_HOSTS is a comma-separated hostname allowlist and takes precedence over the engine option. Configure the app's trusted deployment hostnames without schemes or ports; keep request-origin/proxy validation. The schematic's localhost prefix is a development default, not a production configuration.

~~~bash
NG_ALLOWED_HOSTS=localhost,store.example.com node dist/my-app/server/server.mjs
~~~

Use the real emitted server path and the customer's process manager/environment mechanism. POSIX assignments do not work in Windows cmd. Custom serve commands need equivalent configuration. Verify allowed and rejected hosts, then an allowed request after rejection so a previous error cannot contaminate request state. A rejected-host status depends on configured error handlers; do not accept a CSR fallback as successful server rendering.

For prerender, enable the application's prerender configuration and supply its intended routes. Set SERVER_REQUEST_ORIGIN to the public origin because there is no incoming request. Inspect generated route HTML and the route manifest; a build reporting zero static routes is not prerender coverage.

For hydration, retain references to server-rendered DOM nodes, allow the application to bootstrap and verify those nodes remain. Exercise a pre-bootstrap interaction and its replay after hydration when event replay is enabled, then a normal post-hydration interaction. Check browser errors and the affected route/UI behavior. Annotated HTML alone proves neither hydration nor event replay.

Exercise error/status/timeout behavior relevant to the customer's SSR handler overrides and preserve browser-only guards around WindowRef, storage and DOM usage. For PWA, verify the affected worker registration, cache/update flow and offline shell. Offline OCC content is covered only if the application explicitly caches it.

## Validation and final report

After resolving schematic comments, run the customer's clean install, production build and tests on its supported Node versions. Use its actual commands/build configurations rather than adding framework CI or Nx tooling. Inspect all installed Spartacus versions and lockfile changes.

Keep application-shell stubs scoped to shell tests. The Angular welcome-template assertion can become obsolete in a fresh app, but replacing a real customization test with a stub hides migration failures. Validate extensions/providers, outlet updates, supported locales and changed templates with meaningful tests and real browser scenarios.

Report automatic versus manual changes and passed, failed or unverified scenarios separately. Keep baseline evidence distinct from the upgraded package results. For unavailable backend fixtures, name the specific scenario and needed configuration/owner. Existing disabled tests are not passes and are outside this upgrade unless the customer asks to resolve them. Never claim the whole storefront works from build success alone.
