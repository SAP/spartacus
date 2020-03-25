import { PERMISSION_TYPE_NORMALIZER } from 'projects/core/src/organization/connectors/permission-type';
import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { EntitiesModel } from '../../../../model/misc.model';
import { OrderApprovalPermissionType } from 'projects/core/src/model/permission.model';

@Injectable()
export class OccPermissionTypeListNormalizer
  implements
    Converter<
      Occ.OrderApprovalPermissionTypeList,
      EntitiesModel<OrderApprovalPermissionType>
    > {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrderApprovalPermissionTypeList,
    target?: EntitiesModel<OrderApprovalPermissionType>
  ): EntitiesModel<OrderApprovalPermissionType> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.orderApprovalPermissionTypes.map(permissionType => ({
          ...this.converter.convert(permissionType, PERMISSION_TYPE_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
