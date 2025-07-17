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
      console.log('paymentProvider', paymentProvider);
      this.paymentProviderName = paymentProvider;
    });
  }

  protected paymentProviderName: string | undefined = undefined;

  getPaymentProvider(): Observable<string | undefined> {
    return this.baseSiteService.get().pipe(
      take(1),
      map((baseSite) => {
        console.log('baseSite', baseSite);

        console.log(
          'baseSite?.baseStore?.paymentProvider',
          baseSite?.baseStore?.paymentProvider
        );
        return baseSite?.baseStore?.paymentProvider;
      })
    );
  }

  getCheckoutFlow(): CheckoutFlow | undefined {
    console.log('getCheckoutFlow', this.paymentProviderName);
    if (this.paymentProviderName) {
      console.log('this.paymentProviderName', this.paymentProviderName);
      const flow =
        this.checkoutConfig.checkout?.flows?.[this.paymentProviderName];
      if (flow) {
        console.log('flow', flow);
        return flow;
      }
    }
    console.log('this.checkoutConfig.checkout', this.checkoutConfig.checkout);
    return this.checkoutConfig.checkout;
  }
}
