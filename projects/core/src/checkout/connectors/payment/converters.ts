import { InjectionToken } from '@angular/core';

import { CardType, PaymentDetails } from '../../../model/cart.model';
import { Converter } from '../../../util/converter.service';

export const PAYMENT_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, PaymentDetails>
>('PaymentDetailsNormalizer');

export const PAYMENT_DETAILS_SERIALIZER = new InjectionToken<
  Converter<PaymentDetails, any>
>('PaymentDetailsSerializer');

export const CARD_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, CardType>
>('CardTypeNormalizer');
