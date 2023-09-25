/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseSiteService } from '@spartacus/core';
import { Observable } from 'rxjs';
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
    return this.paymentProviderName
      ? this.checkoutConfig.checkout?.flows?.[this.paymentProviderName]
      : undefined;
  }
}
