/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export * from './common-configurator-mock-providers';
export * from './mock-configurator-base-site.service';
export * from './mock-configurator-current-product.service';
export * from './mock-configurator-global-message.service';
export * from './mock-configurator-language.service';
export * from './mock-configurator-launch-dialog.service';
export * from './mock-configurator-logger.service';
export * from './mock-configurator-product.service';
export * from './mock-configurator-routing.service';
export * from './mock-configurator-translation.service';
export * from './mock-configurator-user-id.service';

import { MockConfiguratorBaseSiteService } from './mock-configurator-base-site.service';
import { MockConfiguratorCurrentProductService } from './mock-configurator-current-product.service';
import { MockConfiguratorGlobalMessageService } from './mock-configurator-global-message.service';
import { MockConfiguratorLanguageService } from './mock-configurator-language.service';
import { MockConfiguratorLaunchDialogService } from './mock-configurator-launch-dialog.service';
import { MockConfiguratorLoggerService } from './mock-configurator-logger.service';
import { MockConfiguratorProductService } from './mock-configurator-product.service';
import { MockConfiguratorRoutingService } from './mock-configurator-routing.service';
import { MockConfiguratorTranslationService } from './mock-configurator-translation.service';
import { MockConfiguratorUserIdService } from './mock-configurator-user-id.service';

/**
 * Static references to common mock classes for `{ provide, useClass }` in TestBed.
 * Alternatives: import {@link ConfiguratorCommonTestingModule} for default providers, or import
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
}
