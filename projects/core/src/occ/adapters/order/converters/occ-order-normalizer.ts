import { Injectable } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '../../../../cart/connectors/cart/converters';
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

    const entriesWithPromotions = this.converter.convert(
      target,
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );

    if (source.entries) {
      target.entries = source.entries.map((entry) =>
        this.convertOrderEntry(entry, source.code, entriesWithPromotions)
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
            entriesWithPromotions
          ),
        })),
      }));
    }

    if (source.unconsignedEntries) {
      target.unconsignedEntries = source.unconsignedEntries.map((entry) =>
        this.convertOrderEntry(entry, source.code, entriesWithPromotions)
      );
    }

    return target;
  }

  private convertOrderEntry(
    source?: Occ.OrderEntry,
    code?: string,
    entriesWithPromotions?: OrderEntry[]
  ): OrderEntry {
    return {
      ...source,
      product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
      orderCode: code,
      promotions: entriesWithPromotions?.find(
        (item) => item.entryNumber === source?.entryNumber
      )?.promotions,
    };
  }
}
