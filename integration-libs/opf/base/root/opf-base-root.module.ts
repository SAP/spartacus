/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_INITIALIZER, provideDefaultConfig } from '@spartacus/core';
import { OpfPaymentVerificationComponent } from './components/opf-payment-verification';
import { defaultOpfRoutingConfig } from './config';
import { defaultOpfConfig } from './config/default-opf-config';
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
    // provideConfigValidator(opfConfidValidator),
    // {
    //   provide: CONFIG_INITIALIZER,
    //   useFactory: (): ConfigInitializer => {
    //     console.log('x');
    //     return {
    //       scopes: ['checkout.flows.spa-opf'],
    //       configFactory: async (): Promise<CheckoutConfig> => {
    //         return of({}).toPromise();
    //       },
    //     };
    //   },
    //   multi: true,
    // },
  ],
})
export class OpfBaseRootModule {}
