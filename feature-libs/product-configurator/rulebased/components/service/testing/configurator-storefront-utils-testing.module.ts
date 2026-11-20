/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorStorefrontUtilsService } from '../configurator-storefront-utils.service';
import { MockConfiguratorStorefrontUtilsService } from './mock-configurator-storefront-utils.service';

/**
 * Provides a default {@link MockConfiguratorStorefrontUtilsService} for
 * {@link ConfiguratorStorefrontUtilsService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    {
      provide: ConfiguratorStorefrontUtilsService,
      useClass: MockConfiguratorStorefrontUtilsService,
    },
  ],
})
export class ConfiguratorStorefrontUtilsTestingModule {}
