import { InjectionToken } from '@angular/core';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { Converter } from '../../../util/converter.service';

export const REPLENISHMENT_ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrderList>
>('ReplenishmentOrderHistoryNormalizer');
