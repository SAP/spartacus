import { ListModel, StateUtils } from '@spartacus/core';
import { Permission } from '../../model/permission.model';
export declare const permissionInitialState: Permission | undefined;
export declare const permissionsInitialState: ListModel | undefined;
export declare function permissionsEntitiesReducer(state: Permission | undefined, action: StateUtils.LoaderAction): Permission | undefined;
export declare function permissionsListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
