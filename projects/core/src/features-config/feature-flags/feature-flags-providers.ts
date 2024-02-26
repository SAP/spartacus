/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, ValueProvider } from '@angular/core';
import {
  DefaultFeatureFlagsChunk,
  FeatureFlags,
  FeatureFlagsChunk,
} from './feature-flags-tokens';

export type FlagsFactory = (...props: any[]) => FeatureFlags;

/**
 * Helper function to provide flags chunk using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFlags should be used instead.
 *
 * @param flags FeatureFlags object to merge with the global flags
 */
export function provideFeatureFlags(
  flags: FeatureFlags = {},
  defaultFlags = false
): ValueProvider {
  return {
    provide: defaultFlags ? DefaultFeatureFlagsChunk : FeatureFlagsChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide flags with factory function, using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFlagsFactory should be used instead.
 *
 * @param flagsFactory Factory Function that will generate flags object
 * @param deps Optional dependencies to a factory function
 */
export function provideFeatureFlagsFactory(
  flagsFactory: FlagsFactory,
  defaultFlags = false
): FactoryProvider {
  return {
    provide: defaultFlags ? DefaultFeatureFlagsChunk : FeatureFlagsChunk,
    useFactory: flagsFactory,
    multi: true,
  };
}

/**
 * Helper function to provide default flags chunk using DefaultFeatureFlagsChunk token
 *
 * @param flags FeatureFlags object to merge with the default flags
 */
export function provideDefaultFeatureFlags(
  flags: FeatureFlags = {}
): ValueProvider {
  return {
    provide: DefaultFeatureFlagsChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide default flags with factory function, using DefaultFeatureFlagsChunk token
 *
 * @param flagsFactory Factory Function that will generate flags object
 * @param deps Optional dependencies to a factory function
 */
export function provideDefaultFeatureFlagsFactory(
  flagsFactory: FlagsFactory
): FactoryProvider {
  return {
    provide: DefaultFeatureFlagsChunk,
    useFactory: flagsFactory,
    multi: true,
  };
}
