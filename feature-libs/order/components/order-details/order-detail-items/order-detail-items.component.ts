/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import {
  AbstractOrderType,
  CartOutlets,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { CmsOrderDetailItemsComponent } from '@spartacus/core';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MyAccountV2OrderConsignmentsService } from '../my-account-v2-order-consignments.service';
import { OrderDetailsService } from '../order-details.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { PromotionsComponent } from '../../../../../projects/storefrontlib/cms-components/misc/promotions/promotions.component';
import { OrderConsignedEntriesComponent } from './order-consigned-entries/order-consigned-entries.component';
import { OutletDirective } from '../../../../../projects/storefrontlib/cms-structure/outlet/outlet.directive';
import { AbstractOrderContextDirective } from '../../../../cart/base/components/abstract-order-context/abstract-order-context.directive';
import { AddToCartComponent } from '../../../../cart/base/components/add-to-cart/add-to-cart.component';
import { TranslatePipe } from '../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-order-details-items',
    templateUrl: './order-detail-items.component.html',
    imports: [
        NgIf,
        PromotionsComponent,
        OrderConsignedEntriesComponent,
        OutletDirective,
        AbstractOrderContextDirective,
        AddToCartComponent,
        AsyncPipe,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class OrderDetailItemsComponent {
  protected orderConsignmentsService = inject(
    MyAccountV2OrderConsignmentsService
  );
  readonly OrderOutlets = OrderOutlets;
  readonly CartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;

  promotionLocation: PromotionLocation = PromotionLocation.Order;

  pickupConsignments: Consignment[] | undefined;
  deliveryConsignments: Consignment[] | undefined;

  pickupUnconsignedEntries: OrderEntry[] | undefined;
  deliveryUnConsignedEntries: OrderEntry[] | undefined;

  order$: Observable<Order> = this.orderDetailsService.getOrderDetails().pipe(
    tap((order) => {
      this.pickupConsignments = this.getGroupedConsignments(order, true);
      this.deliveryConsignments = this.getGroupedConsignments(order, false);

      this.pickupUnconsignedEntries = this.getUnconsignedEntries(order, true);
      this.deliveryUnConsignedEntries = this.getUnconsignedEntries(
        order,
        false
      );
    })
  );

  enableAddToCart$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.enableAddToCart)
  );

  isOrderLoading$: Observable<boolean> =
    typeof this.orderDetailsService.isOrderDetailsLoading === 'function'
      ? this.orderDetailsService.isOrderDetailsLoading()
      : of(false);

  groupCartItems$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.groupCartItems)
  );

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>
  ) {}

  protected getGroupedConsignments(
    order: Order,
    pickup: boolean
  ): Consignment[] | undefined {
    return this.orderConsignmentsService.getGroupedConsignments(order, pickup);
  }

  protected getUnconsignedEntries(
    order: Order,
    pickup: boolean
  ): OrderEntry[] | undefined {
    return this.orderConsignmentsService.getUnconsignedEntries(order, pickup);
  }
}
