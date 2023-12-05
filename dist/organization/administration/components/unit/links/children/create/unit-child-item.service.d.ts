import { UntypedFormGroup } from '@angular/forms';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrganizationItemStatus, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitItemService } from '../../../services/unit-item.service';
import { CurrentUnitChildService } from './current-unit-child.service';
import * as i0 from "@angular/core";
export declare class UnitChildItemService extends UnitItemService {
    protected currentItemService: CurrentUnitChildService;
    protected routingService: RoutingService;
    protected formService: UnitFormService;
    protected unitService: OrgUnitService;
    constructor(currentItemService: CurrentUnitChildService, routingService: RoutingService, formService: UnitFormService, unitService: OrgUnitService);
    save(form: UntypedFormGroup, key?: string): Observable<OrganizationItemStatus<B2BUnit>>;
    /**
     * @override
     * Returns 'unitDetails'
     */
    protected getDetailsRoute(): string;
    protected buildRouteParams(item: B2BUnit): {
        uid: string | undefined;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitChildItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitChildItemService>;
}
