import { HttpClient } from '@angular/common/http';
import { CheckoutAdapter } from '@spartacus/checkout/base/core';
import { CheckoutState } from '@spartacus/checkout/base/root';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCheckoutAdapter implements CheckoutAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    getCheckoutDetails(userId: string, cartId: string): Observable<CheckoutState>;
    protected getGetCheckoutDetailsEndpoint(userId: string, cartId: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCheckoutAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCheckoutAdapter>;
}
