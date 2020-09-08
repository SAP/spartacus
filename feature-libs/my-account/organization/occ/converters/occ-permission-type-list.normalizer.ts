import { Injectable } from '@angular/core';

import { PERMISSION_TYPE_NORMALIZER } from '@spartacus/my-account/organization/core';
import {
  Converter,
  Occ,
  OrderApprovalPermissionType,
  ConverterService,
} from '@spartacus/core';

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
