import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { EntitiesModel } from '../../../../../../../../../projects/core/src/model/misc.model';
import { B2BUser } from '../../../../model/org-unit.model';
import { B2B_USER_NORMALIZER } from '../../../../../../../../../projects/core/src/organization';

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
