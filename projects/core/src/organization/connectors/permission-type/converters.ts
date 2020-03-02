import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { OrderApprovalPermissionType } from '../../../model/permission.model';
import { EntitiesModel } from '../../../model/misc.model';

export const PERMISSION_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, OrderApprovalPermissionType>
>('PermissionTypeNormalizer');

export const PERMISSION_TYPES_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<OrderApprovalPermissionType>>
>('PermissionTypesListNormalizer');
