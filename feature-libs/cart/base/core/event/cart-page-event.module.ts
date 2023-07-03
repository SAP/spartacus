/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartPageEventBuilder } from './cart-page-event.builder';

@NgModule({})
export class CartPageEventModule {
  constructor(_cartPageEventBuilder: CartPageEventBuilder) {
    // Intentional empty constructor
  }
}
