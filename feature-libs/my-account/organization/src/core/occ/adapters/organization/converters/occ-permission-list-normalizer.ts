import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { PERMISSION_NORMALIZER } from '../../../../connectors/permission/converters';
import { EntitiesModel } from '../../../../../../../../../projects/core/src/model/misc.model';
import { Permission } from '../../../../../../../../../projects/core/src/model/permission.model';

@Injectable()
export class OccPermissionListNormalizer
  implements Converter<Occ.PermissionsList, EntitiesModel<Permission>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.PermissionsList,
    target?: EntitiesModel<Permission>
  ): EntitiesModel<Permission> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.orderApprovalPermissions.map((permission) => ({
          ...this.converter.convert(permission, PERMISSION_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
