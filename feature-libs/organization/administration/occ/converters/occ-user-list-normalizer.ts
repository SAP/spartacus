import { Injectable } from '@angular/core';
import {
  B2BUser,
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import { B2B_USER_NORMALIZER } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccUserListNormalizer
  implements Converter<Occ.OrgUnitUserList, EntitiesModel<B2BUser>>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrgUnitUserList,
    target?: EntitiesModel<B2BUser>
  ): EntitiesModel<B2BUser> {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.values = source.users.map((b2bUser) => ({
      ...this.converter.convert(b2bUser, B2B_USER_NORMALIZER),
    }));
    return target;
  }
}
