import { Injectable } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '../../../../cart/connectors/cart/converters';
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

    target.entries = entriesWithPromotions.map((entry) => ({
      ...entry,
      product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
    }));

    return target;
  }
}
