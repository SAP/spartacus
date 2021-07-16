import { InjectionToken } from '@angular/core';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');
