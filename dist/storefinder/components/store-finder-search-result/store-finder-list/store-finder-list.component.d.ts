import { PointOfService } from '@spartacus/core';
import { StoreFinderMapComponent } from '../../store-finder-map/store-finder-map.component';
import { ICON_TYPE } from '@spartacus/storefront';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { LocationDisplayMode } from './store-finder-list.model';
import * as i0 from "@angular/core";
export declare class StoreFinderListComponent {
    private storeFinderService;
    private document;
    locations: any;
    useMylocation: boolean;
    storeMap: StoreFinderMapComponent;
    selectedStore: PointOfService;
    selectedStoreIndex: number;
    isDetailsModeVisible: boolean;
    storeDetails: PointOfService;
    iconTypes: typeof ICON_TYPE;
    displayModes: typeof LocationDisplayMode;
    activeDisplayMode: LocationDisplayMode;
    constructor(storeFinderService: StoreFinderService, document: any);
    centerStoreOnMapByIndex(index: number, location: PointOfService): void;
    selectStoreItemList(index: number): void;
    showStoreDetails(location: PointOfService): void;
    hideStoreDetails(): void;
    setDisplayMode(mode: LocationDisplayMode): void;
    isDisplayModeActive(mode: LocationDisplayMode): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderListComponent, "cx-store-finder-list", never, { "locations": "locations"; "useMylocation": "useMylocation"; }, {}, never, never, false, never>;
}
