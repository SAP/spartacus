/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf-checkout-payment-and-review',
  templateUrl: './opf-checkout-payment-and-review.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OPFCheckoutPaymentAndReviewComponent {
  constructor(protected activeCartService: ActiveCartFacade) {}

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.activeCartService
      .getActive()
      .pipe(map((cart) => cart.paymentType));
  }
}
