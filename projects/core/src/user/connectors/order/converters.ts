import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Order, OrderHistoryList } from '../../../model/order.model';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

export const ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, OrderHistoryList>
>('OrderHistoryNormalizer');
