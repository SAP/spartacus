import { HttpClient } from '@angular/common/http';
import { Cart } from '@spartacus/cart/base/root';
import { CheckoutCostCenterAdapter } from '@spartacus/checkout/b2b/core';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCheckoutCostCenterAdapter implements CheckoutCostCenterAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    setCostCenter(userId: string, cartId: string, costCenterId: string): Observable<Cart>;
    protected getSetCartCostCenterEndpoint(userId: string, cartId: string, costCenterId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCheckoutCostCenterAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCheckoutCostCenterAdapter>;
}
