/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-review-overview',
  templateUrl: './checkout-review-overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutReviewOverviewComponent {
  constructor(protected activeCartFacade: ActiveCartFacade) {}

  get cart$(): Observable<Cart> {
    return this.activeCartFacade.getActive();
  }
}
