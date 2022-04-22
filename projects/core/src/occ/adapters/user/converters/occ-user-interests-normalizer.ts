import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { ProductInterestSearchResult } from '../../../../model/product-interest.model';

@Injectable({ providedIn: 'root' })
export class OccUserInterestsNormalizer
  implements
    Converter<Occ.ProductInterestSearchResult, ProductInterestSearchResult>
{
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
