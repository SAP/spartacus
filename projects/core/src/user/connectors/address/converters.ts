import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Address, AddressValidation } from '../../../model/address.model';

export const ADDRESS_NORMALIZER = new InjectionToken<Converter<any, Address>>(
  'AddressNormalizer'
);

export const ADDRESS_SERIALIZER = new InjectionToken<Converter<Address, any>>(
  'AddressSerializer'
);

export const ADDRESS_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, AddressValidation>
>('AddressValidationNormalizer');
