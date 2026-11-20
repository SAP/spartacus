/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorGroupsService } from '../configurator-groups.service';
import { MockConfiguratorGroupsService } from './mock-configurator-groups.service';

/**
 * Provides a default {@link MockConfiguratorGroupsService} for
 * {@link ConfiguratorGroupsService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    {
      provide: ConfiguratorGroupsService,
      useClass: MockConfiguratorGroupsService,
    },
  ],
})
export class ConfiguratorGroupsTestingModule {}
