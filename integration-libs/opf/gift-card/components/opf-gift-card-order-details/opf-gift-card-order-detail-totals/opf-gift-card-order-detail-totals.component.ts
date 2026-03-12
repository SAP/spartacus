import { ActiveCartFacade, CartOutlets } from '@spartacus/cart/base/root';
/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { OpfGiftCardOrderSummaryComponent } from '../../opf-gift-card-order-summary';
import { OrderDetailsService } from '@spartacus/order/components';
import { OutletModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-opf-gift-card-order-detail-totals',
  templateUrl: './opf-gift-card-order-detail-totals.component.html',
  imports: [ CommonModule, OutletModule, NgIf, OpfGiftCardOrderSummaryComponent],
})
export class OpfGiftCardOrderDetailTotalsComponent implements OnInit {
  protected activeCartFacade = inject(ActiveCartFacade);
  protected orderDetailsService = inject(OrderDetailsService);
  cartOutlets = CartOutlets;
  order$: Observable<any>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.order$.subscribe((order) => {
      console.log('Order details in totals component: ', order);
    });
  }
}
