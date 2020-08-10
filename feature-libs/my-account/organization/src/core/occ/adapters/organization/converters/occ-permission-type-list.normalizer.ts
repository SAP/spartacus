import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { OrderApprovalPermissionType } from '../../../../../../../../../projects/core/src/model/permission.model';
import { PERMISSION_TYPE_NORMALIZER } from '../../../../connectors/permission/converters';

@Injectable()
export class OccPermissionTypeListNormalizer
  implements
    Converter<
      Occ.OrderApprovalPermissionTypeList,
      OrderApprovalPermissionType[]
    > {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrderApprovalPermissionTypeList,
    target?: OrderApprovalPermissionType[]
  ): OrderApprovalPermissionType[] {
    if (target === undefined) {
      target = source.orderApprovalPermissionTypes.map((permissionType) =>
        this.converter.convert(permissionType, PERMISSION_TYPE_NORMALIZER)
      );
    }
    return target;
  }
}
