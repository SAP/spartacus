import * as i0 from '@angular/core';
import { Injectable, NgModule, InjectionToken } from '@angular/core';
import * as i2 from '@spartacus/core';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, PageMetaResolver, PageType } from '@spartacus/core';
import * as i4 from '@spartacus/checkout/base/root';
import { CheckoutDeliveryAddressCreatedEvent, CheckoutDeliveryAddressSetEvent, CheckoutDeliveryAddressClearedEvent, CheckoutSupportedDeliveryModesQueryReloadEvent, CheckoutSupportedDeliveryModesQueryResetEvent, CheckoutDeliveryModeSetEvent, CheckoutDeliveryModeClearedEvent, CheckoutDeliveryModeClearedErrorEvent, CheckoutPaymentCardTypesQueryReloadEvent, CheckoutPaymentCardTypesQueryResetEvent, CheckoutPaymentDetailsCreatedEvent, CheckoutPaymentDetailsSetEvent, CheckoutQueryReloadEvent, CheckoutQueryResetEvent, CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade, CheckoutPaymentFacade, CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import { combineLatest, throwError } from 'rxjs';
import { switchMap, map, tap, take, catchError, filter } from 'rxjs/operators';
import * as i1 from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryAddressAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryAddressConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    createAddress(userId, cartId, address) {
        return this.adapter.createAddress(userId, cartId, address);
    }
    setAddress(userId, cartId, addressId) {
        return this.adapter.setAddress(userId, cartId, addressId);
    }
    clearCheckoutDeliveryAddress(userId, cartId) {
        return this.adapter.clearCheckoutDeliveryAddress(userId, cartId);
    }
}
CheckoutDeliveryAddressConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressConnector, deps: [{ token: CheckoutDeliveryAddressAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CheckoutDeliveryAddressAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryModesAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryModesConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    setMode(userId, cartId, deliveryModeId) {
        return this.adapter.setMode(userId, cartId, deliveryModeId);
    }
    getSupportedModes(userId, cartId) {
        return this.adapter.getSupportedModes(userId, cartId);
    }
    clearCheckoutDeliveryMode(userId, cartId) {
        return this.adapter.clearCheckoutDeliveryMode(userId, cartId);
    }
}
CheckoutDeliveryModesConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesConnector, deps: [{ token: CheckoutDeliveryModesAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModesConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CheckoutDeliveryModesAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    createPaymentDetails(userId, cartId, paymentDetails) {
        return this.adapter.createPaymentDetails(userId, cartId, paymentDetails);
    }
    setPaymentDetails(userId, cartId, paymentDetailsId) {
        return this.adapter.setPaymentDetails(userId, cartId, paymentDetailsId);
    }
    getPaymentCardTypes() {
        return this.adapter.getPaymentCardTypes();
    }
}
CheckoutPaymentConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentConnector, deps: [{ token: CheckoutPaymentAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CheckoutPaymentAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getCheckoutDetails(userId, cartId) {
        return this.adapter.getCheckoutDetails(userId, cartId);
    }
}
CheckoutConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConnector, deps: [{ token: CheckoutAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CheckoutAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryAddressService {
    constructor(activeCartFacade, userIdService, eventService, commandService, checkoutDeliveryAddressConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
        this.commandService = commandService;
        this.checkoutDeliveryAddressConnector = checkoutDeliveryAddressConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.createDeliveryAddressCommand = this.commandService.create((payload) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            return this.checkoutDeliveryAddressConnector
                .createAddress(userId, cartId, payload)
                .pipe(map((address) => {
                var _a;
                address.titleCode = payload.titleCode;
                if ((_a = payload.region) === null || _a === void 0 ? void 0 : _a.isocodeShort) {
                    address.region = Object.assign(Object.assign({}, address.region), { isocodeShort: payload.region.isocodeShort });
                }
                return address;
            }), tap((address) => this.eventService.dispatch({ userId, cartId, address }, CheckoutDeliveryAddressCreatedEvent)));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.setDeliveryAddressCommand = this.commandService.create((address) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            const addressId = address.id;
            if (!addressId) {
                throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryAddressConnector
                .setAddress(userId, cartId, addressId)
                .pipe(tap(() => {
                this.eventService.dispatch({
                    userId,
                    cartId,
                    address,
                }, CheckoutDeliveryAddressSetEvent);
            }));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.clearDeliveryAddressCommand = this.commandService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryAddressConnector
            .clearCheckoutDeliveryAddress(userId, cartId)
            .pipe(tap(() => {
            this.eventService.dispatch({
                userId,
                cartId,
            }, CheckoutDeliveryAddressClearedEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getDeliveryAddressState() {
        return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => {
            var _a;
            return (Object.assign(Object.assign({}, state), { data: (_a = state.data) === null || _a === void 0 ? void 0 : _a.deliveryAddress }));
        }));
    }
    createAndSetAddress(address) {
        return this.createDeliveryAddressCommand.execute(address);
    }
    setDeliveryAddress(address) {
        return this.setDeliveryAddressCommand.execute(address);
    }
    clearCheckoutDeliveryAddress() {
        return this.clearDeliveryAddressCommand.execute();
    }
}
CheckoutDeliveryAddressService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }, { token: i2.CommandService }, { token: CheckoutDeliveryAddressConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }, { type: i2.CommandService }, { type: CheckoutDeliveryAddressConnector }, { type: i4.CheckoutQueryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutDeliveryModesService {
    /**
     * Returns the reload events for the supportedDeliveryModes query
     */
    getCheckoutSupportedDeliveryModesQueryReloadEvents() {
        return [CheckoutSupportedDeliveryModesQueryReloadEvent];
    }
    /**
     * Return the reset events for the supportedDeliveryModes query
     */
    getCheckoutSupportedDeliveryModesQueryResetEvents() {
        return [CheckoutSupportedDeliveryModesQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, eventService, queryService, commandService, checkoutDeliveryModesConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.checkoutDeliveryModesConnector = checkoutDeliveryModesConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.supportedDeliveryModesQuery = this.queryService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector.getSupportedModes(userId, cartId))), {
            reloadOn: this.getCheckoutSupportedDeliveryModesQueryReloadEvents(),
            resetOn: this.getCheckoutSupportedDeliveryModesQueryResetEvents(),
        });
        this.setDeliveryModeCommand = this.commandService.create((deliveryModeCode) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector
            .setMode(userId, cartId, deliveryModeCode)
            .pipe(tap(() => {
            this.eventService.dispatch({ userId, cartId, cartCode: cartId, deliveryModeCode }, CheckoutDeliveryModeSetEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.clearDeliveryModeCommand = this.commandService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector
            .clearCheckoutDeliveryMode(userId, cartId)
            .pipe(tap(() => {
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
            }, CheckoutDeliveryModeClearedEvent);
        }), catchError((error) => {
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
            }, CheckoutDeliveryModeClearedErrorEvent);
            return throwError(error);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getSupportedDeliveryModesState() {
        return this.supportedDeliveryModesQuery.getState();
    }
    getSupportedDeliveryModes() {
        return this.getSupportedDeliveryModesState().pipe(filter((state) => !state.loading), map((state) => { var _a; return (_a = state.data) !== null && _a !== void 0 ? _a : []; }));
    }
    getSelectedDeliveryModeState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => { var _a; return (Object.assign(Object.assign({}, state), { data: (_a = state.data) === null || _a === void 0 ? void 0 : _a.deliveryMode })); }));
    }
    setDeliveryMode(mode) {
        return this.setDeliveryModeCommand.execute(mode);
    }
    clearCheckoutDeliveryMode() {
        return this.clearDeliveryModeCommand.execute();
    }
}
CheckoutDeliveryModesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: CheckoutDeliveryModesConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: CheckoutDeliveryModesConnector }, { type: i4.CheckoutQueryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentService {
    /**
     * Returns the reload events for the cardTypes query
     */
    getCheckoutPaymentCardTypesQueryReloadEvents() {
        return [CheckoutPaymentCardTypesQueryReloadEvent];
    }
    /**
     * Returns the reset events for the cardTypes query
     */
    getCheckoutPaymentCardTypesQueryResetEvents() {
        return [CheckoutPaymentCardTypesQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, queryService, commandService, eventService, checkoutPaymentConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.eventService = eventService;
        this.checkoutPaymentConnector = checkoutPaymentConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.paymentCardTypesQuery = this.queryService.create(() => this.checkoutPaymentConnector.getPaymentCardTypes(), {
            reloadOn: this.getCheckoutPaymentCardTypesQueryReloadEvents(),
            resetOn: this.getCheckoutPaymentCardTypesQueryResetEvents(),
        });
        this.createPaymentMethodCommand = this.commandService.create((paymentDetails) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutPaymentConnector
            .createPaymentDetails(userId, cartId, paymentDetails)
            .pipe(tap((response) => this.eventService.dispatch({ userId, cartId, paymentDetails: response }, CheckoutPaymentDetailsCreatedEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.setPaymentMethodCommand = this.commandService.create((paymentDetails) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            const paymentDetailsId = paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.id;
            if (!paymentDetailsId) {
                throw new Error('Checkout conditions not met');
            }
            return this.checkoutPaymentConnector
                .setPaymentDetails(userId, cartId, paymentDetailsId)
                .pipe(tap(() => this.eventService.dispatch({
                userId,
                cartId,
                paymentDetailsId,
            }, CheckoutPaymentDetailsSetEvent)));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getPaymentCardTypesState() {
        return this.paymentCardTypesQuery.getState();
    }
    getPaymentCardTypes() {
        return this.getPaymentCardTypesState().pipe(map((state) => { var _a; return (_a = state.data) !== null && _a !== void 0 ? _a : []; }));
    }
    getPaymentDetailsState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => { var _a; return (Object.assign(Object.assign({}, state), { data: (_a = state.data) === null || _a === void 0 ? void 0 : _a.paymentInfo })); }));
    }
    createPaymentDetails(paymentDetails) {
        return this.createPaymentMethodCommand.execute(paymentDetails);
    }
    setPaymentDetails(paymentDetails) {
        return this.setPaymentMethodCommand.execute(paymentDetails);
    }
}
CheckoutPaymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i2.EventService }, { token: CheckoutPaymentConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i2.EventService }, { type: CheckoutPaymentConnector }, { type: i4.CheckoutQueryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutQueryService {
    /**
     * Returns the reload events for the checkout query.
     */
    getCheckoutQueryReloadEvents() {
        return [CheckoutQueryReloadEvent];
    }
    /**
     * Returns the reset events for the checkout query.
     */
    getCheckoutQueryResetEvents() {
        return [CheckoutQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, queryService, checkoutConnector) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.checkoutConnector = checkoutConnector;
        this.checkoutQuery$ = this.queryService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutConnector.getCheckoutDetails(userId, cartId))), {
            reloadOn: this.getCheckoutQueryReloadEvents(),
            resetOn: this.getCheckoutQueryResetEvents(),
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getCheckoutDetailsState() {
        return this.checkoutQuery$.getState();
    }
}
CheckoutQueryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: CheckoutConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutQueryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutQueryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: CheckoutConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    CheckoutDeliveryAddressService,
    {
        provide: CheckoutDeliveryAddressFacade,
        useExisting: CheckoutDeliveryAddressService,
    },
    CheckoutDeliveryModesService,
    {
        provide: CheckoutDeliveryModesFacade,
        useExisting: CheckoutDeliveryModesService,
    },
    CheckoutPaymentService,
    {
        provide: CheckoutPaymentFacade,
        useExisting: CheckoutPaymentService,
    },
    CheckoutQueryService,
    {
        provide: CheckoutQueryFacade,
        useExisting: CheckoutQueryService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Resolves the page data for all Content Pages based on the `PageType.CONTENT_PAGE`
 * and the `MultiStepCheckoutSummaryPageTemplate`. If the checkout page matches this template,
 * the more generic `ContentPageMetaResolver` is overridden by this resolver.
 *
 * The page title and robots are resolved in this implementation only.
 */
class CheckoutPageMetaResolver extends PageMetaResolver {
    constructor(translationService, activeCartFacade, basePageMetaResolver) {
        super();
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.basePageMetaResolver = basePageMetaResolver;
        this.pageType = PageType.CONTENT_PAGE;
        this.pageTemplate = 'MultiStepCheckoutSummaryPageTemplate';
    }
    /**
     * @override
     * Resolves the page title for the Checkout Page to include checkout step.
     * The page title used by the browser (history, tabs) and crawlers.
     *
     * The title from the page data is ignored for this page title.
     */
    resolveTitle() {
        return this.basePageMetaResolver.resolveTitle();
    }
    /**
     * Resolves the page heading for the Checkout Page.
     * The page heading is used in the UI (`<h1>`), where as the page
     * title is used by the browser and crawlers.
     */
    resolveHeading() {
        return this.translationService.translate('pageMetaResolver.checkout.title');
    }
    resolveDescription() {
        return this.basePageMetaResolver.resolveDescription();
    }
    resolveRobots() {
        return this.basePageMetaResolver.resolveRobots();
    }
}
CheckoutPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPageMetaResolver, deps: [{ token: i2.TranslationService }, { token: i1.ActiveCartFacade }, { token: i2.BasePageMetaResolver }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.TranslationService }, { type: i1.ActiveCartFacade }, { type: i2.BasePageMetaResolver }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCoreModule {
}
CheckoutCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule });
CheckoutCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule, providers: [
        ...facadeProviders,
        CheckoutDeliveryAddressConnector,
        CheckoutDeliveryModesConnector,
        CheckoutPaymentConnector,
        CheckoutConnector,
        CheckoutPageMetaResolver,
        {
            provide: PageMetaResolver,
            useExisting: CheckoutPageMetaResolver,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CheckoutDeliveryAddressConnector,
                        CheckoutDeliveryModesConnector,
                        CheckoutPaymentConnector,
                        CheckoutConnector,
                        CheckoutPageMetaResolver,
                        {
                            provide: PageMetaResolver,
                            useExisting: CheckoutPageMetaResolver,
                            multi: true,
                        },
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
const DELIVERY_MODE_NORMALIZER = new InjectionToken('DeliveryModeNormalizer');

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
const PAYMENT_DETAILS_SERIALIZER = new InjectionToken('PaymentDetailsSerializer');
const PAYMENT_CARD_TYPE_NORMALIZER = new InjectionToken('PaymentCardTypeNormalizer');

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
const CHECKOUT_NORMALIZER = new InjectionToken('CheckoutNormalizer');

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

/**
 * Generated bundle index. Do not edit.
 */

export { CHECKOUT_NORMALIZER, CheckoutAdapter, CheckoutConnector, CheckoutCoreModule, CheckoutDeliveryAddressAdapter, CheckoutDeliveryAddressConnector, CheckoutDeliveryAddressService, CheckoutDeliveryModesAdapter, CheckoutDeliveryModesConnector, CheckoutDeliveryModesService, CheckoutPageMetaResolver, CheckoutPaymentAdapter, CheckoutPaymentConnector, CheckoutPaymentService, CheckoutQueryService, DELIVERY_MODE_NORMALIZER, PAYMENT_CARD_TYPE_NORMALIZER, PAYMENT_DETAILS_SERIALIZER };
//# sourceMappingURL=spartacus-checkout-base-core.mjs.map
