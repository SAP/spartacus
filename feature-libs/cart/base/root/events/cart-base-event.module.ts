/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { MultiCartEventListener } from './multi-cart-event.listener';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(MultiCartEventListener);
    }),
  ],
})
export class CartBaseEventModule {}
