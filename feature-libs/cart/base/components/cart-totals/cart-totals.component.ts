/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { OrderSummaryComponent } from '../cart-shared';

@Component({
  selector: 'cx-cart-totals',
  templateUrl: './cart-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OrderSummaryComponent, AsyncPipe, NgIf],
})
export class CartTotalsComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(protected activeCartService: ActiveCartFacade) {}

  ngOnInit() {
    this.cart$ = this.activeCartService.getActive();
  }
}
