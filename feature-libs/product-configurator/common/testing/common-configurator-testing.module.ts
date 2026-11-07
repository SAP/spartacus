/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ConfiguratorCartEntryBundleInfoService } from '../components/configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.service';
import { ConfiguratorRouterExtractorService } from '../components/service/configurator-router-extractor.service';
import { CommonConfiguratorUtilsService } from '../shared/utils/common-configurator-utils.service';
import { CommonConfiguratorTestingComponentsModule } from './components/common-configurator-testing-components.module';
import { MockCommonConfiguratorUtilsService } from './services/mock-common-configurator-utils.service';
import { MockConfiguratorCartEntryBundleInfoService } from './services/mock-configurator-cart-entry-bundle-info.service';
import { MockConfiguratorRouterExtractorService } from './services/mock-configurator-router-extractor.service';

/**
 * Default mocks for product-configurator common services and components.
 * Override individual tokens in TestBed when a spec needs custom behavior.
 */
@NgModule({
  imports: [CommonConfiguratorTestingComponentsModule],
  exports: [CommonConfiguratorTestingComponentsModule],
  providers: [
    {
      provide: CommonConfiguratorUtilsService,
      useClass: MockCommonConfiguratorUtilsService,
    },
    {
      provide: ConfiguratorRouterExtractorService,
      useClass: MockConfiguratorRouterExtractorService,
    },
    {
      provide: ConfiguratorCartEntryBundleInfoService,
      useClass: MockConfiguratorCartEntryBundleInfoService,
    },
  ],
})
export class CommonConfiguratorTestingModule {}
