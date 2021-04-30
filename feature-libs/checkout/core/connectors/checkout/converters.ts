import { InjectionToken } from '@angular/core';
import { Order } from '@spartacus/core';
import { PointOfService } from '@spartacus/core';
import { Converter } from '@spartacus/core';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');
