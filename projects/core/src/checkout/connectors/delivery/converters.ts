import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { DeliveryMode } from '../../../model/order.model';

export const DELIVERY_MODE_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode>
>('DeliveryModeNormalizer');
