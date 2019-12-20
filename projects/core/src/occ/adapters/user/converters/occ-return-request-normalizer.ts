import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { OrderEntry, ReturnRequest } from '../../../../model/order.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';

@Injectable({ providedIn: 'root' })
export class OccReturnRequestNormalizer
  implements Converter<Occ.ReturnRequest, ReturnRequest> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.ReturnRequest, target?: ReturnRequest): ReturnRequest {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source.returnEntries) {
      target.returnEntries = source.returnEntries.map(entry => ({
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
