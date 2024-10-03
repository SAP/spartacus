/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { MultiCartEventListener } from './multi-cart-event.listener';

@NgModule({})
export class CartBaseEventModule {
  constructor(_multiCartEventListener: MultiCartEventListener) {
    // Intentional empty constructor
  }
}
