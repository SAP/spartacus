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
 * Helper function to provide FeatureTogglesChunk token
 *
 * To provide DefaultFeatureTogglesChunk toggles in libraries, provideFeatureTogglesChunk should be used instead.
 *
 * @param toggles FeatureToggles object to merge with the global toggles
 */
export function provideFeatureToggles(
  toggles: FeatureToggles = {},
  defaultToggles = false
): ValueProvider {
  return {
    provide: defaultToggles ? DefaultFeatureTogglesChunk : FeatureTogglesChunk,
    useValue: toggles,
    multi: true,
  };
}

/**
 * Helper function to provide FeatureTogglesChunk with a factory function
 *
 * To provide DefaultFeatureTogglesChunk toggles in libraries provideDefaultFeatureTogglesFactory should be used instead.
 *
 * @param featureTogglesFactory Factory Function that will generate toggles object
 * @param deps Optional dependencies to a factory function
 */
export function provideFeatureTogglesFactory(
  featureTogglesFactory: FeatureTogglesFactory,
  defaultToggles = false
): FactoryProvider {
  return {
    provide: defaultToggles ? DefaultFeatureTogglesChunk : FeatureTogglesChunk,
    useFactory: featureTogglesFactory,
    multi: true,
  };
}

/**
 * Helper function to provide DefaultFeatureTogglesChunk token
 *
 * @param toggles FeatureToggles object to merge with the default toggles
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
 * Helper function to provide DefaultFeatureTogglesChunk toggles with a factory function
 *
 * @param featureTogglesFactory Factory Function that will generate toggles object
 * @param deps Optional dependencies to a factory function
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
