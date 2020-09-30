import { Injectable } from '@angular/core';
import {
  Address,
  ADDRESS_NORMALIZER,
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';

@Injectable()
export class OccOrgUnitAddressListNormalizer
  implements Converter<Occ.B2BAddressList, EntitiesModel<Address>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.B2BAddressList,
    target?: EntitiesModel<Address>
  ): EntitiesModel<Address> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.addresses.map((address) => ({
          ...this.converter.convert(address, ADDRESS_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
