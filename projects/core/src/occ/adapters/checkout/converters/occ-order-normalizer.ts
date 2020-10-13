import { Injectable } from '@angular/core';
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
