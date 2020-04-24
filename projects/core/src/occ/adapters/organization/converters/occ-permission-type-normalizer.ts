import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { OrderApprovalPermissionType } from '../../../../model/permission.model';

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
