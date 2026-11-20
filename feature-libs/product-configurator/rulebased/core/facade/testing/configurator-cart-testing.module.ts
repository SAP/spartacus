/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorCartService } from '../configurator-cart.service';
import { MockConfiguratorCartService } from './mock-configurator-cart.service';

/**
 * Provides a default {@link MockConfiguratorCartService} for
 * {@link ConfiguratorCartService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    { provide: ConfiguratorCartService, useClass: MockConfiguratorCartService },
  ],
})
export class ConfiguratorCartTestingModule {}
