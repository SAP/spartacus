import { StoreFinderService } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export declare class AbstractStoreItemComponent {
    protected storeFinderService: StoreFinderService;
    location: any;
    constructor(storeFinderService: StoreFinderService);
    getDirections(location: any): string;
    getFormattedStoreAddress(addressParts: string[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AbstractStoreItemComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AbstractStoreItemComponent, never, never, { "location": "location"; }, {}, never, never, false, never>;
}
