import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { Product } from '@spartacus/core';
import { BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ProductItem } from './product-item.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360ProductListingComponent implements OnInit {
    protected breakpointService: BreakpointService;
    emptyResultDescription: string;
    headerInactive: boolean;
    headerText: string;
    products: Array<ProductItem | Product>;
    headerTemplate: TemplateRef<void>;
    clickHeader: EventEmitter<void>;
    selectProduct: EventEmitter<Product>;
    numberofColumns$: Observable<number>;
    showMore: boolean;
    constructor(breakpointService: BreakpointService);
    ngOnInit(): void;
    toggleShowMore(): void;
    protected getNumberofColumns(): Observable<number>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360ProductListingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360ProductListingComponent, "cx-asm-customer-360-product-listing", never, { "emptyResultDescription": "emptyResultDescription"; "headerInactive": "headerInactive"; "headerText": "headerText"; "products": "products"; "headerTemplate": "headerTemplate"; }, { "clickHeader": "clickHeader"; "selectProduct": "selectProduct"; }, never, never, false, never>;
}
