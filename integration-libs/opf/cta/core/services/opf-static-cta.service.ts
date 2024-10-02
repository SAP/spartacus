/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import { CtaScriptsLocation, CtaScriptsRequest } from '@spartacus/opf/cta/root';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { filter, map, Observable } from 'rxjs';

@Injectable()
export class OpfStaticCtaService {
  protected orderDetailsService = inject(OrderFacade);
  protected orderHistoryService = inject(OrderHistoryFacade);

  fillCtaRequestforPagesWithOrder(
    scriptLocation: CtaScriptsLocation
  ): Observable<CtaScriptsRequest> {
    return this.getOrderDetails(scriptLocation).pipe(
      map((order) => {
        if (!order?.paymentInfo?.id) {
          throw new Error('OrderPaymentInfoId missing');
        }
        const ctaScriptsRequest: CtaScriptsRequest = {
          cartId: order?.paymentInfo?.id,
          ctaProductItems: this.getProductItems(order as Order),
          scriptLocations: [scriptLocation],
        };

        return ctaScriptsRequest;
      })
    );
  }

  protected getOrderDetails(
    scriptsLocation: CtaScriptsLocation
  ): Observable<Order> {
    const order$ =
      scriptsLocation === CtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
        ? this.orderDetailsService.getOrderDetails()
        : this.orderHistoryService.getOrderDetails();
    return order$.pipe(
      filter((order) => !!order?.entries)
    ) as Observable<Order>;
  }

  protected getProductItems(
    order: Order
  ): { productId: string; quantity: number }[] | [] {
    return (order.entries as OrderEntry[])
      .filter((item) => {
        return !!item?.product?.code && !!item?.quantity;
      })
      .map((item) => {
        return {
          productId: item.product?.code as string,
          quantity: item.quantity as number,
        };
      });
  }
}
