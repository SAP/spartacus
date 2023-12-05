import { UntypedFormControl } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class StoreFinderSearchComponent {
    private routingService;
    searchBox: UntypedFormControl;
    iconTypes: typeof ICON_TYPE;
    constructor(routingService: RoutingService);
    findStores(address: string): void;
    viewStoresWithMyLoc(): void;
    onKey(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderSearchComponent, "cx-store-finder-search", never, {}, {}, never, never, false, never>;
}
