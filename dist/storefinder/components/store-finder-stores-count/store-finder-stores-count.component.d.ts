import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreFinderService } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export declare class StoreFinderStoresCountComponent implements OnInit {
    private storeFinderService;
    locations$: Observable<any>;
    isLoading$: Observable<boolean>;
    constructor(storeFinderService: StoreFinderService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderStoresCountComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderStoresCountComponent, "cx-store-finder-stores-count", never, {}, {}, never, never, false, never>;
}
