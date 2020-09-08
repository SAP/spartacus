import { Injectable } from '@angular/core';
import { Converter, Occ, B2BAddress } from '@spartacus/core';

@Injectable()
export class OccOrgUnitAddressNormalizer
  implements Converter<Occ.B2BAddress, B2BAddress> {
  convert(source: Occ.B2BAddress, target?: B2BAddress): B2BAddress {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
