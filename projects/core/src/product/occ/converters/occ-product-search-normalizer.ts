import { ProductSearchPage } from '../../../occ/occ-models/occ.models';
import { Converter, ConverterService } from '../../../util/converter.service';
import { Injectable } from '@angular/core';
import { UIProductSearchPage } from '../../model/product-search-page';
import { PRODUCT_NORMALIZER } from '../../connectors/product/converters';

@Injectable()
export class OccProductSearchNormalizer
  implements Converter<ProductSearchPage, UIProductSearchPage> {
  constructor(private converterService: ConverterService) {}

  convert(
    source: ProductSearchPage,
    target: UIProductSearchPage = {}
  ): UIProductSearchPage {
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
