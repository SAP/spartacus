/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorExpertModeService } from '../configurator-expert-mode.service';
import { MockConfiguratorExpertModeService } from './mock-configurator-expert-mode.service';

/**
 * Provides a default {@link MockConfiguratorExpertModeService} for
 * {@link ConfiguratorExpertModeService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    {
      provide: ConfiguratorExpertModeService,
      useClass: MockConfiguratorExpertModeService,
    },
  ],
})
export class ConfiguratorExpertModeTestingModule {}
