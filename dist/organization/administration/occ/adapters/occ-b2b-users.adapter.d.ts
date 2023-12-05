import { HttpClient } from '@angular/common/http';
import { B2BUser, ConverterService, EntitiesModel, OccEndpointsService, SearchConfig } from '@spartacus/core';
import { B2BUserAdapter, UserGroup } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccB2BUserAdapter implements B2BUserAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, orgUnitCustomerId: string): Observable<B2BUser>;
    loadList(userId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    create(userId: string, orgCustomer: B2BUser): Observable<B2BUser>;
    update(userId: string, orgCustomerId: string, orgCustomer: B2BUser): Observable<B2BUser>;
    loadApprovers(userId: string, orgCustomerId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    assignApprover(userId: string, orgCustomerId: string, approverId: string): Observable<any>;
    unassignApprover(userId: string, orgCustomerId: string, approverId: string): Observable<any>;
    loadPermissions(userId: string, orgCustomerId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    assignPermission(userId: string, orgCustomerId: string, permissionId: string): Observable<any>;
    unassignPermission(userId: string, orgCustomerId: string, permissionId: string): Observable<any>;
    loadUserGroups(userId: string, orgCustomerId: string, params?: SearchConfig): Observable<EntitiesModel<UserGroup>>;
    assignUserGroup(userId: string, orgCustomerId: string, userGroupId: string): Observable<any>;
    unassignUserGroup(userId: string, orgCustomerId: string, userGroupId: string): Observable<any>;
    protected getB2BUserEndpoint(userId: string, orgCustomerId: string): string;
    protected getB2BUsersEndpoint(userId: string, params?: SearchConfig): string;
    protected getApproverEndpoint(userId: string, orgCustomerId: string, approverId: string): string;
    protected getApproversEndpoint(userId: string, orgCustomerId: string, params?: SearchConfig | {
        orgCustomerId: string;
    }): string;
    protected getPermissionEndpoint(userId: string, orgCustomerId: string, premissionId: string): string;
    protected getPermissionsEndpoint(userId: string, orgCustomerId: string, params?: SearchConfig): string;
    protected getUserGroupEndpoint(userId: string, orgCustomerId: string, userGroupId: string): string;
    protected getUserGroupsEndpoint(userId: string, orgCustomerId: string, params?: SearchConfig): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccB2BUserAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccB2BUserAdapter>;
}
