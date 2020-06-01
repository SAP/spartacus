import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { OrderApprovalPermissionType } from '../../../../model/permission.model';
import { PERMISSION_TYPE_NORMALIZER } from '../../../../organization/connectors/permission/converters';

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
