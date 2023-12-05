import { InjectionToken } from '@angular/core';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { Converter } from '@spartacus/core';
import { DpPaymentRequest } from '../models';
export declare const DP_DETAILS_NORMALIZER: InjectionToken<Converter<any, PaymentDetails>>;
export declare const DP_REQUEST_NORMALIZER: InjectionToken<Converter<any, DpPaymentRequest>>;
