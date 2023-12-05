import { HttpClient } from '@angular/common/http';
import { Address, B2BApprovalProcess, B2BUnit, B2BUser, ConverterService, EntitiesModel, OccEndpointsService, SearchConfig } from '@spartacus/core';
import { B2BUnitNode, OrgUnitAdapter } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccOrgUnitAdapter implements OrgUnitAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, orgUnitId: string): Observable<B2BUnit>;
    create(userId: string, orgUnit: B2BUnit): Observable<B2BUnit>;
    update(userId: string, orgUnitId: string, orgUnit: B2BUnit): Observable<B2BUnit>;
    loadTree(userId: string): Observable<B2BUnitNode>;
    loadList(userId: string): Observable<B2BUnitNode[]>;
    loadApprovalProcesses(userId: string): Observable<B2BApprovalProcess[]>;
    loadUsers(userId: string, orgUnitId: string, roleId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    assignRole(userId: string, orgCustomerId: string, roleId: string): Observable<any>;
    unassignRole(userId: string, orgCustomerId: string, roleId: string): Observable<any>;
    assignApprover(userId: string, orgUnitId: string, orgCustomerId: string, roleId: string): Observable<any>;
    unassignApprover(userId: string, orgUnitId: string, orgCustomerId: string, roleId: string): Observable<any>;
    loadAddresses(userId: string, orgUnitId: string): Observable<EntitiesModel<Address>>;
    createAddress(userId: string, orgUnitId: string, address: Address): Observable<Address>;
    updateAddress(userId: string, orgUnitId: string, addressId: string, address: Address): Observable<Address>;
    deleteAddress(userId: string, orgUnitId: string, addressId: string): Observable<any>;
    protected getOrgUnitEndpoint(userId: string, orgUnitId: string): string;
    protected getOrgUnitsEndpoint(userId: string): string;
    protected getAvailableOrgUnitsEndpoint(userId: string): string;
    protected getOrgUnitsTreeEndpoint(userId: string): string;
    protected getOrgUnitsApprovalProcessesEndpoint(userId: string): string;
    protected getUsersEndpoint(userId: string, orgUnitId: string, roleId: string, params?: SearchConfig): string;
    protected getRolesEndpoint(userId: string, orgCustomerId: string, params: {
        roleId: string;
    }): string;
    protected getRoleEndpoint(userId: string, orgCustomerId: string, roleId: string): string;
    protected getApproversEndpoint(userId: string, orgUnitId: string, orgCustomerId: string, params: {
        roleId: string;
    }): string;
    protected getApproverEndpoint(userId: string, orgUnitId: string, orgCustomerId: string, roleId: string): string;
    protected getAddressesEndpoint(userId: string, orgUnitId: string): string;
    protected getAddressEndpoint(userId: string, orgUnitId: string, addressId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrgUnitAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrgUnitAdapter>;
}
