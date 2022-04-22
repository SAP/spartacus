import { Injectable } from '@angular/core';
import { Converter, Occ, OrderApprovalPermissionType } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccPermissionTypeNormalizer
  implements
    Converter<Occ.OrderApprovalPermissionType, OrderApprovalPermissionType>
{
  constructor() {}

  convert(
    source: Occ.OrderApprovalPermissionType,
    target?: OrderApprovalPermissionType
  ): OrderApprovalPermissionType {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
