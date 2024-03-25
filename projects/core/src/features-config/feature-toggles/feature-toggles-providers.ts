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
 * Helper function to provide flags chunk using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFlags should be used instead.
 *
 * @param flags FeatureToggles object to merge with the global flags
 */
export function provideFeatureToggles(
  flags: FeatureToggles = {},
  defaultFlags = false
): ValueProvider {
  return {
    provide: defaultFlags ? DefaultFeatureTogglesChunk : FeatureTogglesChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide flags with factory function, using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFeatureTogglesFactory should be used instead.
 *
 * @param featureTogglesFactory Factory Function that will generate flags object
 * @param deps Optional dependencies to a factory function
 */
export function provideFeatureTogglesFactory(
  featureTogglesFactory: FeatureTogglesFactory,
  defaultFlags = false
): FactoryProvider {
  return {
    provide: defaultFlags ? DefaultFeatureTogglesChunk : FeatureTogglesChunk,
    useFactory: featureTogglesFactory,
    multi: true,
  };
}

/**
 * Helper function to provide default flags chunk using DefaultFeatureTogglesChunk token
 *
 * @param flags FeatureToggles object to merge with the default flags
 */
export function provideDefaultFeatureToggles(
  flags: FeatureToggles = {}
): ValueProvider {
  return {
    provide: DefaultFeatureTogglesChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide default flags with factory function, using DefaultFeatureTogglesChunk token
 *
 * @param featureTogglesFactory Factory Function that will generate flags object
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
