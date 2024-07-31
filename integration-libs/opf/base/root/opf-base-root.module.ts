/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiniCartComponentService } from '@spartacus/cart/base/components/mini-cart';
import {
  CmsConfig,
  GlobalMessageService,
  MODULE_INITIALIZER,
  provideConfigValidator,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { defaultOpfRoutingConfig } from './config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfigValidator } from './config/opf-config-validator';
import { OpfEventModule } from './events/opf-event.module';
import { OPF_BASE_FEATURE } from './feature-name';
import { OpfGlobalMessageService } from './services';
import { OpfMiniCartComponentService } from './services/opf-mini-cart-component.service';
import { OpfStatePersistenceService } from './services/opf-state-persistence.service';

export function opfStatePersistenceFactory(
  opfStatePersistenceService: OpfStatePersistenceService
): () => void {
  return () => opfStatePersistenceService.initSync();
}

export function defaultOpfBaseCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_BASE_FEATURE]: {
        cmsComponents: [
          'OpfCtaScriptsComponent',
          'OpfQuickBuyComponent',
          'OpfAddToCartComponent',
          'OpfCartProceedToCheckoutComponent',
        ],
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationResult',
        },
      },
      {
        // @ts-ignore
        path: null,
        component: OpfPaymentVerificationComponent,
        data: {
          cxRoute: 'paymentVerificationCancel',
        },
      },
    ]),
    OpfEventModule,
  ],
  providers: [
    {
      provide: MODULE_INITIALIZER,
      useFactory: opfStatePersistenceFactory,
      deps: [OpfStatePersistenceService],
      multi: true,
    },
    provideDefaultConfig(defaultOpfConfig),

    // TODO OPF: uncomment once proper type and routing is set up
    provideDefaultConfig(defaultOpfRoutingConfig),
    provideConfigValidator(opfConfigValidator),
    provideDefaultConfigFactory(defaultOpfBaseCmsComponentsConfig),
    OpfGlobalMessageService,
    {
      provide: GlobalMessageService,
      useExisting: OpfGlobalMessageService,
    },
    OpfMiniCartComponentService,
    {
      provide: MiniCartComponentService,
      useExisting: OpfMiniCartComponentService,
    },
  ],
})
export class OpfBaseRootModule {}
