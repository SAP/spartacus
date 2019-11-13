import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Injectable } from '@angular/core';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ProductSearchPage } from '../../../../model/product-search.model';

@Injectable({ providedIn: 'root' })
export class OccProductSearchPageNormalizer
  implements Converter<Occ.ProductSearchPage, ProductSearchPage> {
  constructor(private converterService: ConverterService) {}

  convert(
    source: Occ.ProductSearchPage,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    target = {
      ...target,
      ...(source as any),
    };
    if (source.products) {
      target.products = source.products.map(product =>
        this.converterService.convert(product, PRODUCT_NORMALIZER)
      );
    }
    return target;
  }
}
