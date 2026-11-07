/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonConfiguratorTestingModule } from '../../common/testing/common-configurator-testing.module';
import { ConfiguratorAttributePriceChangeService } from '../components/attribute/price-change/configurator-attribute-price-change.service';
import { ConfiguratorAttributeQuantityService } from '../components/attribute/quantity/configurator-attribute-quantity.service';
import { ConfiguratorGroupMenuService } from '../components/group-menu/configurator-group-menu.component.service';
import { ConfiguratorMessageService } from '../components/service/configurator-message.service';
import { ConfiguratorStorefrontUtilsService } from '../components/service/configurator-storefront-utils.service';
import { ConfiguratorCartService } from '../core/facade/configurator-cart.service';
import { ConfiguratorCommonsService } from '../core/facade/configurator-commons.service';
import { ConfiguratorGroupStatusService } from '../core/facade/configurator-group-status.service';
import { ConfiguratorGroupsService } from '../core/facade/configurator-groups.service';
import { ConfiguratorUtilsService } from '../core/facade/utils/configurator-utils.service';
import { ConfiguratorExpertModeService } from '../core/services/configurator-expert-mode.service';
import { ConfiguratorQuantityService } from '../core/services/configurator-quantity.service';
import { ConfiguratorBasicEffectService } from '../core/state/effects/configurator-basic-effect.service';
import { RulebasedConfiguratorTestingComponentsModule } from './components/rulebased-configurator-testing-components.module';
import { MockConfiguratorAttributePriceChangeService } from './services/mock-configurator-attribute-price-change.service';
import { MockConfiguratorAttributeQuantityService } from './services/mock-configurator-attribute-quantity.service';
import { MockConfiguratorBasicEffectService } from './services/mock-configurator-basic-effect.service';
import { MockConfiguratorCartService } from './services/mock-configurator-cart.service';
import { MockConfiguratorCommonsService } from './services/mock-configurator-commons.service';
import { MockConfiguratorExpertModeService } from './services/mock-configurator-expert-mode.service';
import { MockConfiguratorGroupMenuComponentService } from './services/mock-configurator-group-menu-component.service';
import { MockConfiguratorGroupStatusService } from './services/mock-configurator-group-status.service';
import { MockConfiguratorGroupsService } from './services/mock-configurator-groups.service';
import { MockConfiguratorMessageService } from './services/mock-configurator-message.service';
import { MockConfiguratorQuantityService } from './services/mock-configurator-quantity.service';
import { MockConfiguratorStorefrontUtilsService } from './services/mock-configurator-storefront-utils.service';
import { MockConfiguratorUtilsService } from './services/mock-configurator-utils.service';

/**
 * Default mocks for product-configurator rulebased services and components.
 * Override individual tokens in TestBed when a spec needs custom behavior.
 */
@NgModule({
  imports: [
    CommonConfiguratorTestingModule,
    RulebasedConfiguratorTestingComponentsModule,
  ],
  exports: [
    CommonConfiguratorTestingModule,
    RulebasedConfiguratorTestingComponentsModule,
  ],
  providers: [
    { provide: ConfiguratorCommonsService, useClass: MockConfiguratorCommonsService },
    { provide: ConfiguratorGroupsService, useClass: MockConfiguratorGroupsService },
    { provide: ConfiguratorCartService, useClass: MockConfiguratorCartService },
    { provide: ConfiguratorUtilsService, useClass: MockConfiguratorUtilsService },
    {
      provide: ConfiguratorStorefrontUtilsService,
      useClass: MockConfiguratorStorefrontUtilsService,
    },
    {
      provide: ConfiguratorGroupStatusService,
      useClass: MockConfiguratorGroupStatusService,
    },
    {
      provide: ConfiguratorExpertModeService,
      useClass: MockConfiguratorExpertModeService,
    },
    { provide: ConfiguratorQuantityService, useClass: MockConfiguratorQuantityService },
    {
      provide: ConfiguratorAttributePriceChangeService,
      useClass: MockConfiguratorAttributePriceChangeService,
    },
    {
      provide: ConfiguratorAttributeQuantityService,
      useClass: MockConfiguratorAttributeQuantityService,
    },
    { provide: ConfiguratorMessageService, useClass: MockConfiguratorMessageService },
    {
      provide: ConfiguratorGroupMenuService,
      useClass: MockConfiguratorGroupMenuComponentService,
    },
    {
      provide: ConfiguratorBasicEffectService,
      useClass: MockConfiguratorBasicEffectService,
    },
  ],
})
export class RulebasedConfiguratorTestingModule {}
