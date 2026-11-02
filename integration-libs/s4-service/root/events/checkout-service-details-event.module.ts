/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideEnvironmentInitializer } from '@angular/core';
import { CheckoutServiceDetailsEventListener } from './checkout-service-details-event.listener';

@NgModule({
  providers: [
    provideEnvironmentInitializer(() => {
      inject(CheckoutServiceDetailsEventListener);
    }),
  ],
})
export class CheckoutServiceDetailsEventModule {}
