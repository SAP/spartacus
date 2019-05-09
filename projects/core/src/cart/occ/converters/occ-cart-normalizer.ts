import { Injectable } from '@angular/core';
import { Occ } from '../../../occ/occ-models';
import { Converter, ConverterService } from '../../../util/converter.service';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { UICart } from '../../../model/cart.model';

@Injectable()
export class OccCartNormalizer implements Converter<Occ.Cart, UICart> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.Cart, target?: UICart): UICart {
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
