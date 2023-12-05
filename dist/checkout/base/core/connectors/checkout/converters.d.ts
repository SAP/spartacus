import { InjectionToken } from '@angular/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { Converter } from '@spartacus/core';
export declare const CHECKOUT_NORMALIZER: InjectionToken<Converter<any, CheckoutState>>;
