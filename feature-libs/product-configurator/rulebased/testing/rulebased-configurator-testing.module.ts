/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguratorRouterExtractorService } from '../../common/components/service/configurator-router-extractor.service';
import { CommonConfiguratorUtilsService } from '../../common/shared/utils/common-configurator-utils.service';
import { BreakpointService } from '@spartacus/storefront';
import { ConfiguratorCommonTestingModule } from '../../common/testing/common-configurator-testing.module';
import { ConfiguratorStorefrontUtilsService } from '../components/service/configurator-storefront-utils.service';
import { ConfiguratorCartService } from '../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../core/facade/configurator-groups.service';
import { ConfiguratorUtilsService } from '../core/facade/utils/configurator-utils.service';
import { ConfiguratorExpertModeService } from '../core/services/configurator-expert-mode.service';
import { ConfiguratorQuantityService } from '../core/services/configurator-quantity.service';
import { MockConfiguratorBreakpointService } from './services/mock-configurator-breakpoint.service';
import { MockConfiguratorCartService } from './services/mock-configurator-cart.service';
import { MockConfiguratorCommonsService } from './services/mock-configurator-commons.service';
import { MockConfiguratorExpertModeService } from './services/mock-configurator-expert-mode.service';
import { MockConfiguratorGroupsService } from './services/mock-configurator-groups.service';
import { MockConfiguratorQuantityService } from './services/mock-configurator-quantity.service';
import { MockConfiguratorRouterExtractorService } from './services/mock-configurator-router-extractor.service';
import { MockConfiguratorStorefrontUtilsService } from './services/mock-configurator-storefront-utils.service';
import { MockConfiguratorUtilsService } from './services/mock-configurator-utils.service';
import { MockCommonConfiguratorUtilsService } from './services/mock-common-configurator-utils.service';
import { MockConfiguratorRouter } from './services/mock-configurator-router';

/**
 * Spartacus and rulebased configurator service mocks for unit tests.
 * Includes {@link ConfiguratorCommonTestingModule}. Override tokens in TestBed when needed.
 */
@NgModule({
  imports: [ConfiguratorCommonTestingModule],
  providers: [
    { provide: Router, useClass: MockConfiguratorRouter },
    { provide: BreakpointService, useClass: MockConfiguratorBreakpointService },
    {
      provide: ConfiguratorCommonsService,
      useClass: MockConfiguratorCommonsService,
    },
    {
      provide: ConfiguratorGroupsService,
      useClass: MockConfiguratorGroupsService,
    },
    {
      provide: ConfiguratorStorefrontUtilsService,
      useClass: MockConfiguratorStorefrontUtilsService,
    },
    {
      provide: ConfiguratorRouterExtractorService,
      useClass: MockConfiguratorRouterExtractorService,
    },
    {
      provide: ConfiguratorCartService,
      useClass: MockConfiguratorCartService,
    },
    {
      provide: ConfiguratorExpertModeService,
      useClass: MockConfiguratorExpertModeService,
    },
    {
      provide: ConfiguratorQuantityService,
      useClass: MockConfiguratorQuantityService,
    },
    {
      provide: CommonConfiguratorUtilsService,
      useClass: MockCommonConfiguratorUtilsService,
    },
    {
      provide: ConfiguratorUtilsService,
      useClass: MockConfiguratorUtilsService,
    },
  ],
})
export class ConfiguratorRulebasedTestingModule {}
