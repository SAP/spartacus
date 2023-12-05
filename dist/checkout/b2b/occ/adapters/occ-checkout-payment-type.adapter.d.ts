import { HttpClient } from '@angular/common/http';
import { Cart, PaymentType } from '@spartacus/cart/base/root';
import { CheckoutPaymentTypeAdapter } from '@spartacus/checkout/b2b/core';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCheckoutPaymentTypeAdapter implements CheckoutPaymentTypeAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    getPaymentTypes(): Observable<PaymentType[]>;
    protected getPaymentTypesEndpoint(): string;
    setPaymentType(userId: string, cartId: string, paymentType: string, purchaseOrderNumber?: string): Observable<Cart>;
    protected getSetCartPaymentTypeEndpoint(userId: string, cartId: string, paymentType: string, purchaseOrderNumber?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCheckoutPaymentTypeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCheckoutPaymentTypeAdapter>;
}
