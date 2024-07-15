/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CheckoutServiceDetailsAdapter } from '../core/connector';
import { OccCheckoutServiceDetailsAdapter } from './adapter';
import { defaultOccCheckoutServiceOrderConfig } from './config/default-occ-checkout-s4-service-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccCheckoutServiceOrderConfig),
    {
      provide: CheckoutServiceDetailsAdapter,
      useClass: OccCheckoutServiceDetailsAdapter,
    },
  ],
})
export class S4ServiceCheckoutOccModule {}
