import { HttpClient } from '@angular/common/http';
import { B2BUser, ConverterService, EntitiesModel, OccEndpointsService, SearchConfig } from '@spartacus/core';
import { Permission, UserGroup, UserGroupAdapter } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccUserGroupAdapter implements UserGroupAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, userGroupId: string): Observable<UserGroup>;
    loadList(userId: string, params?: SearchConfig): Observable<EntitiesModel<UserGroup>>;
    loadAvailableOrderApprovalPermissions(userId: string, userGroupId: string, params?: SearchConfig): Observable<EntitiesModel<Permission>>;
    loadAvailableOrgCustomers(userId: string, userGroupId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    create(userId: string, userGroup: UserGroup): Observable<UserGroup>;
    delete(userId: string, userGroupId: string): Observable<UserGroup>;
    update(userId: string, userGroupId: string, userGroup: UserGroup): Observable<UserGroup>;
    assignMember(userId: string, userGroupId: string, orgCustomerId: string): Observable<any>;
    assignOrderApprovalPermission(userId: string, userGroupId: string, orderApprovalPermissionCode: string): Observable<any>;
    unassignMember(userId: string, userGroupId: string, orgCustomerId: string): Observable<any>;
    unassignAllMembers(userId: string, userGroupId: string): Observable<any>;
    unassignOrderApprovalPermission(userId: string, userGroupId: string, orderApprovalPermissionCode: string): Observable<any>;
    protected getUserGroupEndpoint(userId: string, userGroupId: string): string;
    protected getUserGroupsEndpoint(userId: string, params?: SearchConfig): string;
    protected getAvailableCustomersEndpoint(userId: string, userGroupId: string, params?: SearchConfig | {
        orgCustomerId: string;
    }): string;
    protected getPermissionsEndpoint(userId: string, userGroupId: string, params?: SearchConfig | {
        orgCustomerId: string;
    }): string;
    protected getMemberEndpoint(userId: string, userGroupId: string, orgCustomerId: string): string;
    protected getMembersEndpoint(userId: string, userGroupId: string, params?: SearchConfig | {
        orgCustomerId: string;
    }): string;
    protected getOrderApprovalPermissionsEndpoint(userId: string, userGroupId: string, params?: SearchConfig | {
        orderApprovalPermissionCode: string;
    }): string;
    protected getOrderApprovalPermissionEndpoint(userId: string, userGroupId: string, orderApprovalPermissionCode: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserGroupAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserGroupAdapter>;
}
