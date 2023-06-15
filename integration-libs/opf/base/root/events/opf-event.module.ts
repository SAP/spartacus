/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutOpfEventListener } from './opf-event.listener';

@NgModule({})
export class OpfEventModule {
  constructor(_checkoutOpfEventListener: CheckoutOpfEventListener) {
    // Intentional empty constructor
  }
}
