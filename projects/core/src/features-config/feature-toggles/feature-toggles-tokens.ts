/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken, inject } from '@angular/core';
import { FeatureTogglesInterface } from './config/feature-toggles';

/**
 * Properties for gradual adaptation to breaking changes in Spartacus via feature toggles.
 * Each toggle has its own lifespan defined in the official docs.
 * It should be provided in the root injector (in an eagerly loaded module).
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
export interface FeatureToggles extends FeatureTogglesInterface {}

/**
 * DefaultFeatureToggles token, used to build FeatureToggles. Built from DefaultFeatureTogglesChunk's
 */
export const DefaultFeatureToggles = new InjectionToken<FeatureToggles>(
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
export const RootFeatureToggles = new InjectionToken<FeatureToggles>(
  'RootFeatureToggles',
  {
    providedIn: 'root',
    factory: () =>
      Object.assign(
        {},
        ...(inject(FeatureTogglesChunk, { optional: true }) ?? [])
      ),
  }
);

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
