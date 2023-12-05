import { HttpClient } from '@angular/common/http';
import { PaymentDetails } from '@spartacus/cart/base/root';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import { DigitalPaymentsAdapter } from './digital-payments.adapter';
import * as i0 from "@angular/core";
export declare class OccDigitalPaymentsAdapter implements DigitalPaymentsAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    private readonly paramEncoder;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    createPaymentRequest(userId: string, cartId?: string): Observable<DpPaymentRequest>;
    createPaymentDetails(sessionId: string, signature: string, userId: string, cartId?: string): Observable<PaymentDetails>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccDigitalPaymentsAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccDigitalPaymentsAdapter>;
}
