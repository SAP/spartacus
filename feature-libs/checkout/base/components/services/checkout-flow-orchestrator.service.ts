/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CheckoutConfig, CheckoutFlow } from '@spartacus/checkout/base/root';
import { BaseSiteService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFlowOrchestratorService {
  protected checkoutConfig = inject(CheckoutConfig);
  protected baseSiteService = inject(BaseSiteService);

  constructor() {
    this.getPaymentProvider().subscribe((paymentProvider) => {
      this.paymentProviderName = paymentProvider;
    });
  }

  protected paymentProviderName: string | undefined = undefined;

  getPaymentProvider(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => baseSite?.baseStore?.paymentProvider)
    );
  }

  getCheckoutFlow(): CheckoutFlow | undefined {
    if (this.paymentProviderName) {
      const flow =
        this.checkoutConfig.checkout?.flows?.[this.paymentProviderName];
      if (flow) {
        return flow;
      }
    }
    return this.checkoutConfig.checkout;
  }
}
