import { ActiveCartFacade, DeliveryMode } from '@spartacus/cart/base/root';
import { CheckoutDeliveryModesFacade, CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Command, CommandService, EventService, Query, QueryNotifier, QueryService, QueryState, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDeliveryModesConnector } from '../connectors/checkout-delivery-modes/checkout-delivery-modes.connector';
import * as i0 from "@angular/core";
export declare class CheckoutDeliveryModesService implements CheckoutDeliveryModesFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected eventService: EventService;
    protected queryService: QueryService;
    protected commandService: CommandService;
    protected checkoutDeliveryModesConnector: CheckoutDeliveryModesConnector;
    protected checkoutQueryFacade: CheckoutQueryFacade;
    /**
     * Returns the reload events for the supportedDeliveryModes query
     */
    protected getCheckoutSupportedDeliveryModesQueryReloadEvents(): QueryNotifier[];
    /**
     * Return the reset events for the supportedDeliveryModes query
     */
    protected getCheckoutSupportedDeliveryModesQueryResetEvents(): QueryNotifier[];
    protected supportedDeliveryModesQuery: Query<DeliveryMode[]>;
    protected setDeliveryModeCommand: Command<string, unknown>;
    protected clearDeliveryModeCommand: Command<void, unknown>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, eventService: EventService, queryService: QueryService, commandService: CommandService, checkoutDeliveryModesConnector: CheckoutDeliveryModesConnector, checkoutQueryFacade: CheckoutQueryFacade);
    /**
     * Performs the necessary checkout preconditions.
     */
    protected checkoutPreconditions(): Observable<[string, string]>;
    getSupportedDeliveryModesState(): Observable<QueryState<DeliveryMode[]>>;
    getSupportedDeliveryModes(): Observable<DeliveryMode[]>;
    getSelectedDeliveryModeState(): Observable<QueryState<DeliveryMode | undefined>>;
    setDeliveryMode(mode: string): Observable<unknown>;
    clearCheckoutDeliveryMode(): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryModesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryModesService>;
}
