import { ProductSearchPage } from '../../../occ/occ-models/occ.models';
import { Converter } from '../../../util/converter.service';
import { Injectable } from '@angular/core';
import { ProductImageNormalizer } from './product-image-normalizer';

@Injectable()
export class OccProductSearchNormalizer
  implements Converter<ProductSearchPage, ProductSearchPage> {
  constructor(private productImageNormalizer: ProductImageNormalizer) {}

  convert(
    source: ProductSearchPage,
    target: ProductSearchPage = {}
  ): ProductSearchPage {
    target = {
      ...target,
      ...source,
    };
    if (source.products) {
      target.products = source.products.map(product =>
        this.productImageNormalizer.convert(product)
      );
    }
    return target;
  }
}
