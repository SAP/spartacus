import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Order } from '../../../model/order.model';
import { PointOfService } from '../../../model/point-of-service.model';

export const ORDER_NORMALIZER = new InjectionToken<Converter<any, Order>>(
  'OrderNormalizer'
);

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');
