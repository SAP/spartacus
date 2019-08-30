import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Order } from '../../../model/order.model';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);
