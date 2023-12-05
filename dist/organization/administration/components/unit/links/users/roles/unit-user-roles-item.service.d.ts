import { UntypedFormGroup } from '@angular/forms';
import { B2BUser, RoutingService } from '@spartacus/core';
import { B2BUserService, OrganizationItemStatus, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitUserService } from '../services/current-unit-user.service';
import { UnitUserRolesFormService } from './unit-user-roles-form.service';
import * as i0 from "@angular/core";
export declare class UnitUserRolesItemService extends ItemService<B2BUser> {
    protected currentItemService: CurrentUnitUserService;
    protected routingService: RoutingService;
    protected formService: UnitUserRolesFormService;
    protected unitService: OrgUnitService;
    protected b2bUserService: B2BUserService;
    constructor(currentItemService: CurrentUnitUserService, routingService: RoutingService, formService: UnitUserRolesFormService, unitService: OrgUnitService, b2bUserService: B2BUserService);
    save(form: UntypedFormGroup, key?: string): Observable<OrganizationItemStatus<B2BUser>>;
    load(unitUid: string): Observable<B2BUser>;
    update(customerId: string, _user: B2BUser): Observable<OrganizationItemStatus<B2BUser>>;
    protected create(_customer: B2BUser): Observable<OrganizationItemStatus<B2BUser>>;
    protected getDetailsRoute(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitUserRolesItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitUserRolesItemService>;
}
