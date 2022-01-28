import { InjectionToken } from '@angular/core';
import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';

export const PAYMENT_DETAILS_SERIALIZER = new InjectionToken<
  Converter<PaymentDetails, any>
>('PaymentDetailsSerializer');

export const CARD_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, CardType>
>('CardTypeNormalizer');
