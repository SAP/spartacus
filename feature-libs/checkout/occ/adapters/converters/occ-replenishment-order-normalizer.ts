import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  OrderEntry,
  PRODUCT_NORMALIZER,
  ReplenishmentOrder,
} from '@spartacus/core';

@Injectable()
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

    if (source.entries) {
      target.entries = source.entries.map((entry) =>
        this.convertOrderEntry(entry)
      );
    }

    return target;
  }

  private convertOrderEntry(source: Occ.OrderEntry): OrderEntry {
    return {
      ...source,
      product: this.converter.convert(source.product, PRODUCT_NORMALIZER),
    };
  }
}
