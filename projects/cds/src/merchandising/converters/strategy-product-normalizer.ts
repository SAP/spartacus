import { Injectable } from '@angular/core';
import { Converter, ImageType } from '@spartacus/core';
import { MerchandisingProduct } from '../model/merchandising-products.model';
import { StrategyProduct } from '../model/strategy-result.model';
@Injectable({ providedIn: 'root' })
export class StrategyProductNormalizer
  implements Converter<StrategyProduct, MerchandisingProduct> {
  convert(
    source: StrategyProduct,
    target?: MerchandisingProduct
  ): MerchandisingProduct {
    if (target === undefined) {
      target = {};
    }

    target.code = source.id;
    target.name = source.name;
    target.images = {
      PRIMARY: {
        product: {
          url: source.mainImage,
          format: 'product',
          imageType: ImageType.PRIMARY,
        },
      },
    };

    if (source.price) {
      target.price = {
        formattedValue: source.price.toString(),
        value: source.price,
      };
    }

    target.metadata = source.metadata
      ? new Map<string, string>(Object.entries(source.metadata))
      : undefined;

    return target;
  }
}
