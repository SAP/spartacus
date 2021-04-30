import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Order } from '../../../model/order.model';
import { PointOfService } from '../../../model/point-of-service.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');
