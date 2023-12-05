import { PaymentDetails } from '@spartacus/cart/base/root';
import { Command, CommandService, Query, QueryService, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { DigitalPaymentsAdapter } from '../adapters/digital-payments.adapter';
import { DpPaymentRequest } from '../models/dp-checkout.model';
import * as i0 from "@angular/core";
export declare class DpCheckoutPaymentService {
    protected dpAdapter: DigitalPaymentsAdapter;
    protected command: CommandService;
    protected query: QueryService;
    protected userIdService: UserIdService;
    constructor(dpAdapter: DigitalPaymentsAdapter, command: CommandService, query: QueryService, userIdService: UserIdService);
    protected RequestUrlQuery: Query<DpPaymentRequest>;
    getCardRegistrationDetails(): Observable<DpPaymentRequest | undefined>;
    protected createPaymentDetailsCommand: Command<{
        sessionId: string;
        signature: string;
    }, PaymentDetails>;
    createPaymentDetails(sessionId: string, signature: string): Observable<PaymentDetails>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DpCheckoutPaymentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DpCheckoutPaymentService>;
}
