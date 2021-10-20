import { Injectable } from '@angular/core';
import { PromotionResult } from '@spartacus/cart/main/root';
import {
  Converter,
  ConverterService,
  Occ,
  Order,
  OrderEntry,
  OrderEntryPromotionsService,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccOrderNormalizer implements Converter<Occ.Order, Order> {
  constructor(
    private converter: ConverterService,
    private entryPromotionService?: OrderEntryPromotionsService
  ) {}

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
      promotions: this.entryPromotionService
        ? this.entryPromotionService.getProductPromotion(source, promotions)
        : [],
    };
  }
}
