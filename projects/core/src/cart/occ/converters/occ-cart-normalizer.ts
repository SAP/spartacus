import { Injectable } from '@angular/core';
import { Converter, ConverterService } from '../../../util/converter.service';
import { PRODUCT_NORMALIZER } from '../../../product/connectors/product/converters';
import { Cart } from '../../../model/cart.model';
import { Occ } from '../../../occ/occ-models/occ.models';

@Injectable()
export class OccCartNormalizer implements Converter<Occ.Cart, Cart> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.Cart, target?: Cart): Cart {
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
