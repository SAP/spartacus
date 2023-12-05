import { ICON_TYPE } from '@spartacus/storefront';
import { VisualPickingProductFilterService } from './visual-picking-product-filter.service';
import * as i0 from "@angular/core";
export declare class VisualPickingProductFilterComponent {
    protected visualPickingProductFilterService: VisualPickingProductFilterService;
    constructor(visualPickingProductFilterService: VisualPickingProductFilterService);
    /**
     * The filter input value.
     */
    set filter(filter: string);
    get filter(): string;
    iconTypes: typeof ICON_TYPE;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualPickingProductFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VisualPickingProductFilterComponent, "cx-epd-visualization-product-filter", never, { "filter": "filter"; }, {}, never, never, false, never>;
}
