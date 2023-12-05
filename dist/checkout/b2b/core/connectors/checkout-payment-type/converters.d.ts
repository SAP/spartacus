import { InjectionToken } from '@angular/core';
import { PaymentType } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
export declare const CHECKOUT_PAYMENT_TYPE_NORMALIZER: InjectionToken<Converter<any, PaymentType>>;
