import { EntitiesModel, SearchConfig, OrderApprovalPermissionType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { PermissionAdapter } from './permission.adapter';
import * as i0 from "@angular/core";
export declare class PermissionConnector {
    protected adapter: PermissionAdapter;
    constructor(adapter: PermissionAdapter);
    get(userId: string, permissionCode: string): Observable<Permission>;
    getList(userId: string, params?: SearchConfig): Observable<EntitiesModel<Permission>>;
    create(userId: string, permission: Permission): Observable<Permission>;
    update(userId: string, permissionCode: string, permission: Permission): Observable<Permission>;
    getTypes(): Observable<OrderApprovalPermissionType[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionConnector>;
}
