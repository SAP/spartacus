import { Injectable } from '@angular/core';
import { Converter, ImageType, Product } from '@spartacus/core';
import { MerchandisingProduct } from './../model/strategy.result';
@Injectable()
export class MerchandisingProductConverter
  implements Converter<MerchandisingProduct, Product> {
  convert(source: MerchandisingProduct, target?: Product): Product {
    if (target === undefined) {
      target = { ...(source as any) };
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

    return target;
  }
}
