import { ProductImportInfoService } from '@spartacus/cart/base/core';
import { AddOrderEntriesContext, GetOrderEntriesContext, MultiCartFacade, OrderEntriesSource, OrderEntry, ProductData, ProductImportInfo } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SavedCartOrderEntriesContext implements AddOrderEntriesContext, GetOrderEntriesContext {
    protected importInfoService: ProductImportInfoService;
    protected userIdService: UserIdService;
    protected multiCartService: MultiCartFacade;
    protected savedCartService: SavedCartFacade;
    protected routingService: RoutingService;
    readonly type = OrderEntriesSource.SAVED_CART;
    constructor(importInfoService: ProductImportInfoService, userIdService: UserIdService, multiCartService: MultiCartFacade, savedCartService: SavedCartFacade, routingService: RoutingService);
    protected savedCartId$: Observable<any>;
    addEntries(products: ProductData[]): Observable<ProductImportInfo>;
    getEntries(): Observable<OrderEntry[]>;
    protected add(products: ProductData[]): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SavedCartOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SavedCartOrderEntriesContext>;
}
