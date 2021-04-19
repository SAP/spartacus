import { InjectionToken } from '@angular/core';
import { ReplenishmentOrder, ScheduleReplenishmentForm } from '@spartacus/core';
import { Converter } from '@spartacus/core';

export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');

export const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken<
  Converter<ScheduleReplenishmentForm, any>
>('ReplenishmentOrderFormSerializer');
