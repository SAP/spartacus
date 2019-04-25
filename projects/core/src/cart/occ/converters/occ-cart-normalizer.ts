import { Injectable } from '@angular/core';
import { Cart } from '../../../occ/occ-models';
import { Converter, ConverterService } from '../../../util/converter.service';
import { UICart } from '../../model/cart';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';

@Injectable()
export class OccCartNormalizer implements Converter<Cart, UICart> {
  constructor(private converter: ConverterService) {}

  convert(source: Cart, target?: UICart): UICart {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    if (source && source.entries) {
      target.entries = source.entries.map(entry => ({
        ...entry,
        product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
      }));
    }

    return target;
  }
}
