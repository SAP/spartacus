import { InjectionToken } from '@angular/core';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';
import { Converter } from '../../../util/converter.service';

export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');

export const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken<
  Converter<ScheduleReplenishmentForm, any>
>('ReplenishmentOrderFormSerializer');
