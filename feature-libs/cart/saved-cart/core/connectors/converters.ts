import { InjectionToken } from '@angular/core';
import { Cart, Converter, EntitiesModel } from '@spartacus/core';

export const SAVED_CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'SavedCartNormalizer'
);

export const SAVED_CARTS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<Cart>>
>('SavedCartListNormalizer');
