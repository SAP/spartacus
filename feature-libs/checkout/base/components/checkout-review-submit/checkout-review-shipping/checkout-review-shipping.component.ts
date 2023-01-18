/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkout-review-shipping',
  templateUrl: './checkout-review-shipping.component.html',
})
export class CheckoutReviewShippingComponent implements OnInit {

  get entries$(): Observable<OrderEntry[]> {
    return this.activeCartFacade.getDeliveryEntries();
  }

  constructor(protected activeCartFacade: ActiveCartFacade) { }

  ngOnInit(): void {
  }

}
