import { InjectionToken } from '@angular/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { Converter } from '@spartacus/core';

export const CHECKOUT_NORMALIZER = new InjectionToken<
  Converter<any, CheckoutState>
>('CheckoutNormalizer');
