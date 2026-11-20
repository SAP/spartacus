/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldService } from '../configurator-textfield.service';
import { MockConfiguratorTextfieldService } from './mock-configurator-textfield.service';

/**
 * Provides a default {@link MockConfiguratorTextfieldService} for
 * {@link ConfiguratorTextfieldService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    {
      provide: ConfiguratorTextfieldService,
      useClass: MockConfiguratorTextfieldService,
    },
  ],
})
export class ConfiguratorTextfieldTestingModule {}
