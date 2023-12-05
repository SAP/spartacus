import { Address, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../../../shared/current-item.service';
import * as i0 from "@angular/core";
export declare class CurrentUnitAddressService extends CurrentItemService<Address> {
    protected routingService: RoutingService;
    protected unitService: OrgUnitService;
    readonly item$: Observable<Address | undefined>;
    constructor(routingService: RoutingService, unitService: OrgUnitService);
    getDetailsRoute(): string;
    protected getParamKey(): string;
    protected getItem(unitUid: string, addressId: string): Observable<Address | undefined>;
    getError(code: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrentUnitAddressService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CurrentUnitAddressService>;
}
