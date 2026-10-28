/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  MockConfiguratorProviderService as CommonMockConfiguratorProviderService,
  MockConfiguratorBaseSiteService,
  MockConfiguratorCurrentProductService,
  MockConfiguratorGlobalMessageService,
  MockConfiguratorLanguageService,
  MockConfiguratorLaunchDialogService,
  MockConfiguratorLoggerService,
  MockConfiguratorProductService,
  MockConfiguratorRoutingService,
  MockConfiguratorTranslationService,
  MockConfiguratorUserIdService,
} from '../../common/testing';
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

export {
  ConfiguratorCommonTestingModule,
  MockConfiguratorBaseSiteService,
  MockConfiguratorCurrentProductService,
  MockConfiguratorGlobalMessageService,
  MockConfiguratorLanguageService,
  MockConfiguratorLaunchDialogService,
  MockConfiguratorLoggerService,
  MockConfiguratorProductService,
  MockConfiguratorRoutingService,
  MockConfiguratorTranslationService,
  MockConfiguratorUserIdService,
  provideConfiguratorMockRoutingService,
} from '../../common/testing';
export * from './components/index';
export * from './rulebased-configurator-mock-components';
export * from './rulebased-configurator-testing.module';
export * from './services/index';

/**
 * Static references to rulebased and common mock classes for `{ provide, useClass }` in TestBed.
 * Alternatives: import {@link ConfiguratorRulebasedTestingModule} for default providers, or import
 * `MockConfigurator*` classes / `provideConfiguratorMock*` factories directly.
 */
export class MockConfiguratorProviderService {
  static readonly MockRoutingService = MockConfiguratorRoutingService;
  static readonly MockProductService = MockConfiguratorProductService;
  static readonly MockCurrentProductService =
    MockConfiguratorCurrentProductService;
  static readonly MockUserIdService = MockConfiguratorUserIdService;
  static readonly MockBaseSiteService = MockConfiguratorBaseSiteService;
  static readonly MockGlobalMessageService =
    MockConfiguratorGlobalMessageService;
  static readonly MockTranslationService = MockConfiguratorTranslationService;
  static readonly MockLanguageService = MockConfiguratorLanguageService;
  static readonly MockLaunchDialogService = MockConfiguratorLaunchDialogService;
  static readonly MockLoggerService = MockConfiguratorLoggerService;

  static readonly MockRouter = MockConfiguratorRouter;
  static readonly MockBreakpointService = MockConfiguratorBreakpointService;
  static readonly MockConfiguratorCommonsService =
    MockConfiguratorCommonsService;
  static readonly MockConfiguratorGroupsService = MockConfiguratorGroupsService;
  static readonly MockConfiguratorStorefrontUtilsService =
    MockConfiguratorStorefrontUtilsService;
  static readonly MockConfiguratorRouterExtractorService =
    MockConfiguratorRouterExtractorService;
  static readonly MockConfiguratorCartService = MockConfiguratorCartService;
  static readonly MockConfiguratorExpertModeService =
    MockConfiguratorExpertModeService;
  static readonly MockConfiguratorQuantityService =
    MockConfiguratorQuantityService;
  static readonly MockCommonConfiguratorUtilsService =
    MockCommonConfiguratorUtilsService;
  static readonly MockConfiguratorUtilsService = MockConfiguratorUtilsService;

  static readonly Common = CommonMockConfiguratorProviderService;
}
