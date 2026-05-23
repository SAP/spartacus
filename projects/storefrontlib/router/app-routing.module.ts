/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOnNavigateConfig } from './config';
import { OnNavigateService } from './on-navigate.service';

@NgModule({
  imports: [
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    provideDefaultConfig(defaultOnNavigateConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: onNavigateFactory,
      deps: [OnNavigateService],
      multi: true,
    },
  ],
})
export class AppRoutingModule {}

/**
 * @deprecated Use `AppRoutingModule` instead (the default `AppRoutingModule` now uses
 * `initialNavigation: 'enabledBlocking'`, same as this module).
 * This alias is kept for backwards compatibility.
 */
export { AppRoutingModule as AppRoutingModuleLegacy };

/**
 * New hydration-compatible routing module for Spartacus.
 *
 * Sets `initialNavigation: 'disabled'` so that the `APP_INITIALIZER`
 * provided by `RoutingModuleV2` can manually run all prerequisite initializers,
 * trigger navigation, and await its completion — avoiding NG05001.
 *
 * Use together with `BaseStorefrontModuleV2`.
 */
@NgModule({
  imports: [
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      initialNavigation: 'disabled',
    }),
  ],
  providers: [
    provideDefaultConfig(defaultOnNavigateConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: onNavigateFactory,
      deps: [OnNavigateService],
      multi: true,
    },
  ],
})
export class AppRoutingModuleV2 {}

export function onNavigateFactory(
  onNavigateService: OnNavigateService
): () => void {
  const isReady = () => onNavigateService.initializeWithConfig();
  return isReady;
}
