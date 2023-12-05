import { OnDestroy, OnInit } from '@angular/core';
import { GlobalMessageService, ProductSearchPage } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PageLayoutService } from '../../../../cms-structure/page/index';
import { ViewConfig } from '../../../../shared/config/view-config';
import { ViewModes } from '../product-view/product-view.component';
import { ProductListComponentService } from './product-list-component.service';
import * as i0 from "@angular/core";
export declare class ProductListComponent implements OnInit, OnDestroy {
    private pageLayoutService;
    private productListComponentService;
    private globalMessageService;
    scrollConfig: ViewConfig;
    private subscription;
    isInfiniteScroll: boolean | undefined;
    model$: Observable<ProductSearchPage>;
    viewMode$: BehaviorSubject<ViewModes>;
    ViewModes: typeof ViewModes;
    constructor(pageLayoutService: PageLayoutService, productListComponentService: ProductListComponentService, globalMessageService: GlobalMessageService, scrollConfig: ViewConfig);
    ngOnInit(): void;
    sortList(sortCode: string): void;
    setViewMode(mode: ViewModes): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductListComponent, "cx-product-list", never, {}, {}, never, never, false, never>;
}
