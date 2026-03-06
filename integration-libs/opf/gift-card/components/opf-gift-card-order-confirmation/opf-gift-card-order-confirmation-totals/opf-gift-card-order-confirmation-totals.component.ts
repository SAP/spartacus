import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule, NgIf } from '@angular/common';
import { Order, OrderFacade } from '@spartacus/order/root';

import { CartOutlets } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { OutletModule } from '@spartacus/storefront';
import { useFeatureStyles } from '@spartacus/core';

@Component({
  selector: 'cx-opf-gift-card-order-confirmation-totals',
  templateUrl: './opf-gift-card-order-confirmation-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OutletModule, NgIf],
})
export class OpfGiftCardOrderConfirmationTotalsComponent
  implements OnDestroy, OnInit
{
  protected orderFacade = inject(OrderFacade);
  readonly cartOutlets = CartOutlets;
  order$: Observable<Order | undefined> = this.orderFacade.getOrderDetails();

  constructor() {
    useFeatureStyles('a11yWideScreenImprovements');
  }
  ngOnInit() {
    this.order$.subscribe((order) => {
      console.log(
        'Order details in totals component:order confirmation ',
        order
      );
    });
  }
  ngOnDestroy() {
    this.orderFacade.clearPlacedOrder();
  }
}
