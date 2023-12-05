import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeoPoint } from '@spartacus/core';
import { Observable } from 'rxjs';
import { StoreFinderService } from '@spartacus/storefinder/core';
import * as i0 from "@angular/core";
export declare class StoreFinderGridComponent implements OnInit {
    private storeFinderService;
    private route;
    defaultLocation: GeoPoint;
    country: string;
    region: string;
    locations$: any;
    isLoading$: Observable<boolean>;
    constructor(storeFinderService: StoreFinderService, route: ActivatedRoute);
    ngOnInit(): void;
    protected findStores(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreFinderGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StoreFinderGridComponent, "cx-store-finder-grid", never, {}, {}, never, never, false, never>;
}
