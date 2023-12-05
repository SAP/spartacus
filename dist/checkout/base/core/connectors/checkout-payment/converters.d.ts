import { InjectionToken } from '@angular/core';
import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
export declare const PAYMENT_DETAILS_SERIALIZER: InjectionToken<Converter<PaymentDetails, any>>;
export declare const PAYMENT_CARD_TYPE_NORMALIZER: InjectionToken<Converter<any, CardType>>;
