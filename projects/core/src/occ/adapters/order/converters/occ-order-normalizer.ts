import { Injectable } from '@angular/core';
import { PromotionResult } from '../../../../model/cart.model';
import { Order, OrderEntry } from '../../../../model/order.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

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
    appliedProductPromotions?: PromotionResult[]
  ): OrderEntry {
    const orderEntryTarget = {
      ...source,
      product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
      orderCode: code,
    };
    return {
      ...orderEntryTarget,
      promotions: this.getProductPromotion(
        orderEntryTarget,
        appliedProductPromotions
      ),
    };
  }

  protected getProductPromotion(
    item: OrderEntry,
    promotions: PromotionResult[]
  ): PromotionResult[] {
    const entryPromotions: PromotionResult[] = [];
    if (promotions && promotions.length > 0) {
      for (const promotion of promotions) {
        if (
          promotion.description &&
          promotion.consumedEntries &&
          promotion.consumedEntries.length > 0
        ) {
          for (const consumedEntry of promotion.consumedEntries) {
            if (this.isConsumedByEntry(consumedEntry, item)) {
              entryPromotions.push(promotion);
            }
          }
        }
      }
    }
    return entryPromotions;
  }

  protected isConsumedByEntry(consumedEntry: any, entry: any): boolean {
    const consumedEntryNumber = consumedEntry.orderEntryNumber;
    if (entry.entries && entry.entries.length > 0) {
      for (const subEntry of entry.entries) {
        if (subEntry.entryNumber === consumedEntryNumber) {
          return true;
        }
      }
      return false;
    } else {
      return consumedEntryNumber === entry.entryNumber;
    }
  }
}
