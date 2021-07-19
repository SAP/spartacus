import { InjectionToken } from '@angular/core';
import { Order } from '../../../model/order.model';
import { PointOfService } from '../../../model/point-of-service.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 4.1 - use order lib instead
 */
export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');
