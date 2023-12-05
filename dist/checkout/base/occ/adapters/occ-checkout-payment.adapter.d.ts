import { HttpClient } from '@angular/common/http';
import { CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { CheckoutPaymentAdapter } from '@spartacus/checkout/base/core';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccCheckoutPaymentAdapter implements CheckoutPaymentAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    private domparser;
    createPaymentDetails(userId: string, cartId: string, paymentDetails: PaymentDetails): Observable<PaymentDetails>;
    setPaymentDetails(userId: string, cartId: string, paymentDetailsId: string): Observable<unknown>;
    protected getSetPaymentDetailsEndpoint(userId: string, cartId: string, paymentDetailsId: string): string;
    getPaymentCardTypes(): Observable<CardType[]>;
    protected getPaymentCardTypesEndpoint(): string;
    protected getProviderSubInfo(userId: string, cartId: string): Observable<any>;
    protected getPaymentProviderSubInfoEndpoint(userId: string, cartId: string): string;
    protected createSubWithProvider(postUrl: string, parameters: any): Observable<any>;
    protected createDetailsWithParameters(userId: string, cartId: string, parameters: any): Observable<PaymentDetails>;
    protected getCreatePaymentDetailsEndpoint(userId: string, cartId: string): string;
    private getParamsForPaymentProvider;
    private extractPaymentDetailsFromHtml;
    private convertToMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCheckoutPaymentAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCheckoutPaymentAdapter>;
}
