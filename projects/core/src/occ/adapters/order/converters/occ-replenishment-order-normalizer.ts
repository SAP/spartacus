import { Injectable } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '../../../../cart/connectors/cart/converters';
import { OrderEntry } from '../../../../model/order.model';
import { ReplenishmentOrder } from '../../../../model/replenishment-order.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
@Injectable({ providedIn: 'root' })
export class OccReplenishmentOrderNormalizer
  implements Converter<Occ.ReplenishmentOrder, ReplenishmentOrder> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.ReplenishmentOrder,
    target?: ReplenishmentOrder
  ): ReplenishmentOrder {
    if (target === undefined) {
      target = { ...(source as any) } as ReplenishmentOrder;
    }

    const entriesWithPromotions = this.converter.convert(
      target,
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );

    if (source.entries) {
      target.entries = source.entries.map((entry) =>
        this.convertOrderEntry(entry, entriesWithPromotions)
      );
    }

    return target;
  }

  private convertOrderEntry(
    source: Occ.OrderEntry,
    entriesWithPromotions: OrderEntry[]
  ): OrderEntry {
    return {
      ...source,
      product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
      promotions: entriesWithPromotions.find(
        (item) => item.entryNumber === source.entryNumber
      )?.promotions,
    };
  }
}
