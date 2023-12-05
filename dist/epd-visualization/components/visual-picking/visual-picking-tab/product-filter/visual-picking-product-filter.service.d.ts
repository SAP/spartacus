import { ProductReference } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class VisualPickingProductFilterService {
    constructor();
    /**
     * The current filter value.
     * @param filter The filter value to apply.
     */
    set filter(filterStr: string);
    get filter(): string;
    private _filter;
    private filter$;
    /**
     * The set of fields in product objects to perform matching against.
     */
    protected fieldsToMatch: string[];
    protected applyFilter(filterToApply: string, unfilteredProductReferences: ProductReference[]): ProductReference[];
    /**
     * Returns an Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
     * @param unfilteredProductReferences$ An Observable that returns the unfiltered ProductReference[] to apply filtering to.
     * @returns An Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
     */
    getFilteredProducts(unfilteredProductReferences$: Observable<ProductReference[]>): Observable<ProductReference[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualPickingProductFilterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VisualPickingProductFilterService>;
}
