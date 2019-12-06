import { InjectionToken } from '@angular/core';

import { DeliveryMode } from '../../../model/order.model';
import { Converter } from '../../../util/converter.service';

export const DELIVERY_MODE_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode>
>('DeliveryModeNormalizer');
