/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CheckoutConfig } from '../../root/config';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFlowOrchestratorService {
  constructor(protected checkoutConfig: CheckoutConfig) {}

  /**
   * Should be resolved asynchronously (by calling backend)
   * for testing purposes it is a static value.
   */
  protected EXPECTED_FLOW_IDENTIFIER = 'mockup';

  getCheckoutFlow() {
    console.log(this.checkoutConfig.checkout?.flows);
    return this.checkoutConfig.checkout?.flows?.[this.EXPECTED_FLOW_IDENTIFIER];
  }
}
