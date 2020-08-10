import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { PRODUCT_NORMALIZER } from '../../../../../../../../../projects/core/src/product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { ProductInterestSearchResult } from '../../../../../../../../../projects/core/src/model/product-interest.model';

@Injectable({ providedIn: 'root' })
export class OccUserInterestsNormalizer
  implements
    Converter<Occ.ProductInterestSearchResult, ProductInterestSearchResult> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.ProductInterestSearchResult,
    target?: ProductInterestSearchResult
  ): ProductInterestSearchResult {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    if (source && source.results) {
      target.results = source.results.map((result) => ({
        ...result,
        product: this.converter.convert(result.product, PRODUCT_NORMALIZER),
      }));
    }

    return target;
  }
}
