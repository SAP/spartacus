/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CheckoutOpfUiClearConditionsEventListener } from './opf-ui-clear-conditions.event.listener';

@NgModule({})
export class OpfEventModule {
  constructor(
    _checkoutOpfUiClearConditionsEventListener: CheckoutOpfUiClearConditionsEventListener
  ) {
    // Intentional empty constructor
  }
}
