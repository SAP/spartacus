import { InjectionToken } from '@angular/core';
import { Address, AddressValidation } from '../../../model/address.model';
import { EntitiesModel } from '../../../model/misc.model';
import { Converter } from '../../../util/converter.service';

export const ADDRESS_NORMALIZER = new InjectionToken<Converter<any, Address>>(
  'AddressNormalizer'
);

export const ADDRESS_LIST_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<Address>>
>('AddressesNormalizer');

export const ADDRESS_SERIALIZER = new InjectionToken<Converter<Address, any>>(
  'AddressSerializer'
);

export const ADDRESS_VALIDATION_NORMALIZER = new InjectionToken<
  Converter<any, AddressValidation>
>('AddressValidationNormalizer');
