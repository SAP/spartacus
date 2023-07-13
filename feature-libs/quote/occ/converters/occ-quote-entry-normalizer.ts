/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OccQuote, Quote } from '@spartacus/quote/root';
import {
  Converter,
  ConverterService,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccQuoteEntryNormalizer implements Converter<OccQuote, Quote> {
  constructor(private converter: ConverterService) {}

  convert(source: OccQuote, target?: Quote): Quote {
    if (!target) {
      target = { ...source, allowedActions: [], isEditable: false };
    }

    if (source.entries) {
      target.entries = source.entries.map((entry) => ({
        ...entry,
        product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
      }));
    }
    return target;
  }
}
