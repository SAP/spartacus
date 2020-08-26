import { Injectable } from '@angular/core';
import {
  Converter,
  Occ,
  EntitiesModel,
  Permission,
  ConverterService,
} from '@spartacus/core';
import { PERMISSION_NORMALIZER } from '../../../../connectors';

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
