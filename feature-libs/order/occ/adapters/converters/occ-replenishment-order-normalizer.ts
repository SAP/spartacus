import { Injectable } from '@angular/core';
import { OrderEntryPromotionsService } from '@spartacus/cart/main/occ';
import {
  Converter,
  ConverterService,
  Occ,
  PRODUCT_NORMALIZER,
  ReplenishmentOrder,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccReplenishmentOrderNormalizer
  implements Converter<Occ.ReplenishmentOrder, ReplenishmentOrder>
{
  constructor(
    private converter: ConverterService,
    private entryPromotionService?: OrderEntryPromotionsService
  ) {}

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
        promotions: this.entryPromotionService
          ? this.entryPromotionService.getProductPromotion(
              entry,
              source.appliedProductPromotions
            )
          : [],
      }));
    }

    return target;
  }
}
