/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { Config } from '../../../config/config-tokens';
import { provideConfigFactory } from '../../../config/config-providers';
import { FeatureTogglesInterface } from '../config/feature-toggles';
import { FeatureConfigService } from '../../services/feature-config.service';
import {
  isFeatureEnabled,
  isFeatureLevel,
} from '../../utils/feature-config-utils';
import {
  DefaultFeatureToggles,
  FeatureToggleExpression,
  FeatureToggles,
  FeatureTogglesChunk,
  RootFeatureToggles,
} from '../feature-toggles-tokens';

/**
 * Test-only injection token used to retrieve a mutable handle to the same
 * feature-toggle instance that backs all feature-toggle injection paths
 * inside a test:
 * - `FeatureToggles` (preferred, used by `inject(FeatureToggles)`),
 * - `RootFeatureToggles` / `DefaultFeatureToggles`,
 * - `FeatureTogglesChunk` (multi-provider used by `provideFeatureToggles()`),
 * - `FeaturesConfig.features` (legacy, deprecated path used via `Config`).
 *
 * Mutations done via `set(...)` / `reset(...)` are reflected immediately
 * in all the above paths, because each one returns a reference to the
 * same underlying object.
 *
 * Provided automatically by {@link provideMockFeatureToggles}.
 *
 * @example
 * ```ts
 * TestBed.configureTestingModule({
 *   providers: [provideMockFeatureToggles({ a11yFoo: true })],
 * });
 * const toggles = TestBed.inject(MockFeatureTogglesController);
 * toggles.set('a11yFoo', false);
 * ```
 */
export class MockFeatureTogglesController {
  /**
   * Sets a single feature toggle value at runtime, with strict typing.
   *
   * @example
   * ```ts
   * const toggles = TestBed.inject(MockFeatureTogglesController);
   * toggles.set('toggleName', true);
   * fixture.detectChanges();
   * ```
   */
  set<K extends keyof FeatureTogglesInterface>(
    _key: K,
    _value: FeatureTogglesInterface[K]
  ): void {
    // Real behavior is supplied by `provideMockFeatureToggles()` via DI.
  }

  /**
   * Replaces all currently configured feature toggles with the given set.
   * Existing properties not listed in `toggles` are removed.
   *
   * @example
   * ```ts
   * const toggles = TestBed.inject(MockFeatureTogglesController);
   * toggles.reset({ toggleName: true });
   * ```
   */
  reset(_toggles?: Partial<FeatureTogglesInterface>): void {
    // Real behavior is supplied by `provideMockFeatureToggles()` via DI.
  }
}

/**
 * Internal shape of the mutable controller object. It implements both
 * the public controller API (`set` / `reset`) and the `FeatureToggles`
 * structure (all toggle flags are own properties on it), so the same
 * instance can be injected directly under both tokens.
 */
type InternalController = MockFeatureTogglesController &
  FeatureTogglesInterface;

/**
 * Builds the controller object backing all feature-toggle injection paths
 * during a test. Properties of `initial` are copied onto it, and the
 * `set` / `reset` helpers are attached.
 */
function createController(
  initial: Partial<FeatureTogglesInterface>
): InternalController {
  const holder = { ...initial } as InternalController;

  holder.set = function <K extends keyof FeatureTogglesInterface>(
    key: K,
    value: FeatureTogglesInterface[K]
  ): void {
    (this as FeatureTogglesInterface)[key] = value;
  };

  holder.reset = function (toggles: Partial<FeatureTogglesInterface> = {}) {
    // Remove all existing flag properties first, but keep `set` and `reset`.
    const dict = this as unknown as Record<string, unknown>;
    for (const key of Object.keys(dict)) {
      if (key !== 'set' && key !== 'reset') {
        delete dict[key];
      }
    }
    Object.assign(this, toggles);
  };

  return holder;
}

/**
 * Test-only `FeatureConfigService` implementation that always reads
 * directly from the mutable controller (instead of from `FeaturesConfig`,
 * which is built by deep-merging multiple `ConfigChunk` providers and
 * therefore does NOT share a live reference with the controller).
 *
 * This guarantees that `*cxFeature="'someToggle'"` directives and any
 * other consumer of `FeatureConfigService.isEnabled(...)` see runtime
 * changes performed via `MockFeatureTogglesController.set(...)`
 * immediately on the next change-detection cycle.
 */
class MockFeatureConfigService {
  constructor(protected toggles: Record<string, unknown>) {}

  isLevel(version: string): boolean {
    return isFeatureLevel(
      { features: this.toggles as never } as Config,
      version
    );
  }

  isEnabled(feature: FeatureToggleExpression) {
    return isFeatureEnabled(
      { features: this.toggles as never } as Config,
      feature
    );
  }
}

export function provideMockFeatureToggles(
  initial: Partial<FeatureTogglesInterface> = {}
): Provider[] {
  const controller = createController(initial);

  return [
    // The controller itself, so tests can inject it to mutate toggles.
    { provide: MockFeatureTogglesController, useValue: controller },

    // New, preferred path: `inject(FeatureToggles)`.
    { provide: FeatureToggles, useValue: controller },
    { provide: RootFeatureToggles, useValue: controller },
    { provide: DefaultFeatureToggles, useValue: controller },

    // Compatibility with `provideFeatureToggles(...)` style providers:
    // anything iterating `FeatureTogglesChunk` will also see our controller.
    { provide: FeatureTogglesChunk, useValue: controller, multi: true },

    // Legacy path: `FeaturesConfig.features` / `Config.features`.
    // We pass the SAME `controller` reference as `features`, so that any
    // later mutation via `controller.set(...)` is visible to consumers
    // that still read `config.features['xxx']`.
    //
    // Casts:
    // - `controller` doesn't carry an index signature, but `Config.features`
    //   does. We add it locally with `Record<string, unknown>`.
    // - `Config` is heavily augmented across the codebase (CheckoutStep,
    //   CaptchaRenderer, etc.), so the partial `{ features }` literal can't
    //   match it fully; we widen via `Partial<Config>` and re-narrow.
    //
    // No type safety related to feature toggles is lost: toggle names
    // remain strictly typed via `FeatureTogglesInterface`.
    provideConfigFactory(
      () =>
        ({
          features: controller as unknown as Record<string, unknown>,
        }) as Partial<Config> as Config
    ),

    // Override `FeatureConfigService` (used by the `*cxFeature` directive
    // and any other `isEnabled()` consumer) so it queries our mutable
    // controller directly. Otherwise the directive would read from the
    // immutable, deep-merged `Config.features` snapshot built at bootstrap
    // and would NOT see runtime mutations done via `controller.set(...)`.
    {
      provide: FeatureConfigService,
      useFactory: () =>
        new MockFeatureConfigService(
          controller as unknown as Record<string, unknown>
        ),
    },
  ];
}
