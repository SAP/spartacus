import { Injectable } from '@angular/core';
import { B2B_ADDRESS_NORMALIZER } from '../../../../connectors/org-unit/converters';
import {
  Converter,
  Occ,
  EntitiesModel,
  B2BAddress,
  ConverterService,
} from '@spartacus/core';

@Injectable()
export class OccOrgUnitAddressListNormalizer
  implements Converter<Occ.B2BAddressList, EntitiesModel<B2BAddress>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.B2BAddressList,
    target?: EntitiesModel<B2BAddress>
  ): EntitiesModel<B2BAddress> {
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
