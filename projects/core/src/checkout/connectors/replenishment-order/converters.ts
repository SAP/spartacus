import { InjectionToken } from '@angular/core';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { Converter } from '../../../util/converter.service';

export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');
