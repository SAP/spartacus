/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  type FactoryProvider,
  InjectionToken,
  type ValueProvider,
} from '@angular/core';

/**
 * An initializer function to be provided as a value for the multi-InjectionToken `LOCATION_INITIALIZED_MULTI`.
 *
 * The initializer will be called in an injection context.
 *
 * CAUTION: The injection context is lost after leaving the synchronous execution, so
 * any injections must be performed before moving into asynchronous execution.  Otherwise, you
 * must inject and store the `EnvironmentInjector` in a variable, then use `runInInjectionContext()`.
 */
export type LocationInitializer = () => Promise<any>;

/**
 * Factory function used with a `FactoryProvider` to create a `LocationInitializer` value
 * for the multi-value InjectionToken `LOCATION_INITIALIZED_MULTI`.
 */
export type LocationInitializerFactory = () => LocationInitializer;

/**
 * Wrapper InjectionToken for LOCATION_INITIALIZED token to allow multiple initializers.
 *
 * CAUTION: Don't use Router and don't perform any Router navigation in its implementations.
 * Only access the class `Location` from '@angular/common' if access to URL is needed.
 */
export const LOCATION_INITIALIZED_MULTI = new InjectionToken<
  LocationInitializer[]
>('MULTI_LOCATION_INITIALIZED');

/**
 * Creates a `FactoryProvider` to create a value for the multi-token `LOCATION_INITIALIZED_MULTI`
 */
export function provideLocationInitializerFactory(
  factory: LocationInitializerFactory
) {
  return {
    provide: LOCATION_INITIALIZED_MULTI,
    multi: true,
    useFactory: factory,
  } satisfies FactoryProvider;
}

/**
 * Creates a `ValueProvider` for the multi-token `LOCATION_INITIALIZED_MULTI`
 */
export function provideLocationInitializer(initializer: LocationInitializer) {
  return {
    provide: LOCATION_INITIALIZED_MULTI,
    multi: true,
    useValue: initializer,
  } satisfies ValueProvider;
}
