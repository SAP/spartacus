import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import {
  Permission,
  PermissionListModel,
} from '../../../model/permission.model';

export const PERMISSION_NORMALIZER = new InjectionToken<
  Converter<any, Permission>
>('PermissionNormalizer');
export const PERMISSIONS_NORMALIZER = new InjectionToken<
  Converter<any, PermissionListModel>
>('PermissionsListNormalizer');
