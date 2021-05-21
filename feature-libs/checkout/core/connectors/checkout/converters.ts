import { InjectionToken } from '@angular/core';
import { Converter, Order } from '@spartacus/core';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);
