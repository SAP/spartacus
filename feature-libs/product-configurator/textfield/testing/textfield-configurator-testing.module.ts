/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldService } from '../core/facade/configurator-textfield.service';
import { MockConfiguratorTextfieldService } from './services/mock-configurator-textfield.service';

/** Default mock for the textfield product-configurator service in unit tests. */
@NgModule({
  providers: [
    {
      provide: ConfiguratorTextfieldService,
      useClass: MockConfiguratorTextfieldService,
    },
  ],
})
export class TextfieldConfiguratorTestingModule {}
