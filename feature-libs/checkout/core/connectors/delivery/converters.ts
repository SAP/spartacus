import { InjectionToken } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/main/root';
import { Converter } from '@spartacus/core';

export const DELIVERY_MODE_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode>
>('DeliveryModeNormalizer');
