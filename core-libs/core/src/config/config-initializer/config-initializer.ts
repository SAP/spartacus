/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ClassProvider,
  FactoryProvider,
  InjectionToken,
  Type,
} from '@angular/core';
import { Config } from '../config-tokens';

/**
 * Used to provide asynchronous config during app initialization
 */
export interface ConfigInitializer {
  /**
   * List of config parts that are resolved by configFactory, e.g.:
   * 'context.baseSite', 'context.language'
   */
  scopes: string[];
  /**
   * Promise that returns config chunk
   */
  configFactory: () => Promise<Config>;
}

/**
 * A multi-token for providing ConfigInitializers.
 */
export const CONFIG_INITIALIZER = new InjectionToken<ConfigInitializer | null>(
  'ConfigInitializer'
);

export const CONFIG_INITIALIZER_FORROOT_GUARD = new InjectionToken<void>(
  'CONFIG_INITIALIZER_FORROOT_GUARD'
);

/**
 * Add a `ConfigInitializer` to the application for asynchronous configuration.
 *
 * Creates a provider for the multi-token `CONFIG_INITIALIZER`.
 */
export function provideConfigInitializer(initializer: Type<ConfigInitializer>) {
  return {
    provide: CONFIG_INITIALIZER,
    useClass: initializer,
    multi: true,
  } as ClassProvider;
}

/**
 * Add a `ConfigInitializer` factory to the application for asynchronous configuration.
 *
 * Create a factory provider for the multi-token `CONFIG_INITIALIZER`.
 */
export function provideConfigInitializerFactory(
  initializerFactory: () => ConfigInitializer | null
) {
  return {
    provide: CONFIG_INITIALIZER,
    useFactory: initializerFactory,
    multi: true,
  } as FactoryProvider;
}
