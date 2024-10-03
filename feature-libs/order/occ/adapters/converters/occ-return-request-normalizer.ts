/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  Converter,
  ConverterService,
  Occ,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { ReturnRequest } from '@spartacus/order/root';

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
