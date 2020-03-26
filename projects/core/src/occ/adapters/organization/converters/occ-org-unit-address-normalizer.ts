import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BAddress } from '../../../../model/org-unit.model';

@Injectable()
export class OccOrgUnitAddressNormalizer
  implements Converter<Occ.B2BAddress, B2BAddress> {
  convert(source: Occ.B2BUnitNode, target?: B2BAddress): B2BAddress {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
