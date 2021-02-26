import { Injectable } from '@angular/core';
import { B2BUser, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccB2bUserSerializer implements Converter<B2BUser, Occ.B2BUser> {
  constructor() {}

  convert(source: B2BUser, target?: Occ.B2BUser): Occ.B2BUser {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    delete (target as B2BUser).isAssignedToApprovers;
    if (target.active === false) {
      target.roles = [];
    }
    return target;
  }
}
