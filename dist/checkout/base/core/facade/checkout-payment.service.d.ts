import { ActiveCartFacade, CardType, PaymentDetails } from '@spartacus/cart/base/root';
import { CheckoutPaymentFacade, CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Command, CommandService, EventService, Query, QueryNotifier, QueryService, QueryState, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutPaymentConnector } from '../connectors/checkout-payment/checkout-payment.connector';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentService implements CheckoutPaymentFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected queryService: QueryService;
    protected commandService: CommandService;
    protected eventService: EventService;
    protected checkoutPaymentConnector: CheckoutPaymentConnector;
    protected checkoutQueryFacade: CheckoutQueryFacade;
    /**
     * Returns the reload events for the cardTypes query
     */
    protected getCheckoutPaymentCardTypesQueryReloadEvents(): QueryNotifier[];
    /**
     * Returns the reset events for the cardTypes query
     */
    protected getCheckoutPaymentCardTypesQueryResetEvents(): QueryNotifier[];
    protected paymentCardTypesQuery: Query<CardType[]>;
    protected createPaymentMethodCommand: Command<PaymentDetails, unknown>;
    protected setPaymentMethodCommand: Command<PaymentDetails, unknown>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, queryService: QueryService, commandService: CommandService, eventService: EventService, checkoutPaymentConnector: CheckoutPaymentConnector, checkoutQueryFacade: CheckoutQueryFacade);
    /**
     * Performs the necessary checkout preconditions.
     */
    protected checkoutPreconditions(): Observable<[string, string]>;
    getPaymentCardTypesState(): Observable<QueryState<CardType[] | undefined>>;
    getPaymentCardTypes(): Observable<CardType[]>;
    getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>>;
    createPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown>;
    setPaymentDetails(paymentDetails: PaymentDetails): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentService>;
}
