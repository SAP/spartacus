import { Actions } from '@ngrx/effects';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PermissionConnector } from '../../connectors/permission/permission.connector';
import { OrganizationActions, PermissionActions } from '../actions';
import * as i0 from "@angular/core";
export declare class PermissionEffects {
    private actions$;
    private permissionConnector;
    protected logger: LoggerService;
    loadPermission$: Observable<PermissionActions.LoadPermissionSuccess | PermissionActions.LoadPermissionFail>;
    loadPermissions$: Observable<PermissionActions.LoadPermissionsSuccess | PermissionActions.LoadPermissionSuccess | PermissionActions.LoadPermissionsFail>;
    createPermission$: Observable<PermissionActions.CreatePermissionSuccess | PermissionActions.CreatePermissionFail | OrganizationActions.OrganizationClearData>;
    updatePermission$: Observable<PermissionActions.UpdatePermissionSuccess | PermissionActions.UpdatePermissionFail | OrganizationActions.OrganizationClearData>;
    loadPermissionTypes$: Observable<PermissionActions.LoadPermissionTypesSuccess | PermissionActions.LoadPermissionTypesFail>;
    constructor(actions$: Actions, permissionConnector: PermissionConnector);
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionEffects>;
}
