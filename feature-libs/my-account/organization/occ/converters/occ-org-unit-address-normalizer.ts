import { Injectable } from '@angular/core';
import { Address, Converter, Occ } from '@spartacus/core';

@Injectable()
export class OccOrgUnitAddressNormalizer
  implements Converter<Occ.B2BAddress, Address> {
  convert(source: Occ.B2BAddress, target?: Address): Address {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
