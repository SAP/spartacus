import { HttpErrorResponse } from '@angular/common/http';
import { AddOrderEntriesContext, GetOrderEntriesContext, OrderEntriesSource, OrderEntry, ProductData, ProductImportInfo } from '@spartacus/cart/base/root';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { LoggerService, Product, ProductConnector } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class QuickOrderOrderEntriesContext implements AddOrderEntriesContext, GetOrderEntriesContext {
    protected quickOrderService: QuickOrderFacade;
    protected productConnector: ProductConnector;
    readonly type = OrderEntriesSource.QUICK_ORDER;
    protected logger: LoggerService;
    constructor(quickOrderService: QuickOrderFacade, productConnector: ProductConnector);
    getEntries(): Observable<OrderEntry[]>;
    addEntries(productsData: ProductData[]): Observable<ProductImportInfo>;
    protected handleResults(product: Product, productData: ProductData): ProductImportInfo;
    protected handleErrors(response: HttpErrorResponse, productCode: string): ProductImportInfo;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderOrderEntriesContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<QuickOrderOrderEntriesContext>;
}
