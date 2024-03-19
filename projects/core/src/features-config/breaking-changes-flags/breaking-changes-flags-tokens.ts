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
    Object.assign(
      {},
      inject(DefaultBreakingChangesFlags),
      inject(RootBreakingChangesFlags)
    ),
})
export abstract class BreakingChangesFlags {}

/**
 * Default Feature Flags token, used to build Global Feature Flags, built from DefaultBreakingChangesFlagsChunks
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
 * Root Feature Flags token, used to build Global Feature Flags, built from BreakingChangesFlagsChunks
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
 * Feature Flags chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideBreakingChangesFlags` or import `FlagsModule.withFlags` instead.
 */
export const BreakingChangesFlagsChunk = new InjectionToken<
  BreakingChangesFlags[]
>('BreakingChangesFlagsChunk');

/**
 * Feature Flags chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultFlags` or `provideDefaultFlagsFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultBreakingChangesFlagsChunk = new InjectionToken<
  BreakingChangesFlags[]
>('DefaultBreakingChangesFlagsChunk');
