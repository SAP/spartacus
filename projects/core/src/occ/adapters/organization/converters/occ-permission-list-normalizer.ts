import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { PERMISSION_NORMALIZER } from '../../../../organization/connectors/permission/converters';
import { PermissionListModel } from '../../../../model/permission.model';

@Injectable()
export class OccPermissionListNormalizer
  implements Converter<Occ.PermissionsList, PermissionListModel> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.PermissionsList,
    target?: PermissionListModel
  ): PermissionListModel {
    if (target === undefined) {
      target = {
        ...(source as any),
        permissions: source.orderApprovalPermissions.map(permission => ({
          ...this.converter.convert(permission, PERMISSION_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
