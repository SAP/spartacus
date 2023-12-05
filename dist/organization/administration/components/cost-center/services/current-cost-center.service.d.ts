import { CostCenter, RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentCostCenterService extends CurrentItemService<CostCenter> {
    protected routingService: RoutingService;
    protected costCenterService: CostCenterService;
    constructor(routingService: RoutingService, costCenterService: CostCenterService);
    protected getParamKey(): string;
    protected getItem(code: string): Observable<CostCenter>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentCostCenterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentCostCenterService>;
}
