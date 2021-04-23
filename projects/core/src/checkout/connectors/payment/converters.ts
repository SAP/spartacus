import { InjectionToken } from '@angular/core';
import { CardType, PaymentDetails } from '../../../model/cart.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PAYMENT_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, PaymentDetails>
>('PaymentDetailsNormalizer');

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const PAYMENT_DETAILS_SERIALIZER = new InjectionToken<
  Converter<PaymentDetails, any>
>('PaymentDetailsSerializer');

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CARD_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, CardType>
>('CardTypeNormalizer');
