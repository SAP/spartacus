/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  BaseSiteService,
  GlobalMessageService,
  LanguageService,
  LoggerService,
  ProductService,
  RoutingService,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import {
  CurrentProductService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { MockConfiguratorBaseSiteService } from './services/mock-configurator-base-site.service';
import { MockConfiguratorCurrentProductService } from './services/mock-configurator-current-product.service';
import { MockConfiguratorGlobalMessageService } from './services/mock-configurator-global-message.service';
import { MockConfiguratorLanguageService } from './services/mock-configurator-language.service';
import { MockConfiguratorLoggerService } from './services/mock-configurator-logger.service';
import { MockConfiguratorLaunchDialogService } from './services/mock-configurator-launch-dialog.service';
import { MockConfiguratorProductService } from './services/mock-configurator-product.service';
import { MockConfiguratorRoutingService } from './services/mock-configurator-routing.service';
import { MockConfiguratorTranslationService } from './services/mock-configurator-translation.service';
import { MockConfiguratorUserIdService } from './services/mock-configurator-user-id.service';

/**
 * Default Spartacus service mocks for product-configurator common unit tests.
 * Override individual tokens in TestBed when a spec needs custom behavior.
 */
@NgModule({
  providers: [
    { provide: RoutingService, useClass: MockConfiguratorRoutingService },
    { provide: ProductService, useClass: MockConfiguratorProductService },
    {
      provide: CurrentProductService,
      useClass: MockConfiguratorCurrentProductService,
    },
    { provide: UserIdService, useClass: MockConfiguratorUserIdService },
    { provide: BaseSiteService, useClass: MockConfiguratorBaseSiteService },
    {
      provide: GlobalMessageService,
      useClass: MockConfiguratorGlobalMessageService,
    },
    {
      provide: TranslationService,
      useClass: MockConfiguratorTranslationService,
    },
    { provide: LanguageService, useClass: MockConfiguratorLanguageService },
    {
      provide: LaunchDialogService,
      useClass: MockConfiguratorLaunchDialogService,
    },
    { provide: LoggerService, useClass: MockConfiguratorLoggerService },
  ],
})
export class ConfiguratorCommonTestingModule {}
