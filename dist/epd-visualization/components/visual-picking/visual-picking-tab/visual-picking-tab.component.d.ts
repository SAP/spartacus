import { AfterViewInit } from '@angular/core';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from './product-list/visual-picking-product-list.service';
import { VisualPickingTabService } from './visual-picking-tab.service';
import * as i0 from "@angular/core";
export declare class VisualPickingTabComponent implements AfterViewInit {
    protected visualPickingTabService: VisualPickingTabService;
    constructor(visualPickingTabService: VisualPickingTabService);
    ngAfterViewInit(): void;
    get selectedProductCodes(): string[];
    set selectedProductCodes(selectedProducts: string[]);
    visualViewerService: VisualViewerService;
    visualPickingProductListService: VisualPickingProductListService;
    get hideNoProductReferencesIndicator(): boolean;
    get hideProductList(): boolean;
    get hideViewport(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualPickingTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VisualPickingTabComponent, "cx-epd-visualization-visual-picking-tab", never, {}, {}, never, never, false, never>;
}
