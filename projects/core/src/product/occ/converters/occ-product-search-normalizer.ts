import { ProductSearchPage } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';
import { Injectable } from '@angular/core';
import { ProductImageNormalizer } from './product-image-normalizer';
import { UIProductSearchPage } from '../../model/product-search-page';

@Injectable()
export class OccProductSearchNormalizer
  implements Converter<ProductSearchPage, UIProductSearchPage> {
  constructor(private productImageNormalizer: ProductImageNormalizer) {}

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
        this.productImageNormalizer.convert(product)
      );
    }
    return target;
  }
}
