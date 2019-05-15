import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';

export const USER_PAYMENT_NORMALIZER = new InjectionToken<Converter<any, any>>(
  'UserNormalizer'
);
