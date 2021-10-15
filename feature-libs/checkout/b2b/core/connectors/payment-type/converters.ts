import { InjectionToken } from '@angular/core';
import { Converter, PaymentType } from '@spartacus/core';

export const CHECKOUT_PAYMENT_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, PaymentType>
>('CheckoutPaymentTypeNormalizer');
