import { Injectable } from '@angular/core';
import { Quote } from '@spartacus/commerce-quotes/root';
import {
  Converter,
  ConverterService,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccQuoteEntryNormalizer implements Converter<Quote, Quote> {
  constructor(private converter: ConverterService) {}

  convert(source: Quote, target?: Quote): Quote {
    if (target === undefined) {
      target = { ...(source as any) } as Quote;
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
