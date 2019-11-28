import { Injectable } from '@angular/core';
import { Converter, ImageType, Product } from '@spartacus/core';
import { MerchandisingProduct } from '../model/strategy-result.model';
@Injectable({ providedIn: 'root' })
export class MerchandisingProductNormalizer
  implements Converter<MerchandisingProduct, Product> {
  convert(source: MerchandisingProduct, target?: Product): Product {
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

    return target;
  }
}
