/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorCommonsService } from '../configurator-commons.service';
import { MockConfiguratorCommonsService } from './mock-configurator-commons.service';

/**
 * Provides a default {@link MockConfiguratorCommonsService} for
 * {@link ConfiguratorCommonsService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    {
      provide: ConfiguratorCommonsService,
      useClass: MockConfiguratorCommonsService,
    },
  ],
})
export class ConfiguratorCommonsTestingModule {}
