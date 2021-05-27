import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  Order,
  OrderEntry,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable()
export class OccOrderNormalizer implements Converter<Occ.Order, Order> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.Order, target?: Order): Order {
    if (target === undefined) {
      target = { ...(source as any) } as Order;
    }

    if (source.entries) {
      target.entries = source.entries.map((entry) =>
        this.convertOrderEntry(entry, source.code)
      );
    }

    if (source.consignments) {
      target.consignments = source.consignments.map((consignment) => ({
        ...consignment,
        entries: consignment.entries?.map((entry) => ({
          ...entry,
          orderEntry: this.convertOrderEntry(entry.orderEntry, source.code),
        })),
      }));
    }

    if (source.unconsignedEntries) {
      target.unconsignedEntries = source.unconsignedEntries.map((entry) =>
        this.convertOrderEntry(entry, source.code)
      );
    }

    return target;
  }

  private convertOrderEntry(
    source?: Occ.OrderEntry,
    code?: string
  ): OrderEntry {
    return {
      ...source,
      product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
      orderCode: code,
    };
  }
}
