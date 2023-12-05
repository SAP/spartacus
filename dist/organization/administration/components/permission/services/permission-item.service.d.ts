import { RoutingService } from '@spartacus/core';
import { OrganizationItemStatus, Permission, PermissionService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { PermissionFormService } from '../form/permission-form.service';
import { CurrentPermissionService } from './current-permission.service';
import * as i0 from "@angular/core";
export declare class PermissionItemService extends ItemService<Permission> {
    protected currentItemService: CurrentPermissionService;
    protected routingService: RoutingService;
    protected formService: PermissionFormService;
    protected permissionService: PermissionService;
    constructor(currentItemService: CurrentPermissionService, routingService: RoutingService, formService: PermissionFormService, permissionService: PermissionService);
    load(code: string): Observable<Permission>;
    update(code: string, value: Permission): Observable<OrganizationItemStatus<Permission>>;
    protected create(value: Permission): Observable<OrganizationItemStatus<Permission>>;
    protected getDetailsRoute(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionItemService>;
}
