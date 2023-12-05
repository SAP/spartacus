import { Store } from '@ngrx/store';
import { EntitiesModel, OrderApprovalPermissionType, SearchConfig, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationItemStatus } from '../model/organization-item-status';
import { Permission } from '../model/permission.model';
import { StateWithOrganization } from '../store/organization-state';
import * as i0 from "@angular/core";
export declare class PermissionService {
    protected store: Store<StateWithOrganization>;
    protected userIdService: UserIdService;
    constructor(store: Store<StateWithOrganization>, userIdService: UserIdService);
    loadPermission(permissionCode: string): void;
    loadPermissions(params: SearchConfig): void;
    loadPermissionTypes(): void;
    private getPermission;
    private getPermissionValue;
    private getPermissionList;
    private getPermissionTypeList;
    get(permissionCode: string): Observable<Permission>;
    getTypes(): Observable<OrderApprovalPermissionType[] | undefined>;
    getList(params: SearchConfig): Observable<EntitiesModel<Permission> | undefined>;
    create(permission: Permission): void;
    update(permissionCode: string, permission: Permission): void;
    getLoadingStatus(permissionCode: string): Observable<OrganizationItemStatus<Permission>>;
    private getPermissionState;
    getErrorState(permissionCode: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionService>;
}
