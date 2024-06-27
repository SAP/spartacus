/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';

import { CheckoutServiceDetailsService } from './facade';
import { CheckoutServiceDetailsFacade } from '../root/facade';
import { CheckoutServiceDetailsConnector } from './connector';

@NgModule({
  providers: [
    CheckoutServiceDetailsService,
    {
      provide: CheckoutServiceDetailsFacade,
      useExisting: CheckoutServiceDetailsService,
    },
    CheckoutServiceDetailsConnector,
  ],
})
export class S4ServiceCoreModule {}
