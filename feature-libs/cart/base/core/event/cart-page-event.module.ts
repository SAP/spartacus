/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideEnvironmentInitializer } from '@angular/core';
import { CartPageEventBuilder } from './cart-page-event.builder';

@NgModule({
  providers: [
    provideEnvironmentInitializer(() => {
      inject(CartPageEventBuilder);
    }),
  ],
})
export class CartPageEventModule {}
