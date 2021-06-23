import { InjectionToken } from '@angular/core';

/**
 * The MODULE_INITIALIZER is used as a multi provider that returns
 * a function that should be executed when the module is lazy loaded.
 * It is, in a way, an APP_INITIALIZER for lazy loaded modules.
 *
 * If the module is eagerly loaded, the MODULE_INITIALIZER functions
 * run when the app is initialized.  Therfore, if the module in which it is
 * defined is used in a eager loading configuration, MODULE_INITIALIZER
 * will fall back to work like APP_INITIALIZER.
 */
export const MODULE_INITIALIZER: InjectionToken<(() => any)[]> =
  new InjectionToken<(() => any)[]>('MODULE_INITIALIZER');
