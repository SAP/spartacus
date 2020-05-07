import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { PaymentType } from '../../../model/cart.model';

export const PAYMENT_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, PaymentType>
>('PaymentTypeNormalizer');
