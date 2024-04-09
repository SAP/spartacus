/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Properties for gradually enabling/disabling breaking changes introduced in Spartacus.
 *
 * Feature toggles facilitate the incremental evolution of the Spartacus product,
 * allowing Spartacus users to adjust to breaking changes over time.
 *
 * Each feature toggle corresponds to a specific breaking change introduced
 * in a Spartacus release.
 *
 * Each feature toggle is temporary, with a defined duration
 * (specified in the official documentation), after which the related
 * breaking change will be permanently enabled.
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
 * DefaultFeatureToggles token, used to build FeatureToggles. Built from DefaultFeatureTogglesChunk's
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
 * RootFeatureToggles token, used to build Global FeatureToggles. Built from FeatureTogglesChunks
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
 * FeatureTogglesChunk token, contributes to FeatureToggles.
 * Should not be used directly, use `provideFeatureToggles` or `provideFeatureTogglesFactory` instead.
 */
export const FeatureTogglesChunk = new InjectionToken<FeatureToggles[]>(
  'FeatureTogglesChunk',
  { providedIn: 'root', factory: () => [] }
);

/**
 * DefaultFeatureTogglesChunk token, contributes to DefaultFeatureToggles.
 * Should not be used directly, use `provideDefaultFeatureToggles` or `provideDefaultFeatureTogglesFactory` instead.
 *
 * General rule is, that all FeatureToggles provided in libraries should be provided as `default`.
 */
export const DefaultFeatureTogglesChunk = new InjectionToken<FeatureToggles[]>(
  'DefaultFeatureTogglesChunk',
  { providedIn: 'root', factory: () => [] }
);
