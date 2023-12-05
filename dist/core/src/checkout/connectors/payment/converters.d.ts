import { InjectionToken } from '@angular/core';
import { PaymentDetails } from '../../../model/payment.model';
import { Converter } from '../../../util/converter.service';
export declare const PAYMENT_DETAILS_NORMALIZER: InjectionToken<Converter<any, PaymentDetails>>;
