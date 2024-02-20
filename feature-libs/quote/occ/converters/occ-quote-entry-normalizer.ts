/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { OccQuote, Quote } from '@spartacus/quote/root';
import {
  Converter,
  ConverterService,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccQuoteEntryNormalizer implements Converter<OccQuote, Quote> {
  protected converterService = inject(ConverterService);

  convert(source: OccQuote, target?: Quote): Quote {
    if (!target) {
      target = { ...source, allowedActions: [], isEditable: false };
    }

    if (source.entries) {
      target.entries = source.entries.map((entry) => ({
        ...entry,
        quoteCode: source.code,
        product: this.converterService.convert(
          entry.product,
          PRODUCT_NORMALIZER
        ),
      }));
    }
    return target;
  }
}
