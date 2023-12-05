import { B2BUser, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Permission } from '../../model/permission.model';
import { UserGroup } from '../../model/user-group.model';
import { UserGroupAdapter } from './user-group.adapter';
import * as i0 from "@angular/core";
export declare class UserGroupConnector {
    protected adapter: UserGroupAdapter;
    constructor(adapter: UserGroupAdapter);
    get(userId: string, userGroupId: string): Observable<UserGroup>;
    getList(userId: string, params?: SearchConfig): Observable<EntitiesModel<UserGroup>>;
    getAvailableOrderApprovalPermissions(userId: string, userGroupId: string, params?: SearchConfig): Observable<EntitiesModel<Permission>>;
    getAvailableOrgCustomers(userId: string, userGroupId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    create(userId: string, userGroup: UserGroup): Observable<UserGroup>;
    delete(userId: string, userGroupId: string): Observable<UserGroup>;
    update(userId: string, userGroupId: string, userGroup: UserGroup): Observable<UserGroup>;
    assignMember(userId: string, userGroupId: string, orgCustomerId: string): Observable<any>;
    assignOrderApprovalPermission(userId: string, userGroupId: string, orderApprovalPermissionCode: string): Observable<any>;
    unassignMember(userId: string, userGroupId: string, orgCustomerId: string): Observable<any>;
    unassignAllMembers(userId: string, userGroupId: string): Observable<any>;
    unassignOrderApprovalPermission(userId: string, userGroupId: string, orderApprovalPermissionCode: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserGroupConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserGroupConnector>;
}
