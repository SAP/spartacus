/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutFlowOrchestratorService } from '@spartacus/checkout/base/components';
import {
  CheckoutConfig,
  CheckoutStepType,
} from '@spartacus/checkout/base/root';
import {
  CONFIG_INITIALIZER,
  ConfigInitializer,
  MODULE_INITIALIZER,
  provideConfigValidator,
  provideDefaultConfig,
} from '@spartacus/core';
import { of } from 'rxjs';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { defaultOpfRoutingConfig } from './config';
import { defaultOpfConfig } from './config/default-opf-config';
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

    // TODO OPF: uncomment once proper type and routing is set up
    provideDefaultConfig(defaultOpfRoutingConfig),
    provideConfigValidator(opfConfidValidator),
    {
      provide: CONFIG_INITIALIZER,
      useFactory: (
        checkoutFlowOrchestratorService: CheckoutFlowOrchestratorService
      ): ConfigInitializer => {
        return {
          scopes: ['checkout'],
          configFactory: async (): Promise<CheckoutConfig> => {
            console.log(
              '[OpfBaseRootModule] CONFIG_INITIALIZER useFactory init'
            );

            checkoutFlowOrchestratorService.registerCheckoutFlow({
              identifier: 'spa-opf',
              steps: [
                {
                  id: 'deliveryAddress',
                  name: 'opf.checkout.tabs.shipping',
                  routeName: 'checkoutDeliveryAddress',
                  type: [CheckoutStepType.DELIVERY_ADDRESS],
                  nameMultiLine: false,
                },
                {
                  id: 'deliveryMode',
                  name: 'opf.checkout.tabs.deliveryMethod',
                  routeName: 'checkoutDeliveryMode',
                  type: [CheckoutStepType.DELIVERY_MODE],
                  nameMultiLine: false,
                },
                {
                  id: 'reviewOrder',
                  name: 'opf.checkout.tabs.paymentAndReview',
                  routeName: 'checkoutReviewOrder',
                  // TODO OPF: provide proper step type (PAYMENT_REVIEW) once augmenting problem is solved
                  type: [CheckoutStepType.REVIEW_ORDER],
                  nameMultiLine: false,
                },
              ],
            });

            return of({}).toPromise();
          },
        };
      },
      deps: [CheckoutFlowOrchestratorService],
      multi: true,
    },
  ],
})
export class OpfBaseRootModule {}
