import { Address, DefaultRoutePageMetaResolver, TranslationService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentUnitAddressService } from '../links/addresses/services/current-unit-address.service';
import * as i0 from "@angular/core";
export declare class UnitAddressRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    protected currentItemService: CurrentUnitAddressService;
    constructor(translation: TranslationService, currentItemService: CurrentUnitAddressService);
    protected getParams(): Observable<Address | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UnitAddressRoutePageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UnitAddressRoutePageMetaResolver>;
}
