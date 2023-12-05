import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { OrderAdapter } from '@spartacus/order/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccOrderAdapter implements OrderAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    placeOrder(userId: string, cartId: string, termsChecked: boolean): Observable<Order>;
    protected getPlaceOrderEndpoint(userId: string, cartId: string, termsChecked: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderAdapter>;
}
