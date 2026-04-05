/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveCartFacade, CartOutlets } from '@spartacus/cart/base/root';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { OpfGiftCardOrderSummaryComponent } from '../../opf-gift-card-order-summary/opf-gift-card-order-summary.component';
import { OrderDetailsService } from '@spartacus/order/components';
import { OutletModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-gift-card-order-detail-totals',
  templateUrl: './opf-gift-card-order-detail-totals.component.html',
  imports: [CommonModule, OutletModule, NgIf, OpfGiftCardOrderSummaryComponent],
})
export class OpfGiftCardOrderDetailTotalsComponent implements OnInit {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected orderDetailsService = inject(OrderDetailsService);
  cartOutlets = CartOutlets;
  order$: Observable<any>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
