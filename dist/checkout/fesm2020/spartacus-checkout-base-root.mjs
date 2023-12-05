import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i3 from '@spartacus/cart/base/root';
import { MergeCartSuccessEvent, DeleteCartEvent, LoadCartEvent, RemoveCartEvent, CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import * as i1 from '@spartacus/core';
import { Config, CxEvent, LanguageSetEvent, CurrencySetEvent, LogoutEvent, LoginEvent, facadeFactory, UserAddressEvent, UpdateUserAddressEvent, DeleteUserAddressEvent, OCC_USER_ID_ANONYMOUS, LoadUserAddressesEvent, GlobalMessageType, LoadUserPaymentMethodsEvent, UserActions, provideDefaultConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { SaveCartSuccessEvent, RestoreSavedCartSuccessEvent } from '@spartacus/cart/saved-cart/root';
import { OrderPlacedEvent } from '@spartacus/order/root';
import { Subscription, merge, throwError } from 'rxjs';
import { filter, switchMap, map, take, catchError } from 'rxjs/operators';
import * as i2 from '@ngrx/store';
import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var DeliveryModePreferences;
(function (DeliveryModePreferences) {
    DeliveryModePreferences["FREE"] = "FREE";
    DeliveryModePreferences["LEAST_EXPENSIVE"] = "LEAST_EXPENSIVE";
    DeliveryModePreferences["MOST_EXPENSIVE"] = "MOST_EXPENSIVE";
})(DeliveryModePreferences || (DeliveryModePreferences = {}));
class CheckoutConfig {
}
CheckoutConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCheckoutConfig = {
    checkout: {
        steps: [
            {
                id: 'deliveryAddress',
                name: 'checkoutProgress.deliveryAddress',
                routeName: 'checkoutDeliveryAddress',
                type: ["deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */],
            },
            {
                id: 'deliveryMode',
                name: 'checkoutProgress.deliveryMode',
                routeName: 'checkoutDeliveryMode',
                type: ["deliveryMode" /* CheckoutStepType.DELIVERY_MODE */],
            },
            {
                id: 'paymentDetails',
                name: 'checkoutProgress.paymentDetails',
                routeName: 'checkoutPaymentDetails',
                type: ["paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */],
            },
            {
                id: 'reviewOrder',
                name: 'checkoutProgress.reviewOrder',
                routeName: 'checkoutReviewOrder',
                type: ["reviewOrder" /* CheckoutStepType.REVIEW_ORDER */],
            },
        ],
        express: false,
        defaultDeliveryMode: [DeliveryModePreferences.FREE],
        guest: false,
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCheckoutRoutingConfig = {
    routing: {
        routes: {
            checkoutLogin: { paths: ['checkout-login'], authFlow: true },
            checkout: { paths: ['checkout'] },
            checkoutDeliveryAddress: { paths: ['checkout/delivery-address'] },
            checkoutDeliveryMode: { paths: ['checkout/delivery-mode'] },
            checkoutPaymentDetails: { paths: ['checkout/payment-details'] },
            checkoutReviewOrder: { paths: ['checkout/review-order'] },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Emit this event to force checkout details reload
 */
class CheckoutQueryReloadEvent extends CxEvent {
}
/**
 * Event's type
 */
CheckoutQueryReloadEvent.type = 'CheckoutQueryReloadEvent';
/**
 * Emit this event to force checkout details reset
 */
class CheckoutQueryResetEvent extends CxEvent {
}
/**
 * Event's type
 */
CheckoutQueryResetEvent.type = 'CheckoutQueryResetEvent';
/**
 * An abstract event for all the checkout events.
 */
class CheckoutEvent extends CxEvent {
}
/**
 * An abstract event for all the delivery address related events.
 */
class CheckoutDeliveryAddressEvent extends CheckoutEvent {
}
/**
 * Fired when the delivery address is create cleared.
 */
class CheckoutDeliveryAddressCreatedEvent extends CheckoutDeliveryAddressEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryAddressCreatedEvent.type = 'CheckoutDeliveryAddressCreatedEvent';
/**
 * Fired when the user sets a delivery address during checkout.
 */
class CheckoutDeliveryAddressSetEvent extends CheckoutDeliveryAddressEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryAddressSetEvent.type = 'CheckoutDeliveryAddressSetEvent';
/**
 * Fired when the delivery address has to be cleared.
 */
class CheckoutDeliveryAddressClearedEvent extends CheckoutDeliveryAddressEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryAddressClearedEvent.type = 'CheckoutDeliveryAddressClearedEvent';
/**
 * An abstract event for all the delivery mode related events.
 */
class CheckoutDeliveryModeEvent extends CheckoutEvent {
}
/**
 * Fired when the delivery mode was set.
 */
class CheckoutDeliveryModeSetEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryModeSetEvent.type = 'CheckoutDeliveryModeSetEvent';
/**
 * Fired when the delivery mode has been cleared.
 */
class CheckoutDeliveryModeClearedEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryModeClearedEvent.type = 'CheckoutDeliveryModeClearedEvent';
/**
 * Fired when the delivery mode has an error when trying to be cleared.
 */
class CheckoutDeliveryModeClearedErrorEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryModeClearedErrorEvent.type = 'CheckoutDeliveryModeClearedErrorEvent';
/**
 * Emit this event to force delivery modes reload
 */
class CheckoutSupportedDeliveryModesQueryReloadEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutSupportedDeliveryModesQueryReloadEvent.type = 'CheckoutSupportedDeliveryModesQueryReloadEvent';
/**
 * Emit this event to force delivery modes reset
 */
class CheckoutSupportedDeliveryModesQueryResetEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutSupportedDeliveryModesQueryResetEvent.type = 'CheckoutSupportedDeliveryModesQueryResetEvent';
/**
 * An abstract event for all the payment details related events.
 */
class CheckoutPaymentDetailsEvent extends CheckoutEvent {
}
/**
 * Fired when the payment details have been created.
 */
class CheckoutPaymentDetailsCreatedEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentDetailsCreatedEvent.type = 'CheckoutPaymentDetailsCreatedEvent';
/**
 * Fired when the payment details have been set.
 */
class CheckoutPaymentDetailsSetEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentDetailsSetEvent.type = 'CheckoutPaymentDetailsSetEvent';
/**
 * Emit this event to force payment card types reload
 */
class CheckoutPaymentCardTypesQueryReloadEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentCardTypesQueryReloadEvent.type = 'CheckoutPaymentCardTypesQueryReloadEvent';
/**
 * Emit this event to force payment card types reset
 */
class CheckoutPaymentCardTypesQueryResetEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentCardTypesQueryResetEvent.type = 'CheckoutPaymentCardTypesQueryResetEvent';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutQueryEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onCheckoutQueryReload();
        this.onCheckoutQueryReset();
    }
    onCheckoutQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutQueryReloadEvent);
        }));
    }
    onCheckoutQueryReset() {
        this.subscriptions.add(merge(this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent), this.eventService.get(SaveCartSuccessEvent), this.eventService.get(RestoreSavedCartSuccessEvent), this.eventService.get(MergeCartSuccessEvent), this.eventService.get(OrderPlacedEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutQueryEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutQueryEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CHECKOUT_FEATURE = 'checkout';
const CHECKOUT_CORE_FEATURE = 'checkoutCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryAddressFacade {
}
CheckoutDeliveryAddressFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutDeliveryAddressFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getDeliveryAddressState',
            'createAndSetAddress',
            'setDeliveryAddress',
            'clearCheckoutDeliveryAddress',
        ],
        // TODO:#deprecation-checkout - remove once we remove ngrx
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutDeliveryAddressFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getDeliveryAddressState',
                            'createAndSetAddress',
                            'setDeliveryAddress',
                            'clearCheckoutDeliveryAddress',
                        ],
                        // TODO:#deprecation-checkout - remove once we remove ngrx
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Checkout delivery address event listener.
 */
class CheckoutDeliveryAddressEventListener {
    constructor(checkoutDeliveryAddressFacade, eventService, globalMessageService, activeCartFacade) {
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.subscriptions = new Subscription();
        this.onDeliveryAddressCreated();
        this.onDeliveryAddressSet();
        this.onDeliveryAddressCleared();
        this.onUserAddressChange();
        this.onCartDeleted();
    }
    /**
     * Registers listeners for the User address events.
     */
    onUserAddressChange() {
        this.subscriptions.add(this.eventService
            .get(UserAddressEvent)
            .pipe(filter((event) => event instanceof UpdateUserAddressEvent ||
            event instanceof DeleteUserAddressEvent), switchMap(({ userId }) => this.activeCartFacade
            .takeActiveCartId()
            .pipe(map((cartId) => ({ cartId, userId })))))
            .subscribe(({ cartId, userId }) => {
            // we want to LL the checkout (if not already loaded), in order to clear the checkout data that's potentially set on the back-end
            this.checkoutDeliveryAddressFacade.clearCheckoutDeliveryAddress();
            this.eventService.dispatch({ cartId, userId }, CheckoutSupportedDeliveryModesQueryResetEvent);
        }));
    }
    onDeliveryAddressCreated() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressCreatedEvent)
            .subscribe(({ cartId, userId }) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                this.eventService.dispatch({ userId }, LoadUserAddressesEvent);
            }
            this.globalMessageService.add({ key: 'addressForm.userAddressAddSuccess' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onDeliveryAddressSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressSetEvent)
            .subscribe(({ userId, cartId }) => {
            this.eventService.dispatch({ userId, cartId }, CheckoutSupportedDeliveryModesQueryResetEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onDeliveryAddressCleared() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryAddressClearedEvent)
            .subscribe(() => this.eventService.dispatch({}, CheckoutQueryResetEvent)));
    }
    onCartDeleted() {
        this.subscriptions.add(this.eventService
            .get(DeleteCartEvent)
            .subscribe(() => this.eventService.dispatch({}, CheckoutQueryResetEvent)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutDeliveryAddressEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressEventListener, deps: [{ token: CheckoutDeliveryAddressFacade }, { token: i1.EventService }, { token: i1.GlobalMessageService }, { token: i3.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CheckoutDeliveryAddressFacade }, { type: i1.EventService }, { type: i1.GlobalMessageService }, { type: i3.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Checkout delivery mode event listener.
 */
class CheckoutDeliveryModeEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onDeliveryModeSet();
        this.onDeliveryModeCleared();
        this.onDeliveryModeClearedError();
        this.onDeliveryModeReset();
        this.onGetSupportedDeliveryModesQueryReload();
        this.onGetSupportedDeliveryModesQueryReset();
    }
    onDeliveryModeSet() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryModeSetEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, LoadCartEvent);
        }));
    }
    onDeliveryModeCleared() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryModeClearedEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, LoadCartEvent);
        }));
    }
    onDeliveryModeClearedError() {
        this.subscriptions.add(this.eventService
            .get(CheckoutDeliveryModeClearedErrorEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, LoadCartEvent);
        }));
    }
    /**
     * Registers listeners for the delivery mode clear event.
     * This is needed for when `CheckoutSupportedDeliveryModesQueryResetEvent` is dispatched
     * as we need to update the user's cart when the delivery mode is cleared from the backend checkout details.
     */
    onDeliveryModeReset() {
        this.subscriptions.add(this.eventService
            .get(CheckoutSupportedDeliveryModesQueryResetEvent)
            .subscribe(({ userId, cartId }) => this.eventService.dispatch({
            userId,
            cartId,
            /**
             * As we know the cart is not anonymous (precondition checked),
             * we can safely use the cartId, which is actually the cart.code.
             */
            cartCode: cartId,
        }, LoadCartEvent)));
    }
    onGetSupportedDeliveryModesQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutSupportedDeliveryModesQueryReloadEvent);
        }));
    }
    onGetSupportedDeliveryModesQueryReset() {
        this.subscriptions.add(merge(this.eventService.get(LogoutEvent), this.eventService.get(LoginEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutSupportedDeliveryModesQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutDeliveryModeEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModeEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModeEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Checkout payment event listener.
 */
class CheckoutPaymentEventListener {
    constructor(eventService, globalMessageService) {
        this.eventService = eventService;
        this.globalMessageService = globalMessageService;
        this.subscriptions = new Subscription();
        this.onPaymentCreated();
        this.onPaymentSet();
        this.onGetCardTypesQueryReload();
    }
    onPaymentCreated() {
        this.subscriptions.add(this.eventService
            .get(CheckoutPaymentDetailsCreatedEvent)
            .subscribe(({ userId }) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                this.eventService.dispatch({ userId }, LoadUserPaymentMethodsEvent);
            }
            this.globalMessageService.add({ key: 'paymentForm.paymentAddedSuccessfully' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onPaymentSet() {
        this.subscriptions.add(this.eventService.get(CheckoutPaymentDetailsSetEvent).subscribe(() => {
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    onGetCardTypesQueryReload() {
        this.subscriptions.add(merge(this.eventService.get(LanguageSetEvent), this.eventService.get(CurrencySetEvent)).subscribe(() => {
            this.eventService.dispatch({}, CheckoutPaymentCardTypesQueryReloadEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutPaymentEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentEventListener, deps: [{ token: i1.EventService }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPlaceOrderEventListener {
    constructor(eventService) {
        this.eventService = eventService;
        this.subscriptions = new Subscription();
        this.onOrderPlaced();
    }
    onOrderPlaced() {
        this.subscriptions.add(this.eventService
            .get(OrderPlacedEvent)
            .subscribe(({ userId, cartId, cartCode }) => {
            this.eventService.dispatch({
                userId,
                cartId,
                cartCode,
            }, RemoveCartEvent);
            this.eventService.dispatch({}, CheckoutQueryResetEvent);
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutPlaceOrderEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPlaceOrderEventListener, deps: [{ token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPlaceOrderEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPlaceOrderEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPlaceOrderEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The event listener which dispatches legacy store actions.
 * It will be removed as soon as the legacy store is removed.
 */
// TODO:#deprecation-checkout remove once all the features using store are switched to c&q
class CheckoutLegacyStoreEventListener {
    constructor(eventService, store) {
        this.eventService = eventService;
        this.store = store;
        this.subscriptions = new Subscription();
        this.onUserAddressAction();
        this.onUserPaymentAction();
    }
    /**
     * Registers events for the user address actions.
     */
    onUserAddressAction() {
        this.subscriptions.add(this.eventService.get(LoadUserAddressesEvent).subscribe(({ userId }) => {
            /**
             * TODO:#deprecation-checkout We have to keep this here, since the user address feature is still ngrx-based.
             * Remove once it is switched from ngrx to c&q.
             * We should dispatch an event, which will reload the userAddress$ query.
             */
            this.store.dispatch(new UserActions.LoadUserAddresses(userId));
        }));
    }
    /**
     * Registers events for the user payment actions.
     */
    onUserPaymentAction() {
        this.subscriptions.add(this.eventService
            .get(LoadUserPaymentMethodsEvent)
            .subscribe(({ userId }) => {
            this.store.dispatch(
            /**
             * TODO:#deprecation-checkout We have to keep this here, since the user payment feature is still ngrx-based.
             * Remove once it is switched from ngrx to c&q.
             * We should dispatch an event, which will load the userPayment$ query.
             */
            new UserActions.LoadUserPaymentMethods(userId));
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
CheckoutLegacyStoreEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutLegacyStoreEventListener, deps: [{ token: i1.EventService }, { token: i2.Store }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutLegacyStoreEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutLegacyStoreEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutLegacyStoreEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.Store }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutEventModule {
    constructor(_checkoutQueryEventListener, _checkoutDeliveryAddressEventListener, _checkoutDeliveryModeEventListener, _checkoutPaymentEventListener, _checkoutPlaceOrderEventListener, _checkoutLegacyStoreEventListener) {
        // Intentional empty constructor
    }
}
CheckoutEventModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule, deps: [{ token: CheckoutQueryEventListener }, { token: CheckoutDeliveryAddressEventListener }, { token: CheckoutDeliveryModeEventListener }, { token: CheckoutPaymentEventListener }, { token: CheckoutPlaceOrderEventListener }, { token: CheckoutLegacyStoreEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutEventModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule });
CheckoutEventModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutEventModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: CheckoutQueryEventListener }, { type: CheckoutDeliveryAddressEventListener }, { type: CheckoutDeliveryModeEventListener }, { type: CheckoutPaymentEventListener }, { type: CheckoutPlaceOrderEventListener }, { type: CheckoutLegacyStoreEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Interceptor that handles "Cart not found" errors while a user is in a checkout step.
 *
 * When a user doing a checkout has a "Cart not found" error, he is redirected to checkout and the cart is reloaded.
 * If a "Cart not found" error happens and the user is not on checkout, this interceptor does not perform any actions.
 */
class CheckoutCartInterceptor {
    constructor(routingService, multiCartFacade) {
        this.routingService = routingService;
        this.multiCartFacade = multiCartFacade;
    }
    intercept(request, next) {
        return this.routingService.getRouterState().pipe(take(1), switchMap((state) => {
            return next.handle(request).pipe(catchError((response) => {
                if (response instanceof HttpErrorResponse &&
                    this.isUserInCheckoutRoute(state.state?.semanticRoute)) {
                    if (this.isCartNotFoundError(response)) {
                        this.routingService.go({ cxRoute: 'cart' });
                        const cartCode = this.getCartIdFromError(response);
                        if (cartCode) {
                            this.multiCartFacade.reloadCart(cartCode);
                        }
                    }
                }
                return throwError(response);
            }));
        }));
    }
    /**
     * Returns true if the parameter semantic route is part of "checkout"
     * Checkout semantic routes:
     * checkout
     * checkoutPaymentType
     * CheckoutDeliveryAddress
     * checkoutDeliveryMode
     * checkoutPaymentDetails
     * checkoutReviewOrder
     * checkoutLogin
     * @param semanticRoute
     */
    isUserInCheckoutRoute(semanticRoute) {
        return semanticRoute?.toLowerCase().startsWith('checkout') ?? false;
    }
    /**
     * Checks of the error is for a cart not found, i.e. the cart doesn't exist anymore
     *
     * @param response
     */
    isCartNotFoundError(response) {
        return (response.status === 400 &&
            response.error?.errors?.[0]?.type === 'CartError' &&
            response.error?.errors?.[0]?.reason === 'notFound');
    }
    getCartIdFromError(response) {
        return response.error?.errors?.[0]?.subject;
    }
}
CheckoutCartInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCartInterceptor, deps: [{ token: i1.RoutingService }, { token: i3.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCartInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCartInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCartInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i3.MultiCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useExisting: CheckoutCartInterceptor,
        multi: true,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CHECKOUT_BASE_CMS_COMPONENTS = [
    'CheckoutOrchestrator',
    'CheckoutOrderSummary',
    'CheckoutProgress',
    'CheckoutProgressMobileBottom',
    'CheckoutProgressMobileTop',
    'CheckoutDeliveryMode',
    'CheckoutPaymentDetails',
    'CheckoutPlaceOrder',
    'CheckoutReviewOrder',
    'CheckoutReviewPayment',
    'CheckoutReviewShipping',
    'CheckoutReviewOverview',
    'CheckoutDeliveryAddress',
    'GuestCheckoutLoginComponent',
];
function defaultCheckoutComponentsConfig() {
    const config = {
        featureModules: {
            [CHECKOUT_FEATURE]: {
                cmsComponents: CHECKOUT_BASE_CMS_COMPONENTS,
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [CHECKOUT_CORE_FEATURE]: CHECKOUT_FEATURE,
        },
    };
    return config;
}
class CheckoutRootModule {
}
CheckoutRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, imports: [CheckoutEventModule] });
CheckoutRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultCheckoutRoutingConfig),
        provideDefaultConfig(defaultCheckoutConfig),
        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
    ], imports: [CheckoutEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CheckoutEventModule],
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultCheckoutRoutingConfig),
                        provideDefaultConfig(defaultCheckoutConfig),
                        provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryModesFacade {
}
CheckoutDeliveryModesFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModesFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutDeliveryModesFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getSupportedDeliveryModesState',
            'getSupportedDeliveryModes',
            'setDeliveryMode',
            'getSelectedDeliveryModeState',
            'clearCheckoutDeliveryMode',
        ],
        // TODO:#deprecation-checkout - remove once we remove ngrx
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutDeliveryModesFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getSupportedDeliveryModesState',
                            'getSupportedDeliveryModes',
                            'setDeliveryMode',
                            'getSelectedDeliveryModeState',
                            'clearCheckoutDeliveryMode',
                        ],
                        // TODO:#deprecation-checkout - remove once we remove ngrx
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentFacade {
}
CheckoutPaymentFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutPaymentFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: [
            'getPaymentCardTypesState',
            'getPaymentCardTypes',
            'getPaymentDetailsState',
            'createPaymentDetails',
            'setPaymentDetails',
        ],
        // TODO:#deprecation-checkout - remove once we remove ngrx
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutPaymentFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: [
                            'getPaymentCardTypesState',
                            'getPaymentCardTypes',
                            'getPaymentDetailsState',
                            'createPaymentDetails',
                            'setPaymentDetails',
                        ],
                        // TODO:#deprecation-checkout - remove once we remove ngrx
                        async: true,
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutQueryFacade {
}
CheckoutQueryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutQueryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CheckoutQueryFacade,
        feature: CHECKOUT_CORE_FEATURE,
        methods: ['getCheckoutDetailsState'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CheckoutQueryFacade,
                        feature: CHECKOUT_CORE_FEATURE,
                        methods: ['getCheckoutDetailsState'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { CHECKOUT_BASE_CMS_COMPONENTS, CHECKOUT_CORE_FEATURE, CHECKOUT_FEATURE, CheckoutConfig, CheckoutDeliveryAddressClearedEvent, CheckoutDeliveryAddressCreatedEvent, CheckoutDeliveryAddressEvent, CheckoutDeliveryAddressEventListener, CheckoutDeliveryAddressFacade, CheckoutDeliveryAddressSetEvent, CheckoutDeliveryModeClearedErrorEvent, CheckoutDeliveryModeClearedEvent, CheckoutDeliveryModeEvent, CheckoutDeliveryModeEventListener, CheckoutDeliveryModeSetEvent, CheckoutDeliveryModesFacade, CheckoutEvent, CheckoutEventModule, CheckoutPaymentCardTypesQueryReloadEvent, CheckoutPaymentCardTypesQueryResetEvent, CheckoutPaymentDetailsCreatedEvent, CheckoutPaymentDetailsEvent, CheckoutPaymentDetailsSetEvent, CheckoutPaymentEventListener, CheckoutPaymentFacade, CheckoutQueryFacade, CheckoutQueryReloadEvent, CheckoutQueryResetEvent, CheckoutRootModule, CheckoutSupportedDeliveryModesQueryReloadEvent, CheckoutSupportedDeliveryModesQueryResetEvent, DeliveryModePreferences, defaultCheckoutComponentsConfig };
//# sourceMappingURL=spartacus-checkout-base-root.mjs.map
