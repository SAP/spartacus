import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrganizationItemStatus, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from './current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitItemService extends ItemService<B2BUnit> {
    protected currentItemService: CurrentUnitService;
    protected routingService: RoutingService;
    protected formService: UnitFormService;
    protected unitService: OrgUnitService;
    constructor(currentItemService: CurrentUnitService, routingService: RoutingService, formService: UnitFormService, unitService: OrgUnitService);
    /**
     * @override
     * Returns the unit for the given code.
     *
     * Loads the unit each time, to ensure accurate data is resolved.
     */
    load(code: string): Observable<B2BUnit>;
    update(code: string, value: B2BUnit): Observable<OrganizationItemStatus<B2BUnit>>;
    protected create(value: B2BUnit): Observable<OrganizationItemStatus<B2BUnit>>;
    /**
     * @override
     * Returns 'unitDetails'
     */
    protected getDetailsRoute(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitItemService>;
}
