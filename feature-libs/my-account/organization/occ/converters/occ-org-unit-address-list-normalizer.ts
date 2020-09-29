import { Injectable } from '@angular/core';
import {
  Address,
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import { B2B_ADDRESS_NORMALIZER } from '@spartacus/my-account/organization/core';

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
          ...this.converter.convert(address, B2B_ADDRESS_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
