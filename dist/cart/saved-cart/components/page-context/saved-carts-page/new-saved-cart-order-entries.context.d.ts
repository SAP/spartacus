import { ProductImportInfoService } from '@spartacus/cart/base/core';
import { AddOrderEntriesContext, MultiCartFacade, OrderEntriesSource, ProductData, ProductImportInfo } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NewSavedCartOrderEntriesContext implements AddOrderEntriesContext {
    protected importInfoService: ProductImportInfoService;
    protected userIdService: UserIdService;
    protected multiCartService: MultiCartFacade;
    protected savedCartService: SavedCartFacade;
    readonly type = OrderEntriesSource.NEW_SAVED_CART;
    constructor(importInfoService: ProductImportInfoService, userIdService: UserIdService, multiCartService: MultiCartFacade, savedCartService: SavedCartFacade);
    addEntries(products: ProductData[], savedCartInfo?: {
        name: string;
        description: string;
    }): Observable<ProductImportInfo>;
    protected add(products: ProductData[], savedCartInfo?: {
        name: string;
        description: string;
    }): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NewSavedCartOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NewSavedCartOrderEntriesContext>;
}
