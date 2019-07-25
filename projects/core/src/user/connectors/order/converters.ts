import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { OrderHistoryList } from '../../../model/order.model';

export const ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, OrderHistoryList>
>('OrderHistoryNormalizer');
