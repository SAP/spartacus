import { HttpClient } from '@angular/common/http';
import { CartModificationList } from '@spartacus/cart/base/root';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { ReorderOrderAdapter } from '@spartacus/order/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccReorderOrderAdapter implements ReorderOrderAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    reorder(orderId: string, userId: string): Observable<CartModificationList>;
    protected getReorderOrderEndpoint(orderCode: string, userId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccReorderOrderAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccReorderOrderAdapter>;
}
