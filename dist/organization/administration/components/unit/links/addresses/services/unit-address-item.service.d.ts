import { Address, RoutingService } from '@spartacus/core';
import { OrganizationItemStatus, OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { UnitAddressFormService } from '../form/unit-address-form.service';
import { CurrentUnitAddressService } from './current-unit-address.service';
import * as i0 from "@angular/core";
export declare class UnitAddressItemService extends ItemService<Address> {
    protected currentItemService: CurrentUnitAddressService;
    protected routingService: RoutingService;
    protected formService: UnitAddressFormService;
    protected unitService: OrgUnitService;
    constructor(currentItemService: CurrentUnitAddressService, routingService: RoutingService, formService: UnitAddressFormService, unitService: OrgUnitService);
    protected unitRouteParam$: Observable<string>;
    load(unitUid: string, addressId: string): Observable<Address>;
    update(addressCode: string, address: Address): Observable<OrganizationItemStatus<Address>>;
    protected create(value: Address): Observable<OrganizationItemStatus<Address>>;
    protected getDetailsRoute(): string;
    delete(addressId: string, unitUid: string): Observable<OrganizationItemStatus<Address>>;
    launchDetails(item: Address): void;
    protected launchList(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAddressItemService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitAddressItemService>;
}
