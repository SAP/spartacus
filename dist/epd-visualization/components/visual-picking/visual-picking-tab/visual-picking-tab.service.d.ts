import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GlobalMessageService, WindowRef } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from './product-list/visual-picking-product-list.service';
import * as i0 from "@angular/core";
export declare class VisualPickingTabService implements OnDestroy {
    protected currentProductService: CurrentProductService;
    protected globalMessageService: GlobalMessageService;
    protected changeDetectorRef: ChangeDetectorRef;
    protected windowRef: WindowRef;
    constructor(currentProductService: CurrentProductService, globalMessageService: GlobalMessageService, changeDetectorRef: ChangeDetectorRef, windowRef: WindowRef);
    /**
     * Initialize the service.
     * @param visualViewerService The VisualViewerService instance to use.
     * @param visualPickingProductListService The VisualPickingProductListService instance to use.
     */
    initialize(visualViewerService: VisualViewerService, visualPickingProductListService: VisualPickingProductListService): void;
    ngOnDestroy(): void;
    private visualizationLoadInfoChangeSubscription;
    private getProductReferencesSubscription;
    private getFilteredProductReferencesSubscription;
    private _selectedProductCodes;
    get selectedProductCodes(): string[];
    set selectedProductCodes(selectedProducts: string[]);
    /**
     * When true, error messages will be shown when visualization load/lookup failures occur.
     */
    protected showErrorMessages: boolean;
    private _productReferences;
    private get productReferences();
    private setProductReferences;
    private get visualizationLoadStatus();
    get hideNoProductReferencesText(): boolean;
    get hideProductList(): boolean;
    get hideViewport(): boolean;
    private showErrorMessage;
    private handleLoadVisualizationInfoChange;
    private _visualViewerService;
    get visualViewerService(): VisualViewerService;
    set visualViewerService(value: VisualViewerService);
    private _visualPickingProductListService;
    get visualPickingProductListService(): VisualPickingProductListService;
    set visualPickingProductListService(value: VisualPickingProductListService);
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualPickingTabService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VisualPickingTabService>;
}
