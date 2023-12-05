import { RoutingService } from '@spartacus/core';
import { Permission, PermissionService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentPermissionService extends CurrentItemService<Permission> {
    protected routingService: RoutingService;
    protected permissionService: PermissionService;
    constructor(routingService: RoutingService, permissionService: PermissionService);
    protected getParamKey(): string;
    protected getItem(code: string): Observable<Permission>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentPermissionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentPermissionService>;
}
