import { HttpClient } from '@angular/common/http';
import { ConverterService, EntitiesModel, OccEndpointsService, SearchConfig, OrderApprovalPermissionType } from '@spartacus/core';
import { Permission, PermissionAdapter } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccPermissionAdapter implements PermissionAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    load(userId: string, permissionCode: string): Observable<Permission>;
    loadList(userId: string, params?: SearchConfig): Observable<EntitiesModel<Permission>>;
    create(userId: string, permission: Permission): Observable<Permission>;
    update(userId: string, permissionCode: string, permission: Permission): Observable<Permission>;
    loadTypes(): Observable<OrderApprovalPermissionType[]>;
    protected getPermissionEndpoint(userId: string, orderApprovalPermissionCode: string): string;
    protected getPermissionsEndpoint(userId: string, params?: SearchConfig): string;
    protected getPermissionTypesEndpoint(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPermissionAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPermissionAdapter>;
}
