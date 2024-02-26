/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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

import {
  CheckoutAdapter,
  CheckoutBillingAddressAdapter,
  CheckoutBillingAddressConnector,
  CheckoutConnector,
  CheckoutDeliveryAddressAdapter,
  CheckoutDeliveryAddressConnector,
  CheckoutDeliveryModesAdapter,
  CheckoutDeliveryModesConnector,
} from '@spartacus/checkout/base/core';
import {
  OccCheckoutAdapter,
  OccCheckoutBillingAddressAdapter,
  OccCheckoutDeliveryAddressAdapter,
  OccCheckoutDeliveryModesAdapter,
  defaultOccCheckoutConfig,
} from '@spartacus/checkout/base/occ';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { OPF_BASE_FEATURE } from './feature-name';
import {
  OpfCheckoutBillingAddressService,
  OpfCheckoutDeliveryAddressService,
  OpfCheckoutDeliveryModesService,
  OpfCheckoutQueryService,
  OpfGlobalMessageService,
} from './services';
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
    OpfCheckoutDeliveryAddressService,
    OpfCheckoutBillingAddressService,
    OpfCheckoutDeliveryModesService,
    OpfCheckoutQueryService,
    CheckoutConnector,
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
    {
      provide: CheckoutQueryFacade,
      useClass: OpfCheckoutQueryService,
    },
    CheckoutDeliveryModesConnector,
    {
      provide: CheckoutDeliveryModesAdapter,
      useClass: OccCheckoutDeliveryModesAdapter,
    },
    CheckoutDeliveryAddressConnector,
    {
      provide: CheckoutDeliveryAddressAdapter,
      useClass: OccCheckoutDeliveryAddressAdapter,
    },
    CheckoutBillingAddressConnector,
    {
      provide: CheckoutBillingAddressAdapter,
      useClass: OccCheckoutBillingAddressAdapter,
    },
    provideDefaultConfig(defaultOccCheckoutConfig),
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
  ],
})
export class OpfBaseRootModule {}
