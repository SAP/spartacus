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
    console.log('[CheckoutFlowOrchestratorService] constructor call');
  }

  /**
   * Should be resolved asynchronously (by calling backend)
   * for testing purposes it is a static value.
   */
  protected EXPECTED_FLOW_IDENTIFIER = 'spa-opf';

  protected selectedFlow: CheckoutFlow;

  protected checkoutFlows = this.checkoutConfig.checkout;

  resolveCheckoutFlow(): CheckoutFlow | undefined {
    console.log(
      '[CheckoutFlowOrchestratorService] Resolving flows from: ',
      this.checkoutFlows
    );

    if (this.checkoutFlows) {
      console.log(
        '[CheckoutFlowOrchestratorService] Looking for: ',
        this.EXPECTED_FLOW_IDENTIFIER
      );
      this.checkoutFlows.forEach((flow: CheckoutFlow) => {
        if (flow.identifier === this.EXPECTED_FLOW_IDENTIFIER) {
          console.log(
            '[CheckoutFlowOrchestratorService] Found expected flow! ',
            flow
          );
          this.selectedFlow = flow;
        }
      });
    }

    return undefined;
  }

  registerCheckoutFlow(checkoutFlow: CheckoutFlow) {
    console.log(
      '[CheckoutFlowOrchestratorService] Pushing new flow: ' +
        checkoutFlow.identifier
    );
    this.checkoutFlows?.push(checkoutFlow);

    /**
     * Find a proper place where to resolve checkout
     * flow based on expected identifier.
     */
    this.resolveCheckoutFlow();
  }

  getCheckoutFlow() {
    return this.selectedFlow;
  }
}
