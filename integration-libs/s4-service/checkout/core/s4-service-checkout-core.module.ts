/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CxDatePipe } from '@spartacus/core';
import { CheckoutServiceDetailsFacade } from '../../root/facade';
import { CheckoutServiceDetailsConnector } from './connector';
import { CheckoutServiceDetailsService } from './facade';

@NgModule({
  providers: [
    CheckoutServiceDetailsService,
    {
      provide: CheckoutServiceDetailsFacade,
      useExisting: CheckoutServiceDetailsService,
    },
    CheckoutServiceDetailsConnector,
    CxDatePipe,
  ],
})
export class S4ServiceCheckoutCoreModule {}
