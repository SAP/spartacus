import { OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageService, PaginationModel, Product, ProductInterestEntryRelation, ProductInterestSearchResult, ProductService, TranslationService, UserInterestsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
interface ProductInterestSearchResultUI extends ProductInterestSearchResult {
    results?: (ProductInterestEntryRelation & {
        product$?: Observable<Product | undefined>;
    })[];
}
export declare class MyInterestsComponent implements OnInit, OnDestroy {
    private productInterestService;
    private translationService;
    private productService;
    private globalMessageService;
    private DEFAULT_PAGE_SIZE;
    private sortMapping;
    private sortChanged;
    sort: string;
    sortOptions: {
        code: string;
        selected: boolean;
    }[];
    pagination: PaginationModel;
    interests$: Observable<ProductInterestSearchResultUI>;
    isRemoveDisabled$: Observable<boolean>;
    getInterestsloading$: Observable<boolean>;
    sortLabels: Observable<{
        byNameAsc: string;
        byNameDesc: string;
    }>;
    constructor(productInterestService: UserInterestsService, translationService: TranslationService, productService: ProductService, globalMessageService: GlobalMessageService);
    ngOnInit(): void;
    private getSortLabels;
    private getProduct;
    removeInterest(relation: ProductInterestEntryRelation & {
        product$?: Observable<Product | undefined>;
    }): void;
    sortChange(sort: string): void;
    pageChange(page: number): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyInterestsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyInterestsComponent, "cx-my-interests", never, {}, {}, never, never, false, never>;
}
export {};
