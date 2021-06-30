import { InjectionToken } from '@angular/core';
import { DeliveryMode } from '@spartacus/core';
import { Converter } from '@spartacus/core';

export const DELIVERY_MODE_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode>
>('DeliveryModeNormalizer');
