import { InjectionToken } from '@angular/core';
import { PaymentType } from '@spartacus/core';
import { Converter } from '@spartacus/core';

export const PAYMENT_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, PaymentType>
>('PaymentTypeNormalizer');
