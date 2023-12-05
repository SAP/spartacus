import { Address, B2BUnit, Country, UserAddressService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import * as i0 from "@angular/core";
export declare class UnitAddressDetailsComponent {
    protected itemService: ItemService<Address>;
    protected currentUnitService: CurrentUnitService;
    protected userAddressService: UserAddressService;
    unit$: Observable<B2BUnit | undefined>;
    model$: Observable<Address>;
    getCountry(isoCode: string | undefined): Observable<Country | undefined>;
    constructor(itemService: ItemService<Address>, currentUnitService: CurrentUnitService, userAddressService: UserAddressService);
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAddressDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UnitAddressDetailsComponent, "cx-org-unit-address-details", never, {}, {}, never, never, false, never>;
}
