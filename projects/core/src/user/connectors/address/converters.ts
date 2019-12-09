import { InjectionToken } from '@angular/core';

import { Address, AddressValidation } from '../../../model/address.model';
import { Converter } from '../../../util/converter.service';

export const ADDRESS_NORMALIZER = new InjectionToken<Converter<any, Address>>(
  'AddressNormalizer'
);

export const ADDRESS_SERIALIZER = new InjectionToken<Converter<Address, any>>(
  'AddressSerializer'
);

export const ADDRESS_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, AddressValidation>
>('AddressValidationNormalizer');
