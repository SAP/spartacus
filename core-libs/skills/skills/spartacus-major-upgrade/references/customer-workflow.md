# Customer application workflow and upgrade evidence

Use this reference to plan and validate the upgrade in the application you actually have. The assistant reads the code and records its findings; no fixed application layout, detection algorithm or generated report is assumed. Scale the work and documentation to the customer's customization and requested scope.

## Understand the architecture before changing dependencies

Start with the customer's project instructions and existing migration/release documentation. Identify the workspace root, applications and shared libraries, package manager/lockfile, selected registry and target release. Read the actual Angular, Nx or custom builder configurations and scripts. Determine which projects consume Spartacus and which changes to shared libraries affect more than one app. Do not add Nx, change the package manager, convert bootstrap style or replace builders simply to match the framework repository.

Follow the custom extension path from its registration to the code that uses it. Named imports, aliases and barrels can hide an indirect customer subclass. Lazy modules, route providers and component providers can replace a root token nearer to the consumer. Examine factory providers and CMS mappings as well as class declarations. Determine why each override exists before selecting a target replacement.

For an affected extension, record its location, base class/target declaration, intended customer behavior, injector scope, constructor/field initialization and the test or UI interaction that exercises it. Include copied templates, outlets, styles/locales and SSR/browser-only code when the feature uses them. Do not infer that an app is standard B2C/B2B, standalone, SSR or PWA from its folder name.

A practical inventory is a short table of the relevant features and their extension paths, not an exhaustive catalog of every file. Mark unresolved factory/mixin behavior or unknown provider precedence as a question to investigate, rather than claiming a generic search found every customization.

## Record a usable baseline

Before the dependency update, record a reproducible source checkpoint, installed and declared Angular/Spartacus versions, lockfile and relevant Node/package-manager versions. Preserve customer source changes and existing instructions. Follow their branch/checkpoint process; do not discard an uncommitted workspace, reset shared history or create a misleading baseline by silently stashing customer work.

Run the application's existing relevant checks using its real configurations and backend fixtures. Keep commands, results and failures together with the checkpoint and environment that produced them. Existing failed, disabled, skipped and unavailable checks are distinct from passes. When the task does not permit a check or a required fixture is missing, record the limitation instead of inventing a baseline result.

For a complex feature, identify the observable contract before editing. For example: the catalog uses the custom page-size policy and shared helper; a preview opens without creating an anonymous cart; a provider override supplies one instance at the intended scope; customer initialization occurs once; an outlet responds to a later context emission. Use existing assertions where available, adding focused coverage only for a material behavior that would otherwise remain unverified.

If the upgrade has already started, label the current results as current-state evidence. Do not call new package metadata a pre-upgrade baseline: ng update can replace dependencies before running migrations. Use recorded earlier results, or a separate checkpoint/workspace if available and appropriate; do not change the customer's active app back merely to reconstruct missing evidence.

## Plan manual work from the actual findings

Use the selected release's published declarations, peer metadata and existing schematic output. Record each relevant issue with a file/line, the old customer behavior, the target change and the check that will establish equivalence. Separate an automatic migration candidate from a case you have confirmed the schematic actually changed. Inspect the diff after running the appropriate migrations.

Use the [code recipes](code-migrations.md) only for matching contracts. Direct forwarding may be automated; indirect customer inheritance, narrowed arguments, factories and overrides need inspection. Do not assume every super call becomes super(), every protected field is still exposed, or a root provider replaces a component/lazy provider.

Retain customer settings and supported feature toggles. Remove a stale flag only when the target declaration establishes its retirement. Keep the registry, backend, OAuth redirect/client policy, branding and unrelated integrations intact. A dependency conflict is a reason to inspect the compatible peer graph, not to force installation or delete the lockfile indiscriminately.

## Compare behavior after the update

Repeat the relevant original checks on the updated source/lockfile and supported environments. For multiple applications, validate each affected build/test configuration and the shared-library consumers; one successful default ng build does not establish the rest of the workspace. Retain custom assets, styles, browser setup and test providers needed by those targets.

Evaluate the customer's contracts as well as compilation. Use the creating injector to verify provider identity and exercise inherited methods/streams that must use the custom implementation. Check initialization count/order, custom config, loading and lazy behavior. Preserve cleanup and delayed/repeated emissions in outlet or other async customizations. Compare customer templates against the affected target template without replacing the customer's content and behavior wholesale.

Do not obtain a pass by removing assertions, skipping tests, suppressing diagnostics with broad types, switching runners or replacing the real customized feature with a stub. If a locator or assertion depends on an intentionally changed target contract, explain the adaptation and retain the original customer outcome. For example, ng-select24 makes clicking the selected text of a non-searchable selector focus-only; opening its arrow or using the combobox keyboard interaction must still verify the selected sort, resulting route and retained page-size/facet behavior.

Use the existing browser tests for actual customized workflows. Apply the [SSR/PWA checks](angular-22.md#ssr-hydration-prerender-and-pwa) only to apps that use them. Keep server rendering separate from CSR fallback, cached shell/JavaScript separate from offline commerce, and OAuth authorization handoff separate from authenticated checkout/payment. A root-template unit stub does not validate the real storefront.

Treat a failure as a potential regression until evidence establishes otherwise. Compare it with the baseline and inspect whether it comes from migration code, a pre-existing defect, an intentional target contract change, or backend/OAuth fixtures. Keep an unresolved case explicit. Do not change frontend authentication or customer business behavior to compensate for an unavailable account or invalid backend redirect configuration.

## Application-specific upgrade report

Use the customer's existing report location and format. If none exists, an upgrade note outside .agents/skills and .claude/skills can retain project-specific decisions across future skill refreshes. Do not overwrite root instructions, custom skills, previous evidence or customer annotations. The outline below is optional and should be adapted to the application; fill it with observed facts and omit inapplicable sections.

~~~markdown
# Customer storefront upgrade

## Scope and checkpoints

Starting source/package versions and lockfile:
Selected target and actually installed versions:
Affected apps/shared libraries, builders and environments:
Checkpoint/branch and registry prerequisites:

## Before-update evidence

Commands/configurations, source checkpoint and results:
Existing failures/skips and unavailable fixtures:
Customer contracts that must remain intact:

## Migration changes and manual work

| File / symbol | Existing customer behavior | Target change | Automatic or manual change actually made | Evidence / remaining action |
| --- | --- | --- | --- | --- |

## After-update evidence

| App / configuration / scenario | Command or interaction | Source and environment | Passed / failed / skipped / unverified | Evidence / limitation |
| --- | --- | --- | --- | --- |

## Remaining work

Exact unverified scenarios and required accounts/configuration:
Confirmed owner or owner still to be identified:
Release/merge tasks that remain outside this validation:

## Rollback and handover

Source/lockfile checkpoint and restoration prerequisites:
Customer/external state changes requiring separate handling:
Validated commands and decisions needed by the next maintainer:
~~~

A TODO disappearing, a constructor compiling or an unchanged file hash does not prove equivalent behavior. Describe actual automatic edits separately from manual customer edits and pending investigation. If no baseline exists, say so. Do not mark the full application ready when an affected project or required customer flow remains unverified; state the completed scope and remaining limit precisely. Do not put credentials, tokens or complete authenticated URLs into shared notes.

## Branches, interruption and rollback

Use an isolated branch/checkpoint consistent with the customer's repository workflow and preserve unrelated in-progress work. Keep the source, package manifests and lockfile checkpoint together. Record private-registry availability and the Node/package-manager environment needed to reproduce either version. A retained local package candidate is not an externally published release.

When an install or migration fails, inspect the actual failure and partial diff before continuing dependent steps. Preserve the current evidence and customer files; do not repeatedly reset, rewrite history, delete locks, clear global caches or replace registry settings as a generic recovery procedure. Record what completed so a later assistant can resume the existing work rather than rerun every migration.

If rollback is needed, restore the matching source/manifest/lockfile checkpoint using the customer's approved Git/release process and reinstall with its recorded environment and registry. Preserve customer work created after the checkpoint. Verify the restored application's relevant original checks instead of assuming source restoration also restores the runtime environment.

A source rollback does not revert backend CMS placements, saved carts/orders, OAuth registration, published packages or other external state. Record those changes and their owners separately. Use the customer's existing deployment/release rollback process when such state changed; do not perform an external rollback solely because this skill describes one.
