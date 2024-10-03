/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  OrderEntry,
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
  PromotionResult,
} from '@spartacus/cart/base/root';
import {
  Converter,
  ConverterService,
  Occ,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';

@Injectable({ providedIn: 'root' })
export class OccOrderNormalizer implements Converter<Occ.Order, Order> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.Order, target?: Order): Order {
    if (target === undefined) {
      target = { ...(source as any) } as Order;
    }

    if (source.entries) {
      target.entries = source.entries.map((entry) =>
        this.convertOrderEntry(
          entry,
          source.code,
          source.appliedProductPromotions
        )
      );
    }

    if (source.consignments) {
      target.consignments = source.consignments.map((consignment) => ({
        ...consignment,
        entries: consignment.entries?.map((entry) => ({
          ...entry,
          orderEntry: this.convertOrderEntry(
            entry.orderEntry,
            source.code,
            source.appliedProductPromotions
          ),
        })),
      }));
    }

    if (source.unconsignedEntries) {
      target.unconsignedEntries = source.unconsignedEntries.map((entry) =>
        this.convertOrderEntry(
          entry,
          source.code,
          source.appliedProductPromotions
        )
      );
    }

    return target;
  }

  private convertOrderEntry(
    source?: Occ.OrderEntry,
    code?: string,
    promotions?: PromotionResult[]
  ): OrderEntry {
    return {
      ...source,
      product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
      orderCode: code,
      promotions: this.converter.convert(
        { item: source, promotions: promotions },
        ORDER_ENTRY_PROMOTIONS_NORMALIZER
      ),
    };
  }
}
