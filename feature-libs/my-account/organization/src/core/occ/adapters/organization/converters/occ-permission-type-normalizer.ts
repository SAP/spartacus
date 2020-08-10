import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { Converter } from '../../../../../../../../../projects/core/src/util/converter.service';
import { OrderApprovalPermissionType } from '../../../../../../../../../projects/core/src/model/permission.model';

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
