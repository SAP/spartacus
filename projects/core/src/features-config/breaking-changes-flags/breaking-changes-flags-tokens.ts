/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Global Feature Flags, can be used to inject Feature Flags configuration to any part of the app
 */
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    Object.assign({}, inject(DefaultFeatureFlags), inject(RootFeatureFlags)),
})
export abstract class BreakingChangesFlags {}

/**
 * Default Feature Flags token, used to build Global Feature Flags, built from DefaultFeatureFlagsChunks
 */
export const DefaultFeatureFlags = new InjectionToken('DefaultFeatureFlags', {
  providedIn: 'root',
  factory: () =>
    Object.assign(
      {},
      ...(inject(DefaultFeatureFlagsChunk, { optional: true }) ?? [])
    ),
});

/**
 * Root Feature Flags token, used to build Global Feature Flags, built from FeatureFlagsChunks
 */
export const RootFeatureFlags = new InjectionToken('RootFeatureFlags', {
  providedIn: 'root',
  factory: () =>
    Object.assign({}, ...(inject(FeatureFlagsChunk, { optional: true }) ?? [])),
});

/**
 * Feature Flags chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideFeatureFlags` or import `FlagsModule.withFlags` instead.
 */
export const FeatureFlagsChunk = new InjectionToken<BreakingChangesFlags[]>(
  'FeatureFlagsChunk'
);

/**
 * Feature Flags chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultFlags` or `provideDefaultFlagsFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultFeatureFlagsChunk = new InjectionToken<
  BreakingChangesFlags[]
>('DefaultFeatureFlagsChunk');
