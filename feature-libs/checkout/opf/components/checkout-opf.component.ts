/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-opf',
  templateUrl: './checkout-opf.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOPFComponent {
  constructor(protected activeCartFacade: ActiveCartFacade) {}

  get paymentType$(): Observable<PaymentType | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.paymentType));
  }
}
