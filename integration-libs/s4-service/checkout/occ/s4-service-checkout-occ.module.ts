/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { defaultOccCheckoutServiceOrderConfig } from './config/default-occ-checkout-s4-service-config';
import { CheckoutServiceDetailsAdapter } from '../core/connector';
import { provideDefaultConfig } from '@spartacus/core';
import { OccCheckoutServiceDetailsAdapter } from './adapters';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCheckoutServiceOrderConfig),
    {
      provide: CheckoutServiceDetailsAdapter,
      useClass: OccCheckoutServiceDetailsAdapter,
    },
  ],
})
export class S4ServiceCheckoutOccModule {}
