import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { OrgUnitCustomer } from '../../../../model';

@Injectable()
export class OccOrgUnitCustomerNormalizer
  implements Converter<Occ.OrgUnitCustomer, OrgUnitCustomer> {
  constructor() {}

  convert(
    source: Occ.OrgUnitCustomer,
    target?: OrgUnitCustomer
  ): OrgUnitCustomer {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
