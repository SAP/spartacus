import { InjectionToken } from '@angular/core';
import { Cart } from '../../../model/cart.model';
import { OrderEntry } from '../../../model/order.model';
import { Converter } from '../../../util/converter.service';

export const CART_NORMALIZER = new InjectionToken<Converter<any, Cart>>(
  'CartNormalizer'
);

export const ORDER_ENTRY_PROMOTIONS_NORMALIZER = new InjectionToken<
  Converter<any, OrderEntry[]>
>('OrderEntryPromotionsNormalizer');
