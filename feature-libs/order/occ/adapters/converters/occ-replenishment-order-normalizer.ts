import { Injectable } from '@angular/core';
import { ORDRE_ENTRY_PROMOTIONS_NORMALIZER } from '@spartacus/cart/main/root';
import {
  Converter,
  ConverterService,
  Occ,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';

@Injectable({ providedIn: 'root' })
export class OccReplenishmentOrderNormalizer
  implements Converter<Occ.ReplenishmentOrder, ReplenishmentOrder>
{
  constructor(
    private converter: ConverterService
  ) //private entryPromotionService?: OrderEntryPromotionsService
  {}

  convert(
    source: Occ.ReplenishmentOrder,
    target?: ReplenishmentOrder
  ): ReplenishmentOrder {
    if (target === undefined) {
      target = { ...(source as any) } as ReplenishmentOrder;
    }

    if (source.entries) {
      target.entries = source.entries.map((entry) => ({
        ...entry,
        product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
        promotions: this.converter.convert(
          { item: entry, promotions: source.appliedProductPromotions },
          ORDRE_ENTRY_PROMOTIONS_NORMALIZER
        ),
      }));
    }

    return target;
  }
}
