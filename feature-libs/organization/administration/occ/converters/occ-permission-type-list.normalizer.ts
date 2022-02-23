import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  Occ,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import { PERMISSION_TYPE_NORMALIZER } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccPermissionTypeListNormalizer
  implements
    Converter<
      Occ.OrderApprovalPermissionTypeList,
      OrderApprovalPermissionType[]
    >
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrderApprovalPermissionTypeList,
    target?: OrderApprovalPermissionType[]
  ): OrderApprovalPermissionType[] {
    target = source.orderApprovalPermissionTypes.map((permissionType) =>
      this.converter.convert(permissionType, PERMISSION_TYPE_NORMALIZER)
    );

    return target;
  }
}
