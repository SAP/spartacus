import { OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import * as i0 from "@angular/core";
export declare class PickupInfoContainerComponent implements OnInit {
    protected activeCartService: ActiveCartFacade;
    protected storeDetails: PickupLocationsSearchFacade;
    storesDetailsData: Partial<PointOfService>[];
    constructor(activeCartService: ActiveCartFacade, storeDetails: PickupLocationsSearchFacade);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickupInfoContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickupInfoContainerComponent, "cx-pickup-info-container", never, {}, {}, never, never, false, never>;
}
