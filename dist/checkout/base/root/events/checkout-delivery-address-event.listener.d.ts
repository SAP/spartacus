import { OnDestroy } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { EventService, GlobalMessageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CheckoutDeliveryAddressFacade } from '../facade/checkout-delivery-address.facade';
import * as i0 from "@angular/core";
/**
 * Checkout delivery address event listener.
 */
export declare class CheckoutDeliveryAddressEventListener implements OnDestroy {
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected eventService: EventService;
    protected globalMessageService: GlobalMessageService;
    protected activeCartFacade: ActiveCartFacade;
    protected subscriptions: Subscription;
    constructor(checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, eventService: EventService, globalMessageService: GlobalMessageService, activeCartFacade: ActiveCartFacade);
    /**
     * Registers listeners for the User address events.
     */
    protected onUserAddressChange(): void;
    protected onDeliveryAddressCreated(): void;
    protected onDeliveryAddressSet(): void;
    protected onDeliveryAddressCleared(): void;
    protected onCartDeleted(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutDeliveryAddressEventListener, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutDeliveryAddressEventListener>;
}
