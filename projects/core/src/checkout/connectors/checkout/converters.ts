import { InjectionToken } from '@angular/core';

import { Order } from '../../../model/order.model';
import { Converter } from '../../../util/converter.service';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);
