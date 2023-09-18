/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseSiteService } from '@spartacus/core';
import { map, take } from 'rxjs/operators';
import { CheckoutConfig } from '../../root/config';
import { CheckoutFlow } from '../../root/model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFlowOrchestratorService {
  constructor(
    protected checkoutConfig: CheckoutConfig,
    protected baseSiteService: BaseSiteService
  ) {
    this.getPaymentProvider();
  }

  protected defaultPaymentProvider = 'spa-opf';

  protected paymentProvider = this.defaultPaymentProvider;

  protected getPaymentProvider() {
    this.baseSiteService
      .get()
      .pipe(
        take(1),
        map((baseSite) => baseSite?.baseStore?.paymentProvider)
      )
      .subscribe(
        (value) => (this.paymentProvider = value || this.defaultPaymentProvider)
      );
  }

  getCheckoutFlow(): CheckoutFlow | undefined {
    return this.checkoutConfig.checkout?.flows?.[this.paymentProvider];
  }

  getCheckoutFlowName(): string {
    return this.paymentProvider;
  }
}
