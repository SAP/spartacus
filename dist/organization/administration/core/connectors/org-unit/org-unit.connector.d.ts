import { Address, B2BApprovalProcess, B2BUnit, B2BUser, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { B2BUnitNode } from '../../model/unit-node.model';
import { OrgUnitAdapter } from './org-unit.adapter';
import * as i0 from "@angular/core";
export declare class OrgUnitConnector {
    protected adapter: OrgUnitAdapter;
    constructor(adapter: OrgUnitAdapter);
    get(userId: string, orgUnitId: string): Observable<B2BUnit>;
    create(userId: string, orgUnit: B2BUnit): Observable<B2BUnit>;
    update(userId: string, orgUnitId: string, orgUnit: B2BUnit): Observable<B2BUnit>;
    getList(userId: string): Observable<B2BUnitNode[]>;
    getApprovalProcesses(userId: string): Observable<B2BApprovalProcess[]>;
    getTree(userId: string): Observable<B2BUnitNode>;
    getUsers(userId: string, orgUnitId: string, roleId: string, params?: SearchConfig): Observable<EntitiesModel<B2BUser>>;
    assignRole(userId: string, orgCustomerId: string, roleId: string): Observable<any>;
    unassignRole(userId: string, orgCustomerId: string, roleId: string): Observable<any>;
    assignApprover(userId: string, orgUnitId: string, orgCustomerId: string, roleId: string): Observable<any>;
    unassignApprover(userId: string, orgUnitId: string, orgCustomerId: string, roleId: string): Observable<any>;
    getAddresses(userId: string, orgUnitId: string): Observable<EntitiesModel<Address>>;
    createAddress(userId: string, orgUnitId: string, address: Address): Observable<Address>;
    updateAddress(userId: string, orgUnitId: string, addressId: string, address: Address): Observable<Address>;
    deleteAddress(userId: string, orgUnitId: string, addressId: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrgUnitConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrgUnitConnector>;
}
