/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, ValueProvider } from '@angular/core';
import {
  DefaultFeatureTogglesChunk,
  FeatureToggles,
  FeatureTogglesChunk,
} from './feature-toggles-tokens';

export type FeatureTogglesFactory = (...props: any[]) => FeatureToggles;

/**
 * Enables gradual adaptation to breaking changes in Spartacus via feature toggles.
 * Each toggle has its own lifespan defined in the official docs.
 * It should be provided in the root injector (in an eagerly loaded module).
 *
 * For using in a library, call `provideDefaultFeatureToggles() instead.
 *
 * @param toggles FeatureToggles object
 */
export function provideFeatureToggles(
  toggles: FeatureToggles = {}
): ValueProvider {
  return {
    provide: FeatureTogglesChunk,
    useValue: toggles,
    multi: true,
  };
}

/**
 * Enables gradual adaptation to breaking changes in Spartacus via feature toggles.
 * Each toggle has its own lifespan defined in the official docs.
 * It should be provided in the root injector (in an eagerly loaded module).
 *
 * For using in a library, call `provideDefaultFeatureToggles() instead.
 *
 * @param featureTogglesFactory Factory Function that returns FeatureToggles object
 */
export function provideFeatureTogglesFactory(
  featureTogglesFactory: FeatureTogglesFactory
): FactoryProvider {
  return {
    provide: FeatureTogglesChunk,
    useFactory: featureTogglesFactory,
    multi: true,
  };
}

/**
 * It's a helper function to provide DefaultFeatureTogglesChunk token
 *
 * CAUTION: It should be provided only in the root injector, i.e. in eagerly loaded module.
 *
 * @param toggles FeatureToggles object
 */
export function provideDefaultFeatureToggles(
  toggles: FeatureToggles = {}
): ValueProvider {
  return {
    provide: DefaultFeatureTogglesChunk,
    useValue: toggles,
    multi: true,
  };
}

/**
 * It's a helper function to provide DefaultFeatureTogglesChunk toggles with a factory function
 *
 * CAUTION: It should be provided only in the root injector, i.e. in eagerly loaded module.
 *
 * @param featureTogglesFactory Factory Function that returns FeatureToggles object
 */
export function provideDefaultFeatureTogglesFactory(
  featureTogglesFactory: FeatureTogglesFactory
): FactoryProvider {
  return {
    provide: DefaultFeatureTogglesChunk,
    useFactory: featureTogglesFactory,
    multi: true,
  };
}
