import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../../model/permission.model';

export const PERMISSION_NORMALIZER = new InjectionToken<
  Converter<any, Permission>
>('PermissionNormalizer');

export const PERMISSIONS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<Permission>>
>('PermissionsListNormalizer');

export const PERMISSION_TYPE_NORMALIZER = new InjectionToken<
  Converter<any, OrderApprovalPermissionType>
>('PermissionTypeNormalizer');

export const PERMISSION_TYPES_NORMALIZER = new InjectionToken<
  Converter<any, OrderApprovalPermissionType[]>
>('PermissionTypesListNormalizer');
