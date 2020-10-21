import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { OrderApprovalPermissionType } from '@spartacus/organization/administration/core';

@Injectable()
export class OccPermissionTypeNormalizer
  implements
    Converter<Occ.OrderApprovalPermissionType, OrderApprovalPermissionType> {
  constructor() {}

  convert(
    source: Occ.OrderApprovalPermissionType,
    target?: OrderApprovalPermissionType
  ): OrderApprovalPermissionType {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
