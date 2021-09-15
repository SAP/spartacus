import { InjectionToken } from '@angular/core';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const REPLENISHMENT_ORDER_HISTORY_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrderList>
>('ReplenishmentOrderHistoryNormalizer');
