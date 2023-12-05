import * as i0 from '@angular/core';
import { Injectable, NgModule, InjectionToken } from '@angular/core';
import * as i2 from '@spartacus/core';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, HttpErrorHandler, HttpResponseStatus, GlobalMessageType } from '@spartacus/core';
import { CheckoutCostCenterSetEvent, CheckoutPaymentTypesQueryReloadEvent, CheckoutPaymentTypesQueryResetEvent, CheckoutPaymentTypeSetEvent, B2BPaymentTypeEnum, CheckoutCostCenterFacade, CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { combineLatest, throwError, of } from 'rxjs';
import { switchMap, tap, take, map, concatMap, filter } from 'rxjs/operators';
import * as i1 from '@spartacus/cart/base/root';
import * as i4 from '@spartacus/checkout/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    setCostCenter(userId, cartId, costCenterId) {
        return this.adapter.setCostCenter(userId, cartId, costCenterId);
    }
}
CheckoutCostCenterConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterConnector, deps: [{ token: CheckoutCostCenterAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCostCenterConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CheckoutCostCenterAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getPaymentTypes() {
        return this.adapter.getPaymentTypes();
    }
    setPaymentType(userId, cartId, typeCode, purchaseOrderNumber) {
        return this.adapter.setPaymentType(userId, cartId, typeCode, purchaseOrderNumber);
    }
}
CheckoutPaymentTypeConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeConnector, deps: [{ token: CheckoutPaymentTypeAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CheckoutPaymentTypeAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterService {
    constructor(activeCartFacade, userIdService, commandService, checkoutCostCenterConnector, checkoutQueryFacade, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.commandService = commandService;
        this.checkoutCostCenterConnector = checkoutCostCenterConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.eventService = eventService;
        this.setCostCenterCommand = this.commandService.create((payload) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutCostCenterConnector
            .setCostCenter(userId, cartId, payload)
            .pipe(tap(() => this.eventService.dispatch({
            cartId,
            userId,
            code: payload,
        }, CheckoutCostCenterSetEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
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
    getCostCenterState() {
        return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => {
            var _a;
            return (Object.assign(Object.assign({}, state), { data: (_a = state.data) === null || _a === void 0 ? void 0 : _a.costCenter }));
        }));
    }
    setCostCenter(costCenterId) {
        return this.setCostCenterCommand.execute(costCenterId);
    }
}
CheckoutCostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.CommandService }, { token: CheckoutCostCenterConnector }, { token: i4.CheckoutQueryFacade }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutCostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.CommandService }, { type: CheckoutCostCenterConnector }, { type: i4.CheckoutQueryFacade }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeService {
    getCheckoutPaymentTypesQueryReloadEvents() {
        return [CheckoutPaymentTypesQueryReloadEvent];
    }
    getCheckoutPaymentTypesQueryResetEvents() {
        return [CheckoutPaymentTypesQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, queryService, commandService, paymentTypeConnector, eventService, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.paymentTypeConnector = paymentTypeConnector;
        this.eventService = eventService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.paymentTypesQuery = this.queryService.create(() => this.paymentTypeConnector.getPaymentTypes(), {
            reloadOn: this.getCheckoutPaymentTypesQueryReloadEvents(),
            resetOn: this.getCheckoutPaymentTypesQueryResetEvents(),
        });
        this.setPaymentTypeCommand = this.commandService.create(({ paymentTypeCode, purchaseOrderNumber }) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.paymentTypeConnector
            .setPaymentType(userId, cartId, paymentTypeCode, purchaseOrderNumber)
            .pipe(tap(() => this.eventService.dispatch({
            userId,
            cartId,
            paymentTypeCode,
            purchaseOrderNumber,
        }, CheckoutPaymentTypeSetEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
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
    getPaymentTypesState() {
        return this.paymentTypesQuery.getState();
    }
    getPaymentTypes() {
        return this.getPaymentTypesState().pipe(concatMap((state) => (state === null || state === void 0 ? void 0 : state.error)
            ? throwError(state.error)
            : of(state)), map((state) => { var _a; return (_a = state.data) !== null && _a !== void 0 ? _a : []; }));
    }
    setPaymentType(paymentTypeCode, purchaseOrderNumber) {
        return this.setPaymentTypeCommand.execute({
            paymentTypeCode,
            purchaseOrderNumber,
        });
    }
    getSelectedPaymentTypeState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => { var _a; return (Object.assign(Object.assign({}, state), { data: (_a = state.data) === null || _a === void 0 ? void 0 : _a.paymentType })); }));
    }
    isAccountPayment() {
        return this.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => { var _a; return ((_a = state.data) === null || _a === void 0 ? void 0 : _a.code) === B2BPaymentTypeEnum.ACCOUNT_PAYMENT; }));
    }
    getPurchaseOrderNumberState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => { var _a; return (Object.assign(Object.assign({}, state), { data: (_a = state.data) === null || _a === void 0 ? void 0 : _a.purchaseOrderNumber })); }));
    }
}
CheckoutPaymentTypeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: CheckoutPaymentTypeConnector }, { token: i2.EventService }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: CheckoutPaymentTypeConnector }, { type: i2.EventService }, { type: i4.CheckoutQueryFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const facadeProviders = [
    CheckoutCostCenterService,
    {
        provide: CheckoutCostCenterFacade,
        useExisting: CheckoutCostCenterService,
    },
    CheckoutPaymentTypeService,
    {
        provide: CheckoutPaymentTypeFacade,
        useExisting: CheckoutPaymentTypeService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var ResponseError;
(function (ResponseError) {
    ResponseError["NO_LONGER_VALID"] = "JaloObjectNoLongerValidError";
    ResponseError["INVALID_ENTITY"] = "EntityValidationError";
})(ResponseError || (ResponseError = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BadCostCenterRequestHandler extends HttpErrorHandler {
    constructor(globalMessageService) {
        super(globalMessageService);
        this.globalMessageService = globalMessageService;
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) &&
            this.getErrors(errorResponse).some(this.isEntityValidationError) &&
            this.isCostCenterRequest(errorResponse));
    }
    handleError(_request, response) {
        if (this.getErrors(response).some((e) => this.isEntityValidationError(e))) {
            this.globalMessageService.add({ key: 'checkoutB2B.invalidCostCenter' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    getErrors(response) {
        var _a;
        return (((_a = response.error) === null || _a === void 0 ? void 0 : _a.errors) || []).filter((error) => error.type !== ResponseError.NO_LONGER_VALID);
    }
    isCostCenterRequest(errorResponse) {
        if (errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.url) {
            const url = new URL(errorResponse.url);
            return (url.pathname.endsWith('costcenter') &&
                new URLSearchParams(url.search).has('costCenterId'));
        }
        return false;
    }
    isEntityValidationError(error) {
        return error.type === ResponseError.INVALID_ENTITY;
    }
}
BadCostCenterRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCostCenterRequestHandler, deps: [{ token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
BadCostCenterRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCostCenterRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadCostCenterRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BCoreModule {
}
CheckoutB2BCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule });
CheckoutB2BCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule, providers: [
        ...facadeProviders,
        CheckoutCostCenterConnector,
        CheckoutPaymentTypeConnector,
        {
            provide: HttpErrorHandler,
            useExisting: BadCostCenterRequestHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...facadeProviders,
                        CheckoutCostCenterConnector,
                        CheckoutPaymentTypeConnector,
                        {
                            provide: HttpErrorHandler,
                            useExisting: BadCostCenterRequestHandler,
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
const CHECKOUT_PAYMENT_TYPE_NORMALIZER = new InjectionToken('CheckoutPaymentTypeNormalizer');

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

export { CHECKOUT_PAYMENT_TYPE_NORMALIZER, CheckoutB2BCoreModule, CheckoutCostCenterAdapter, CheckoutCostCenterConnector, CheckoutCostCenterService, CheckoutPaymentTypeAdapter, CheckoutPaymentTypeConnector, CheckoutPaymentTypeService };
//# sourceMappingURL=spartacus-checkout-b2b-core.mjs.map
