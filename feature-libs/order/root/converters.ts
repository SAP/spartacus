import { InjectionToken } from '@angular/core';
import { Converter, Order, ReplenishmentOrder } from '@spartacus/core';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

export const REPLENISHMENT_ORDER_NORMALIZER = new InjectionToken<
  Converter<any, ReplenishmentOrder>
>('ReplenishmentOrderNormalizer');
