import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Address, DeliveryMode } from '../../../occ/occ-models/occ.models';

export const DELIVERY_ADDRESS_NORMALIZER = new InjectionToken<
  Converter<any, Address>
>('DeliveryAddressNormalizer');

export const DELIVERY_ADDRESS_SERIALIZER = new InjectionToken<
  Converter<Address, any>
>('DeliveryAddressSerializer');

export const DELIVERY_MODE_NORMALIZER = new InjectionToken<
  Converter<any, DeliveryMode>
>('DeliveryModeNormalizer');
