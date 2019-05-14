import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';

export const ADDRESS_NORMALIZER = new InjectionToken<Converter<any, any>>(
  'AddressNormalizer'
);
