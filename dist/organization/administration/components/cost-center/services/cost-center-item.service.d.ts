import { CostCenter, RoutingService } from '@spartacus/core';
import { CostCenterService, OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { CostCenterFormService } from '../form/cost-center-form.service';
import { CurrentCostCenterService } from './current-cost-center.service';
import * as i0 from "@angular/core";
export declare class CostCenterItemService extends ItemService<CostCenter> {
    protected currentItemService: CurrentCostCenterService;
    protected routingService: RoutingService;
    protected formService: CostCenterFormService;
    protected costCenterService: CostCenterService;
    constructor(currentItemService: CurrentCostCenterService, routingService: RoutingService, formService: CostCenterFormService, costCenterService: CostCenterService);
    load(code: string): Observable<CostCenter>;
    update(code: string, value: CostCenter): Observable<OrganizationItemStatus<CostCenter>>;
    protected create(value: CostCenter): Observable<OrganizationItemStatus<CostCenter>>;
    protected getDetailsRoute(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CostCenterItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CostCenterItemService>;
}
