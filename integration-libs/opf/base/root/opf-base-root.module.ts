/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutConfig } from '@spartacus/checkout/base/root';
import {
  BaseSiteService,
  CONFIG_INITIALIZER,
  ConfigInitializer,
  MODULE_INITIALIZER,
  provideConfigValidator,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  defaultOPFCheckoutConfig,
  defaultOpfConfig,
  defaultOpfRoutingConfig,
} from '@spartacus/opf/checkout/root';
import { defaultCheckoutConfig } from 'feature-libs/checkout/base/root/config/default-checkout-config';
import { take } from 'rxjs/operators';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { opfConfidValidator } from './config/opf-config-validator';
import { OpfEventModule } from './events/opf-event.module';
import { OpfStatePersistenceService } from './services/opf-state-persistence.service';

export function opfStatePersistenceFactory(
  opfStatePersistenceService: OpfStatePersistenceService
): () => void {
  return () => opfStatePersistenceService.initSync();
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
    provideDefaultConfig(defaultOpfRoutingConfig),
    provideConfigValidator(opfConfidValidator),
    {
      provide: CONFIG_INITIALIZER,
      useFactory: (baseSiteService: BaseSiteService): ConfigInitializer => {
        return {
          scopes: ['checkout.steps'],
          configFactory: async (): Promise<CheckoutConfig> => {
            const baseSite = await baseSiteService
              .get()
              .pipe(take(1))
              .toPromise();
            const paymentProvider = baseSite?.baseStore?.paymentProvider;

            if (paymentProvider === 'sap-opf') {
              return defaultOPFCheckoutConfig;
            } else {
              return defaultCheckoutConfig;
            }
          },
        };
      },
      deps: [BaseSiteService],
      multi: true,
    },
    provideDefaultConfig(defaultOpfConfig),
  ],
})
export class OpfBaseRootModule {}
