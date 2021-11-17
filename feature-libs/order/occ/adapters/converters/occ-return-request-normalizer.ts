import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  OrderEntry,
  PRODUCT_NORMALIZER,
  ReturnRequest,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccReturnRequestNormalizer
  implements Converter<Occ.ReturnRequest, ReturnRequest>
{
  constructor(private converter: ConverterService) {}

  convert(source: Occ.ReturnRequest, target?: ReturnRequest): ReturnRequest {
    if (target === undefined) {
      target = { ...(source as any) } as ReturnRequest;
    }

    if (source.returnEntries) {
      target.returnEntries = source.returnEntries.map((entry) => ({
        ...entry,
        orderEntry: this.convertOrderEntry(entry.orderEntry),
      }));
    }

    return target;
  }

  private convertOrderEntry(source?: Occ.OrderEntry): OrderEntry {
    return {
      ...source,
      product: this.converter.convert(source?.product, PRODUCT_NORMALIZER),
    };
  }
}
