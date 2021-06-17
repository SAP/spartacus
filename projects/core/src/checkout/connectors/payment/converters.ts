import { InjectionToken } from '@angular/core';
import { PaymentDetails } from '../../../model/cart.model';
import { Converter } from '../../../util/converter.service';

export const PAYMENT_DETAILS_NORMALIZER = new InjectionToken<
  Converter<any, PaymentDetails>
>('PaymentDetailsNormalizer');
