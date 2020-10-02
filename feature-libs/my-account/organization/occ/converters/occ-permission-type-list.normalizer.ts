import { Injectable } from '@angular/core';
import { Converter, ConverterService, Occ } from '@spartacus/core';
import {
  OrderApprovalPermissionType,
  PERMISSION_TYPE_NORMALIZER,
} from '@spartacus/my-account/organization/core';

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
