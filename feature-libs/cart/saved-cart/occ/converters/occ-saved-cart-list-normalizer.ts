import { Injectable } from '@angular/core';
import {
  Cart,
  CART_NORMALIZER,
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccSavedCartListNormalizer
  implements Converter<Occ.CartList, EntitiesModel<Cart>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.CartList,
    target?: EntitiesModel<Cart>
  ): EntitiesModel<Cart> {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.values = source.carts.map((cart) => ({
      ...this.converter.convert(cart, CART_NORMALIZER),
    }));
    return target;
  }
}
