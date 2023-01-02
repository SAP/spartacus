/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { CartOutlets, PromotionLocation } from '@spartacus/cart/base/root';
import { Consignment, Order } from '@spartacus/order/root';
import {
  CmsOrderDetailItemsComponent,
  TranslationService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';
import {
  cancelledValues,
  completedValues,
} from './order-consigned-entries/order-consigned-entries.model';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>,
    protected translation: TranslationService
  ) {}

  readonly CartOutlets = CartOutlets;

  promotionLocation: PromotionLocation = PromotionLocation.Order;
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();
  others$: Observable<Consignment[] | undefined>;
  completed$: Observable<Consignment[] | undefined>;
  cancel$: Observable<Consignment[] | undefined>;
  buyItAgainTranslation$: Observable<string>;
  enableAddToCart$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.enableAddToCart)
  );

  ngOnInit() {
    this.others$ = this.getOtherStatus(...completedValues, ...cancelledValues);
    this.completed$ = this.getExactStatus(completedValues);
    this.cancel$ = this.getExactStatus(cancelledValues);
    this.buyItAgainTranslation$ = this.translation.translate(
      'addToCart.buyItAgain'
    );
  }

  private getExactStatus(
    consignmentStatus: string[]
  ): Observable<Consignment[] | undefined> {
    return this.order$.pipe(
      map((order) => {
        if (Boolean(order.consignments)) {
          return order.consignments?.filter(
            (consignment) =>
              consignment.status &&
              consignmentStatus.includes(consignment.status)
          );
        }
      })
    );
  }

  private getOtherStatus(
    ...consignmentStatus: string[]
  ): Observable<Consignment[] | undefined> {
    return this.order$.pipe(
      map((order) => {
        if (Boolean(order.consignments)) {
          return order.consignments?.filter(
            (consignment) =>
              consignment.status &&
              !consignmentStatus.includes(consignment.status)
          );
        }
      })
    );
  }
}
