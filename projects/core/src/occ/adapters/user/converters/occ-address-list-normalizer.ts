import { Injectable } from '@angular/core';
import { Address } from '../../../../model/address.model';
import { EntitiesModel } from '../../../../model/misc.model';
import { ADDRESS_NORMALIZER } from '../../../../user/connectors/address/converters';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class OccAddressListNormalizer
  implements Converter<Occ.AddressList, EntitiesModel<Address>>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.AddressList,
    target?: EntitiesModel<Address>
  ): EntitiesModel<Address> {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.values = source.addresses.map((address) => ({
      ...this.converter.convert(address, ADDRESS_NORMALIZER),
    }));

    return target;
  }
}
