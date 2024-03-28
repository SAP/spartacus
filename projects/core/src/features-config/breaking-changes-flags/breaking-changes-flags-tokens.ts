/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Global BreakingChangesFlags, can be used to inject BreakingChangesFlags configuration to any part of the app
 */
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    Object.assign(
      {},
      inject(DefaultBreakingChangesFlags),
      inject(RootBreakingChangesFlags)
    ),
})
export abstract class BreakingChangesFlags {}

/**
 * Default BreakingChangesFlags token, used to build Global BreakingChangesFlags, built from DefaultBreakingChangesFlagsChunks
 */
export const DefaultBreakingChangesFlags = new InjectionToken(
  'DefaultBreakingChangesFlags',
  {
    providedIn: 'root',
    factory: () =>
      Object.assign(
        {},
        ...(inject(DefaultBreakingChangesFlagsChunk, { optional: true }) ?? [])
      ),
  }
);

/**
 * Root BreakingChangesFlags token, used to build Global BreakingChangesFlags, built from BreakingChangesFlagsChunks
 */
export const RootBreakingChangesFlags = new InjectionToken(
  'RootBreakingChangesFlags',
  {
    providedIn: 'root',
    factory: () =>
      Object.assign(
        {},
        ...(inject(BreakingChangesFlagsChunk, { optional: true }) ?? [])
      ),
  }
);

/**
 * BreakingChangesFlags chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideBreakingChangesFlags` or `provideBreakingChangesFlagsFactory` instead.
 */
export const BreakingChangesFlagsChunk = new InjectionToken<
  BreakingChangesFlags[]
>('BreakingChangesFlagsChunk');

/**
 * BreakingChangesFlags chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultBreakingChangesFlags` or `provideDefaultBreakingChangesFlagsFactory` instead.
 *
 * General rule is, that all BreakingChangesFlags provided in libraries should be provided as `default`.
 */
export const DefaultBreakingChangesFlagsChunk = new InjectionToken<
  BreakingChangesFlags[]
>('DefaultBreakingChangesFlagsChunk');
