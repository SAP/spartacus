import { InjectionToken } from '@angular/core';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';
import { Converter } from '../../../util/converter.service';

export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken<
  Converter<ScheduleReplenishmentForm, any>
>('ReplenishmentOrderFormSerializer');
