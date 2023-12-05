import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutDeliveryAddressFacade, CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { Address, Command, CommandService, EventService, QueryState, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutDeliveryAddressConnector } from '../connectors/checkout-delivery-address/checkout-delivery-address.connector';
import * as i0 from "@angular/core";
export declare class CheckoutDeliveryAddressService implements CheckoutDeliveryAddressFacade {
    protected activeCartFacade: ActiveCartFacade;
    protected userIdService: UserIdService;
    protected eventService: EventService;
    protected commandService: CommandService;
    protected checkoutDeliveryAddressConnector: CheckoutDeliveryAddressConnector;
    protected checkoutQueryFacade: CheckoutQueryFacade;
    protected createDeliveryAddressCommand: Command<Address, unknown>;
    protected setDeliveryAddressCommand: Command<Address, unknown>;
    protected clearDeliveryAddressCommand: Command<void, unknown>;
    constructor(activeCartFacade: ActiveCartFacade, userIdService: UserIdService, eventService: EventService, commandService: CommandService, checkoutDeliveryAddressConnector: CheckoutDeliveryAddressConnector, checkoutQueryFacade: CheckoutQueryFacade);
    /**
     * Performs the necessary checkout preconditions.
     */
    protected checkoutPreconditions(): Observable<[string, string]>;
    getDeliveryAddressState(): Observable<QueryState<Address | undefined>>;
    createAndSetAddress(address: Address): Observable<unknown>;
    setDeliveryAddress(address: Address): Observable<unknown>;
    clearCheckoutDeliveryAddress(): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryAddressService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryAddressService>;
}
