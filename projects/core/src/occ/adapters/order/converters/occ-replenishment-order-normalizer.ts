import { Injectable } from '@angular/core';
import { ReplenishmentOrder } from '../../../../model/replenishment-order.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import { OrderEntryPromotionsService } from '../../cart/converters/order-entry-promotions-service';

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
