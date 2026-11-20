/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '../configurator-router-extractor.service';
import { MockConfiguratorRouterExtractorService } from './mock-configurator-router-extractor.service';

/**
 * Provides a default {@link MockConfiguratorRouterExtractorService} for
 * {@link ConfiguratorRouterExtractorService} in unit tests. Override individual
 * methods per test with `vi.spyOn`.
 */
@NgModule({
  providers: [
    {
      provide: ConfiguratorRouterExtractorService,
      useClass: MockConfiguratorRouterExtractorService,
    },
  ],
})
export class ConfiguratorRouterExtractorTestingModule {}
