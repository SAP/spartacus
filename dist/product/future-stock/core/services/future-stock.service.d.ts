import { Observable } from 'rxjs';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { RoutingService, UserIdService } from '@spartacus/core';
import { FutureStockConnector } from '../connectors';
import { ProductFutureStock } from '../model';
import * as i0 from "@angular/core";
export declare class FutureStockService implements FutureStockFacade {
    protected userIdService: UserIdService;
    protected futureStockConnector: FutureStockConnector;
    protected routingService: RoutingService;
    protected readonly PRODUCT_KEY = "productCode";
    protected futureStockState$: Observable<ProductFutureStock | undefined>;
    /**
     * Get future stock
     */
    getFutureStock(): Observable<ProductFutureStock | undefined>;
    constructor(userIdService: UserIdService, futureStockConnector: FutureStockConnector, routingService: RoutingService);
    static ɵfac: i0.ɵɵFactoryDeclaration<FutureStockService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FutureStockService>;
}
