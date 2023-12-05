import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentUnitService extends CurrentItemService<B2BUnit> {
    protected routingService: RoutingService;
    protected orgUnitService: OrgUnitService;
    constructor(routingService: RoutingService, orgUnitService: OrgUnitService);
    protected getParamKey(): string;
    protected getItem(code: string): Observable<B2BUnit>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentUnitService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentUnitService>;
}
