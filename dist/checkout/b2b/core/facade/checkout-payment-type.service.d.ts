import { ActiveCartFacade, PaymentType } from '@spartacus/cart/base/root';
import { B2BPaymentTypeEnum, CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Command, CommandService, EventService, Query, QueryNotifier, QueryService, QueryState, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutPaymentTypeConnector } from '../connectors/checkout-payment-type/checkout-payment-type.connector';
import * as i0 from "@angular/core";
export declare class CheckoutPaymentTypeService implements CheckoutPaymentTypeFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected queryService: QueryService;
    protected commandService: CommandService;
    protected paymentTypeConnector: CheckoutPaymentTypeConnector;
    protected eventService: EventService;
    protected checkoutQueryFacade: CheckoutQueryFacade;
    protected getCheckoutPaymentTypesQueryReloadEvents(): QueryNotifier[];
    protected getCheckoutPaymentTypesQueryResetEvents(): QueryNotifier[];
    protected paymentTypesQuery: Query<PaymentType[]>;
    protected setPaymentTypeCommand: Command<{
        paymentTypeCode: string;
        purchaseOrderNumber?: string;
    }, unknown>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, queryService: QueryService, commandService: CommandService, paymentTypeConnector: CheckoutPaymentTypeConnector, eventService: EventService, checkoutQueryFacade: CheckoutQueryFacade);
    protected checkoutPreconditions(): Observable<[string, string]>;
    getPaymentTypesState(): Observable<QueryState<PaymentType[] | undefined>>;
    getPaymentTypes(): Observable<PaymentType[]>;
    setPaymentType(paymentTypeCode: B2BPaymentTypeEnum, purchaseOrderNumber?: string): Observable<unknown>;
    getSelectedPaymentTypeState(): Observable<QueryState<PaymentType | undefined>>;
    isAccountPayment(): Observable<boolean>;
    getPurchaseOrderNumberState(): Observable<QueryState<string | undefined>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutPaymentTypeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutPaymentTypeService>;
}
