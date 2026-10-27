/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { ConfiguratorRouterListener } from './configurator-router.listener';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(ConfiguratorRouterListener);
    }),
  ],
})
export class ConfiguratorRouterModule {}
