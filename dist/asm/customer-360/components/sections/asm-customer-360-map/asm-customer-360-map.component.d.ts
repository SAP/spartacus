import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AsmCustomer360SectionConfig, AsmCustomer360StoreLocation } from '@spartacus/asm/customer-360/root';
import { PointOfService, TranslationService, WeekdayOpeningDay } from '@spartacus/core';
import { StoreFinderConfig, StoreFinderSearchPage, StoreFinderService } from '@spartacus/storefinder/core';
import { Observable, Subscription } from 'rxjs';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360MapComponent implements OnDestroy, OnInit {
    source: AsmCustomer360SectionContext<AsmCustomer360StoreLocation>;
    protected changeDetectorRef: ChangeDetectorRef;
    protected storeFinderService: StoreFinderService;
    protected translationService: TranslationService;
    protected storeFinderConfig: StoreFinderConfig;
    storeData: StoreFinderSearchPage;
    selectedStore: PointOfService | undefined;
    apiKey: string;
    dataSource$: Observable<[
        AsmCustomer360SectionConfig,
        AsmCustomer360StoreLocation
    ]>;
    protected subscription: Subscription;
    constructor(source: AsmCustomer360SectionContext<AsmCustomer360StoreLocation>, changeDetectorRef: ChangeDetectorRef, storeFinderService: StoreFinderService, translationService: TranslationService, storeFinderConfig: StoreFinderConfig);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectStore(store: PointOfService): void;
    getStoreOpening(opening: WeekdayOpeningDay): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360MapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360MapComponent, "cx-asm-customer-360-map", never, {}, {}, never, never, false, never>;
}
