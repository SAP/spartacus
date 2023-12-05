import { ProductImportInfoService } from '@spartacus/cart/base/core';
import { ActiveCartFacade, AddOrderEntriesContext, GetOrderEntriesContext, OrderEntriesSource, OrderEntry, ProductData, ProductImportInfo } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ActiveCartOrderEntriesContext implements AddOrderEntriesContext, GetOrderEntriesContext {
    protected importInfoService: ProductImportInfoService;
    protected activeCartFacade: ActiveCartFacade;
    readonly type = OrderEntriesSource.ACTIVE_CART;
    constructor(importInfoService: ProductImportInfoService, activeCartFacade: ActiveCartFacade);
    addEntries(products: ProductData[]): Observable<ProductImportInfo>;
    getEntries(): Observable<OrderEntry[]>;
    protected add(products: ProductData[]): Observable<string>;
    protected mapProductsToOrderEntries(products: ProductData[]): OrderEntry[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ActiveCartOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ActiveCartOrderEntriesContext>;
}
