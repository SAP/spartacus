import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { B2BAddress } from '../../../../model/org-unit.model';
import { EntitiesModel } from '../../../../model/misc.model';
import { B2B_ADDRESS_NORMALIZER } from '../../../../organization/connectors/org-unit/converters';

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
