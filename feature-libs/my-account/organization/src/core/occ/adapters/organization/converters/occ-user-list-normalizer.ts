import { Injectable } from '@angular/core';
import {
  Converter,
  Occ,
  EntitiesModel,
  ConverterService,
  B2BUser,
} from '@spartacus/core';
import { B2B_USER_NORMALIZER } from '../../../../connectors';

@Injectable()
export class OccUserListNormalizer
  implements Converter<Occ.OrgUnitUserList, EntitiesModel<B2BUser>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrgUnitUserList,
    target?: EntitiesModel<B2BUser>
  ): EntitiesModel<B2BUser> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.users.map((b2bUser) => ({
          ...this.converter.convert(b2bUser, B2B_USER_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
