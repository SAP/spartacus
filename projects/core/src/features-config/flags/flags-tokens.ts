/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Global Flags, can be used to inject Flags configuration to any part of the app
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => Object.assign({}, inject(DefaultFlags), inject(RootFlags)),
})
export abstract class Flags {}

/**
 * Default Flags token, used to build Global Flags, built from DefaultFlagsChunks
 */
export const DefaultFlags = new InjectionToken('DefaultFlags', {
  providedIn: 'root',
  factory: () =>
    Object.assign({}, ...(inject(DefaultFlagsChunk, { optional: true }) ?? [])),
});

/**
 * Root Flags token, used to build Global Flags, built from FlagsChunks
 */
export const RootFlags = new InjectionToken('RootFlags', {
  providedIn: 'root',
  factory: () =>
    Object.assign({}, ...(inject(FlagsChunk, { optional: true }) ?? [])),
});

/**
 * Flags chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideFlags` or import `FlagsModule.withFlags` instead.
 */
export const FlagsChunk = new InjectionToken<Flags[]>('FlagsChunk');

/**
 * Flags chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultFlags` or `provideDefaultFlagsFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultFlagsChunk = new InjectionToken<Flags[]>(
  'DefaultFlagsChunk'
);
