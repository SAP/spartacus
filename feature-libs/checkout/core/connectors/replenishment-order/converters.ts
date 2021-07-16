import { InjectionToken } from '@angular/core';
import { Converter, ScheduleReplenishmentForm } from '@spartacus/core';

export const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken<
  Converter<ScheduleReplenishmentForm, any>
>('ReplenishmentOrderFormSerializer');
