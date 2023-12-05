import { EventEmitter, OnDestroy } from '@angular/core';
import { Product, ProductReference, ProductReferenceService } from '@spartacus/core';
import { EpdVisualizationConfig } from '@spartacus/epd-visualization/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { VisualPickingProductFilterService } from '../product-filter/visual-picking-product-filter.service';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import * as i0 from "@angular/core";
export declare class VisualPickingProductListService implements OnDestroy {
    protected currentProductService: CurrentProductService;
    protected productReferenceService: ProductReferenceService;
    protected visualPickingProductFilterService: VisualPickingProductFilterService;
    protected epdVisualizationConfig: EpdVisualizationConfig;
    constructor(currentProductService: CurrentProductService, productReferenceService: ProductReferenceService, visualPickingProductFilterService: VisualPickingProductFilterService, epdVisualizationConfig: EpdVisualizationConfig);
    protected readonly DEFAULT_ITEMS_PER_SLIDE = 7;
    private getFilteredProductReferencesSubscription;
    private productReferencesSubscription;
    private filteredItemsSubscription;
    /**
     * Initializes the service.
     */
    initialize(): void;
    ngOnDestroy(): void;
    private get productReferenceType();
    currentProduct$: Observable<Product>;
    private productReferences$;
    /**
     * Returns an Observable that produces the spare part product references for the current product.
     * @returns An Observable that produces the spare part product references for the current product.
     */
    getProductReferences(): Observable<ProductReference[]>;
    private _getProductReferences;
    /**
     * Returns an Observable that produces a filtered array of spare part product references for the current product.
     * Filtering is performed by the VisualPickingProductFilterService.
     * @returns An Observable that produces a filtered array of spare part product references for the current product.
     */
    getFilteredProductReferences(): Observable<ProductReference[]>;
    activeSlideStartIndex: number;
    itemsPerSlide: number;
    set selectedProductCodes(selectedProductCodes: string[]);
    get selectedProductCodes(): string[];
    private _selectedProductCodes;
    selectedProductCodesChange: EventEmitter<string[]>;
    /**
     * Used to create the list item model data for the visual picking product list.
     * Returns an observable containing an array of VisualPickingProductListItem objects created by combining the latest values from
     * an Observable producing an array of product references and
     * an Observable producing an array of selected product codes.
     * The VisualPickingProductListItem model object combines a ProductReference for a spare part and the selected state of the list item.
     * @param productReferences$ An Observable producing the array of ProductReference values to map.
     * @param selectedProductCodes$ An Observable producing the array of selected product codes.
     * @returns An Observable producing an array of VisualPickingProductListItem values.
     */
    getVisualPickingProductListItems(productReferences$: Observable<ProductReference[]>, selectedProductCodes$: Observable<string[]>): Observable<VisualPickingProductListItem[]>;
    filteredItems$: Observable<VisualPickingProductListItem[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualPickingProductListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VisualPickingProductListService>;
}
