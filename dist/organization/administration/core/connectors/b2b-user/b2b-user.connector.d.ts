import { B2BUser, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';
import { B2BUserAdapter } from './b2b-user.adapter';
import * as i0 from "@angular/core";
export declare class B2BUserConnector {
    protected adapter: B2BUserAdapter;
    constructor(adapter: B2BUserAdapter);
    get(userId: string, orgUnitCustomerId: string): Observable<B2BUser>;
    create(userId: string, orgCustomer: B2BUser): Observable<B2BUser>;
    update(userId: string, orgCustomerId: string, orgCustomer: B2BUser): Observable<B2BUser>;
    getList(userId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    getApprovers(userId: string, orgUnitCustomerId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    assignApprover(userId: string, orgCustomerId: string, approverId: string): Observable<any>;
    unassignApprover(userId: string, orgCustomerId: string, approverId: string): Observable<any>;
    getPermissions(userId: string, orgUnitCustomerId: string, params?: SearchConfig): Observable<EntitiesModel<Permission>>;
    assignPermission(userId: string, orgCustomerId: string, permissionId: string): Observable<any>;
    unassignPermission(userId: string, orgCustomerId: string, permissionId: string): Observable<any>;
    getUserGroups(userId: string, orgUnitCustomerId: string, params?: SearchConfig): Observable<EntitiesModel<UserGroup>>;
    assignUserGroup(userId: string, orgCustomerId: string, userGroupId: string): Observable<any>;
    unassignUserGroup(userId: string, orgCustomerId: string, userGroupId: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<B2BUserConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<B2BUserConnector>;
}
