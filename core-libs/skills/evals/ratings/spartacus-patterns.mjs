// @ts-check
/**
 * Spartacus-specific PerFileRating checks — the SECONDARY, deterministic
 * cross-check on the LLM judge (`spartacus-adherence.mjs` is primary).
 *
 * Only FAITHFUL checks live here: rules a single file can be judged against
 * without cross-file or task context, where a regex match is unambiguously a
 * violation of what the skill teaches. There are five:
 *
 *   - spartacus-no-loadchildren       (P3)  LOW
 *   - spartacus-use-provideconfig     (P5)  MEDIUM
 *   - spartacus-normalizer-multi      (P12) MEDIUM
 *   - spartacus-no-ngrx-store         (P14) HIGH
 *   - spartacus-no-imperative-subscribe (P7-adjacent) LOW
 *
 * === Why other checks were RETIRED to the LLM judge ===
 *
 * An audit of the ruler against the shipped skill found several regex checks
 * condemned exactly the code the skill BLESSES — they were context-blind and
 * biased against idiomatic Spartacus. These moved to the judge, which reads
 * the skill's rules (including their permitted cases) and sees enough context
 * to apply them:
 *
 *   - HttpClient (P1): a custom OCC Adapter legitimately injects HttpClient;
 *     the regex flagged blessed adapters as violations. Judge decides whether
 *     it's an adapter (fine) or a component reaching past the pipeline (bad).
 *   - OnPush (P7): the skill says "prefer" OnPush, not "mandate on every
 *     @Component". A HIGH/100% hard-fail on any default-CD component was
 *     stricter than the skill. Judge weighs it as a preference.
 *   - styleUrls (P8): the skill has Case A (cx-* override → global SCSS) and
 *     Case B (custom app-* component → component-scoped styleUrls "are fine").
 *     The regex flagged ALL styleUrls, condemning blessed Case B code. Judge
 *     applies the case distinction.
 *   - cxUrl router links (P9): the mandatory rule is cxTranslate for strings;
 *     cxUrl on every routerLink is context-dependent and was enforced by regex
 *     alone with no skill backing. Judge handles i18n holistically.
 *   - SSR safety (P15): the guard is often in a different file than the
 *     browser-global use (cross-file), and the coarse net missed cases like
 *     IntersectionObserver. False positives + false negatives → judge.
 *
 * Severity bands (used for both `category` and `scoreReduction`):
 *   - HIGH   / 100%  -> hard architectural rules (e.g. injecting NgRx Store).
 *   - MEDIUM / 50%   -> strong conventions.
 *   - LOW    / 25%   -> hygiene heuristics with a non-trivial false-positive rate.
 *
 * The detection is regex-based. Add new rules at the bottom; keep `id` stable
 * (reports diff on id).
 */

import { RatingKind, RatingCategory, PerFileRatingContentType } from 'web-codegen-scorer';

const PASS = 1;

const fail = (errorMessage) => ({ rating: 0, errorMessage });

/** Standard fields every Spartacus rule shares. */
const BASE = {
  kind: RatingKind.PER_FILE,
};

/**
 * Detection helpers. Kept here (not in the rule body) so a rule can be
 * read top-down without flicking past 20 lines of regex.
 */
const RX = {
  // `loadChildren: () => import(...)` in a customer-emitted Routes array.
  // We deliberately don't ban `RouterModule.forChild`; only the lazy
  // route hookup is the bad pattern (Spartacus uses configurable routing
  // via `cmsComponents`, not Angular's `loadChildren`).
  loadChildren: /\bloadChildren\s*:/,

  provideDefaultConfigCall: /\bprovideDefaultConfig\s*\(/,

  hasMultiTrue: /multi\s*:\s*true/,

  // NgRx `Store` injection in customer code is the classic anti-pattern.
  // Spartacus exposes facades for everything; LLMs love to reach past them.
  importNgrxStore: /import\s*\{[^}]*\bStore\b[^}]*\}\s*from\s*['"]@ngrx\/store['"]/,

  // Reaching into a FEATURE's `/core` internals — e.g. `@spartacus/cart/base/core`,
  // `@spartacus/order/core`, `@spartacus/checkout/base/core/store` — to pull
  // action creators / selectors / internal services. The skill (P14) forbids
  // this: internals get renamed/replaced across releases. NOTE: bare
  // `@spartacus/core` is the LEGITIMATE public API for eager core services
  // (ProductService, CmsService, RoutingService, ...), so it must NOT match —
  // the `[^'"]+/` before `core` requires at least one feature segment.
  importSpartacusCoreInternals:
    /\bfrom\s*['"]@spartacus\/[^'"]+\/core(?:\/[^'"]*)?['"]/,

  // `.subscribe()` paired with `markForCheck()` is the dead giveaway of
  // an imperative pattern that should have been an `async` pipe.
  imperativeSubscribePair: /\.subscribe\s*\(([\s\S]*?markForCheck\s*\(\s*\))/,
};

/**
 * P3. No `loadChildren`-style Angular routes in customer code.
 *
 * Spartacus uses configurable routing (`cmsComponents`, feature `module`
 * imports in `provideConfig({ featureModules })`). Lazy chunks are loaded by
 * Spartacus, not by re-introducing Angular's lazy router.
 */
const noLoadChildren = {
  ...BASE,
  id: 'spartacus-no-loadchildren',
  name: 'No `loadChildren` Angular routes in customer code',
  description:
    'Customer code should rely on Spartacus configurable routing, not raw Angular `loadChildren`.',
  category: RatingCategory.LOW_IMPACT,
  scoreReduction: '25%',
  filter: PerFileRatingContentType.TS,
  rate: (_path, content) => {
    if (!content) return PASS;
    if (RX.loadChildren.test(content)) {
      return fail(
        '`loadChildren` is the Angular CLI lazy-route pattern; in Spartacus, wire your component via cmsComponents/configurableRoutes instead.',
      );
    }
    return PASS;
  },
};

/**
 * P5. Use `provideConfig`, not `provideDefaultConfig`, in customer apps.
 *
 * `provideDefaultConfig` is reserved for library defaults that a customer
 * can override. Customer code that uses it loses merge order to the library
 * defaults it meant to override. Any `provideDefaultConfig(` in generated
 * customer code is the violation — `provideConfig` elsewhere in the file does
 * not excuse it (the earlier guard let a single legit `provideConfig` mask a
 * mistaken `provideDefaultConfig` in the same file).
 */
const useProvideConfig = {
  ...BASE,
  id: 'spartacus-use-provideconfig',
  name: 'Use `provideConfig` (not `provideDefaultConfig`) in customer apps',
  description:
    '`provideDefaultConfig` is for libraries; customer apps must call `provideConfig` to win merge order.',
  category: RatingCategory.MEDIUM_IMPACT,
  scoreReduction: '50%',
  filter: PerFileRatingContentType.TS,
  rate: (_path, content) => {
    if (!content) return PASS;
    if (RX.provideDefaultConfigCall.test(content)) {
      return fail(
        '`provideDefaultConfig` was used in what looks like customer code. Use `provideConfig` so your override actually wins merge order.',
      );
    }
    return PASS;
  },
};

/**
 * P12. Normalizer providers register with `multi: true`.
 *
 * `*_NORMALIZER` tokens are multi-provider tokens. Forgetting `multi: true`
 * *replaces* the existing pipeline instead of extending it, breaking every
 * other normalizer downstream.
 */
const normalizerMultiTrue = {
  ...BASE,
  id: 'spartacus-normalizer-multi',
  name: 'Normalizers register with `multi: true`',
  description:
    'Provider blocks for *_NORMALIZER tokens must include `multi: true` so they extend, not replace, the converter pipeline.',
  category: RatingCategory.MEDIUM_IMPACT,
  scoreReduction: '50%',
  filter: PerFileRatingContentType.TS,
  rate: (_path, content) => {
    if (!content) return PASS;
    const blocks = content.match(/\{\s*provide\s*:\s*[A-Z_][A-Z0-9_]*_NORMALIZER[\s\S]*?\}/g);
    if (!blocks) return PASS;
    for (const block of blocks) {
      if (!RX.hasMultiTrue.test(block)) {
        return fail(
          'A *_NORMALIZER provider was registered without `multi: true`. This replaces the existing converter pipeline.',
        );
      }
    }
    return PASS;
  },
};

/**
 * P14. Inject Spartacus public services, never the NgRx `Store`, and never
 * import from a feature's `/core` internals.
 *
 * The public services (proxy facades from `@spartacus/<feature>/root`, eager
 * core services from `@spartacus/core`) are the stable contract. Injecting
 * `Store` or importing selectors/actions/services from a feature's `/core`
 * subpath reaches past the public API into internals that get renamed across
 * releases. Bare `@spartacus/core` is the legit public entry and does NOT
 * trip this check (see RX.importSpartacusCoreInternals).
 */
const noNgrxStoreInjection = {
  ...BASE,
  id: 'spartacus-no-ngrx-store',
  name: 'Inject Spartacus facades, never the NgRx `Store` or `/core` internals',
  description:
    'Customer code must not import `Store` from `@ngrx/store` or reach into a feature\'s `@spartacus/*/core` internals. Use the matching public facade / core service.',
  category: RatingCategory.HIGH_IMPACT,
  scoreReduction: '100%',
  filter: PerFileRatingContentType.TS,
  rate: (_path, content) => {
    if (!content) return PASS;
    if (RX.importNgrxStore.test(content)) {
      return fail(
        'Customer code is importing NgRx `Store`. Inject the Spartacus facade for the feature instead.',
      );
    }
    if (RX.importSpartacusCoreInternals.test(content)) {
      return fail(
        "Customer code is importing from a feature's `@spartacus/*/core` internals (selectors/actions/internal services). Use the public facade from `@spartacus/<feature>/root` or the eager service from `@spartacus/core`.",
      );
    }
    return PASS;
  },
};

/**
 * Avoid imperative `.subscribe()` paired with `markForCheck()`.
 *
 * `.subscribe(...)` followed by `cdr.markForCheck()` is the fingerprint of an
 * LLM that should have used the `async` pipe and `takeUntilDestroyed`.
 * False-positive rate: non-trivial (some cases legitimately need imperative
 * subscriptions), so this stays in the LOW band.
 */
const avoidImperativeSubscribe = {
  ...BASE,
  id: 'spartacus-no-imperative-subscribe',
  name: 'Avoid imperative `.subscribe()` paired with `markForCheck`',
  description:
    'Pairing `.subscribe(...)` with `cdr.markForCheck()` is a code smell — use the async pipe + takeUntilDestroyed.',
  category: RatingCategory.LOW_IMPACT,
  scoreReduction: '25%',
  filter: PerFileRatingContentType.TS,
  rate: (_path, content) => {
    if (!content) return PASS;
    if (RX.imperativeSubscribePair.test(content)) {
      return fail(
        '`.subscribe(...)` paired with `markForCheck()`. Use the `async` pipe with `takeUntilDestroyed` instead.',
      );
    }
    return PASS;
  },
};

export const spartacusPatternRatings = [
  noLoadChildren,
  useProvideConfig,
  normalizerMultiTrue,
  noNgrxStoreInjection,
  avoidImperativeSubscribe,
];
