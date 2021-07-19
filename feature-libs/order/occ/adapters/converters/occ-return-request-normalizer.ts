import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { OrderEntry, ReturnRequest } from 'feature-libs/order/root/public_api';

@Injectable({ providedIn: 'root' })
export class OccReturnRequestNormalizer
  implements Converter<Occ.ReturnRequest, ReturnRequest> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.ReturnRequest, target?: ReturnRequest): ReturnRequest {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.returnEntries) {
      target.returnEntries = source.returnEntries.map((entry) => ({
        ...entry,
        orderEntry: this.convertOrderEntry(entry.orderEntry),
      }));
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
