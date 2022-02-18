import { InjectionToken } from '@angular/core';
import { ScheduleReplenishmentForm } from '@spartacus/checkout/scheduled-replenishment/root';
import { Converter } from '@spartacus/core';

export const REPLENISHMENT_ORDER_FORM_SERIALIZER = new InjectionToken<
  Converter<ScheduleReplenishmentForm, any>
>('ReplenishmentOrderFormSerializer');
