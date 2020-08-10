import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { Order, OrderEntry } from '../../../../../../../../../projects/core/src/model/order.model';
import { PRODUCT_NORMALIZER } from '../../../../../../../../../projects/core/src/product/connectors/product/converters';

@Injectable({ providedIn: 'root' })
export class OccOrderNormalizer implements Converter<Occ.Order, Order> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.Order, target?: Order): Order {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.entries) {
      target.entries = source.entries.map((entry) =>
        this.convertOrderEntry(entry)
      );
    }

    if (source.consignments) {
      target.consignments = source.consignments.map((consignment) => ({
        ...consignment,
        entries: consignment.entries.map((entry) => ({
          ...entry,
          orderEntry: this.convertOrderEntry(entry.orderEntry),
        })),
      }));
    }

    if (source.unconsignedEntries) {
      target.unconsignedEntries = source.unconsignedEntries.map((entry) =>
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
