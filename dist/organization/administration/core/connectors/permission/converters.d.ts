import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel, OrderApprovalPermissionType } from '@spartacus/core';
import { Permission } from '../../model/permission.model';
export declare const PERMISSION_NORMALIZER: InjectionToken<Converter<any, Permission>>;
export declare const PERMISSIONS_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<Permission>>>;
export declare const PERMISSION_TYPE_NORMALIZER: InjectionToken<Converter<any, OrderApprovalPermissionType>>;
export declare const PERMISSION_TYPES_NORMALIZER: InjectionToken<Converter<any, OrderApprovalPermissionType[]>>;
export declare const PERMISSION_SERIALIZER: InjectionToken<Converter<Permission, any>>;
