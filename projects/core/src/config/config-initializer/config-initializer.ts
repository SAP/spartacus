import { InjectionToken } from '@angular/core';
import { Config } from '../config-tokens';

export const CONFIG_INITIALIZER = new InjectionToken('ConfigInitializer');

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

export const CONFIG_INITIALIZER_FORROOT_GUARD = new InjectionToken<void>(
  'CONFIG_INITIALIZER_FORROOT_GUARD'
);
