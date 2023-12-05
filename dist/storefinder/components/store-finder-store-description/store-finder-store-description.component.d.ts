import { PointOfService } from '@spartacus/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { StoreFinderService } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export declare class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
    protected storeFinderService: StoreFinderService;
    location: PointOfService;
    disableMap: boolean;
    constructor(storeFinderService: StoreFinderService);
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderStoreDescriptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderStoreDescriptionComponent, "cx-store-finder-store-description", never, { "location": "location"; "disableMap": "disableMap"; }, {}, never, never, false, never>;
}
