import { ICON_TYPE } from '@spartacus/storefront';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import * as i0 from "@angular/core";
export declare class FutureStockAccordionComponent {
    protected futureStockService: FutureStockFacade;
    futureStocks$: import("rxjs").Observable<any>;
    expanded: boolean;
    iconType: typeof ICON_TYPE;
    constructor(futureStockService: FutureStockFacade);
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FutureStockAccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FutureStockAccordionComponent, "cx-future-stock-accordion", never, {}, {}, never, never, false, never>;
}
