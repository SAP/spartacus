/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  CartOutlets,
  DeliveryMode,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  Address,
  CmsOrderDetailItemsComponent,
  TranslationService,
} from '@spartacus/core';
import { Consignment, Order } from '@spartacus/order/root';
import { Card, CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';
import {
  cancelledValues,
  completedValues,
} from './order-consigned-entries/order-consigned-entries.model';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent {
  readonly CartOutlets = CartOutlets;

  promotionLocation: PromotionLocation = PromotionLocation.Order;
  order$: Observable<Order> = this.orderDetailsService.getOrderDetails();

  enableAddToCart$: Observable<boolean | undefined> = this.component.data$.pipe(
    map((data) => data.enableAddToCart)
  );

  pickupConsignments$ = this.order$.pipe(
    map((order) =>
      order.consignments?.filter(
        (entry) => entry.deliveryPointOfService !== undefined
      )
    ),
    map((conginments) => this.groupConsignments(conginments))
  );

  deliveryConsignments$ = this.order$.pipe(
    map((order) =>
      order.consignments?.filter(
        (entry) => entry.deliveryPointOfService === undefined
      )
    ),
    map((conginments) => this.groupConsignments(conginments))
  );

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>,
    protected translation: TranslationService
  ) {}

  protected groupConsignments(
    consignments: Consignment[] | undefined
  ): Consignment[] | undefined {
    const grouped = consignments?.reduce((result, current) => {
      const key = this.getStatusGroupKey(current.status || '');
      result[key] = result[key] || [];
      result[key].push(current);
      return result;
    }, {} as { [key: string]: Consignment[] });

    return grouped
      ? [...(grouped[1] || []), ...(grouped[0] || []), ...(grouped[-1] || [])]
      : undefined;
  }

  /**
   * complete: 0
   * processing: 1
   * cancel: -1
   */
  private getStatusGroupKey(status: string): number {
    if (completedValues.includes(status)) {
      return 0;
    }
    if (cancelledValues.includes(status)) {
      return -1;
    }
    return 1;
  }

  getAddressCardContent(deliveryAddress: Address): Observable<Card> {
    return this.translation.translate('addressCard.shipTo').pipe(
      filter(() => Boolean(deliveryAddress)),
      map((textTitle) => {
        const formattedAddress = this.normalizeFormattedAddress(
          deliveryAddress.formattedAddress ?? ''
        );

        return {
          title: textTitle,
          textBold: `${deliveryAddress.firstName} ${deliveryAddress.lastName}`,
          text: [formattedAddress, deliveryAddress.country?.name],
        } as Card;
      })
    );
  }

  getDeliveryModeCardContent(deliveryMode: DeliveryMode): Observable<Card> {
    return this.translation.translate('orderDetails.shippingMethod').pipe(
      filter(() => Boolean(deliveryMode)),
      map(
        (textTitle) =>
          ({
            title: textTitle,
            textBold: deliveryMode.name,
            text: [
              deliveryMode.description,
              deliveryMode.deliveryCost?.formattedValue
                ? deliveryMode.deliveryCost?.formattedValue
                : '',
            ],
          } as Card)
      )
    );
  }

  private normalizeFormattedAddress(formattedAddress: string): string {
    const addresses = formattedAddress
      .split(',')
      .map((address) => address.trim());

    const newFormattedAddress = addresses.filter(Boolean).join(', ');

    return newFormattedAddress;
  }
}
