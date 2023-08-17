/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CheckoutConfig } from '../../root/config';
import { CheckoutFlow } from '../../root/model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFlowOrchestratorService {
  constructor(protected checkoutConfig: CheckoutConfig) {
    this.resolveCheckoutFlow();
  }

  /**
   * Should be resolved async.
   */
  protected SELECTED_FLOW_ID = 'mockup';

  protected selectedFlow: CheckoutFlow;

  protected checkoutFlows = this.checkoutConfig.checkout;

  registerCheckoutFlow(flow: CheckoutFlow) {
    console.log('Registering new flow called: ' + flow.identifier);
  }

  resolveCheckoutFlow(): CheckoutFlow | undefined {
    console.log('Resolving flows from: ');
    console.log(this.checkoutFlows);

    if (this.checkoutFlows) {
      this.checkoutFlows.forEach((flow: CheckoutFlow) => {
        if (flow.identifier === this.SELECTED_FLOW_ID) {
          console.log('Returned selected flow: ');
          console.log(flow);
          this.selectedFlow = flow;
          return flow;
        }
      });
    }

    return undefined;
  }

  getCheckoutFlow() {
    return this.selectedFlow;
  }
}
