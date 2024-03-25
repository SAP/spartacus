/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Global FeatureToggles, can be used to inject FeatureToggles configuration to any part of the app
 */
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    Object.assign(
      {},
      inject(DefaultFeatureToggles),
      inject(RootFeatureToggles)
    ),
})
export abstract class FeatureToggles {}

/**
 * Default FeatureToggles token, used to build Global FeatureToggles, built from DefaultFeatureTogglesChunks
 */
export const DefaultFeatureToggles = new InjectionToken(
  'DefaultFeatureToggles',
  {
    providedIn: 'root',
    factory: () =>
      Object.assign(
        {},
        ...(inject(DefaultFeatureTogglesChunk, { optional: true }) ?? [])
      ),
  }
);

/**
 * Root FeatureToggles token, used to build Global FeatureToggles, built from FeatureTogglesChunks
 */
export const RootFeatureToggles = new InjectionToken('RootFeatureToggles', {
  providedIn: 'root',
  factory: () =>
    Object.assign(
      {},
      ...(inject(FeatureTogglesChunk, { optional: true }) ?? [])
    ),
});

/**
 * FeatureToggles chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideFeatureToggles` or `provideFeatureTogglesFactory` instead.
 */
export const FeatureTogglesChunk = new InjectionToken<FeatureToggles[]>(
  'FeatureTogglesChunk'
);

/**
 * FeatureToggles chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultFeatureToggles` or `provideDefaultFeatureTogglesFactory` instead.
 *
 * General rule is, that all FeatureToggles provided in libraries should be provided as `default`.
 */
export const DefaultFeatureTogglesChunk = new InjectionToken<FeatureToggles[]>(
  'DefaultFeatureTogglesChunk'
);
