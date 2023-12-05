import * as i0 from '@angular/core';
import { InjectionToken, Injectable, EventEmitter, Component, Output, NgModule, ChangeDetectionStrategy } from '@angular/core';
import * as i2 from '@spartacus/core';
import { HttpParamsURIEncoder, CommandStrategy, GlobalMessageType, I18nModule, ConfigModule, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i5 from '@spartacus/checkout/base/components';
import { CheckoutPaymentMethodComponent, CheckoutPaymentMethodModule } from '@spartacus/checkout/base/components';
import * as i8 from '@spartacus/storefront';
import { SpinnerModule, CardModule } from '@spartacus/storefront';
import { switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i2$1 from '@spartacus/checkout/base/core';
import * as i4$1 from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const occDigitalPaymentsEndpoints = {
    paymentRequest: 'users/${userId}/carts/${cartId}/payment/digitalPayments/request',
    paymentDetails: 'users/${userId}/carts/${cartId}/payment/digitalPayments/response',
};
const occDigitalPaymentsConfig = {
    backend: {
        occ: {
            endpoints: Object.assign({}, occDigitalPaymentsEndpoints),
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const DP_DETAILS_NORMALIZER = new InjectionToken('DpDetailsNormalizer');
const DP_REQUEST_NORMALIZER = new InjectionToken('DpRequestNormalizer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DigitalPaymentsAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccDpDetailsNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        return target;
    }
}
OccDpDetailsNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpDetailsNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccDpDetailsNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpDetailsNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpDetailsNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccDpRequestNormalizer {
    convert(source, target) {
        var _a, _b, _c, _d, _e, _f;
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        target.url = source.postUrl;
        target.sessionId = (_c = (_b = (_a = source === null || source === void 0 ? void 0 : source.parameters) === null || _a === void 0 ? void 0 : _a.entry) === null || _b === void 0 ? void 0 : _b.find((it) => it.key === 'session_id')) === null || _c === void 0 ? void 0 : _c.value;
        target.signature = (_f = (_e = (_d = source === null || source === void 0 ? void 0 : source.parameters) === null || _d === void 0 ? void 0 : _d.entry) === null || _e === void 0 ? void 0 : _e.find((it) => it.key === 'signature')) === null || _f === void 0 ? void 0 : _f.value;
        return target;
    }
}
OccDpRequestNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpRequestNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccDpRequestNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpRequestNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDpRequestNormalizer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CURRENT_CART = 'current';
const DP_CARD_REGISTRATION_STATUS = 'x-card-registration-status';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccDigitalPaymentsAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.paramEncoder = new HttpParamsURIEncoder();
    }
    createPaymentRequest(userId, cartId = CURRENT_CART) {
        const url = this.occEndpoints.buildUrl('paymentRequest', {
            urlParams: { userId, cartId },
        });
        return this.http
            .post(url, null)
            .pipe(this.converter.pipeable(DP_REQUEST_NORMALIZER));
    }
    createPaymentDetails(sessionId, signature, userId, cartId = CURRENT_CART) {
        let params = new HttpParams({ encoder: this.paramEncoder });
        params = params.append('sid', sessionId);
        params = params.append('sign', signature);
        const url = this.occEndpoints.buildUrl('paymentDetails', {
            urlParams: { userId, cartId },
        });
        return this.http
            .post(url, null, { params: params })
            .pipe(this.converter.pipeable(DP_DETAILS_NORMALIZER));
    }
}
OccDigitalPaymentsAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDigitalPaymentsAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccDigitalPaymentsAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDigitalPaymentsAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccDigitalPaymentsAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DpCheckoutPaymentService {
    constructor(dpAdapter, command, query, userIdService) {
        this.dpAdapter = dpAdapter;
        this.command = command;
        this.query = query;
        this.userIdService = userIdService;
        this.RequestUrlQuery = this.query.create(() => this.userIdService
            .takeUserId()
            .pipe(switchMap((userId) => this.dpAdapter.createPaymentRequest(userId))));
        this.createPaymentDetailsCommand = this.command.create((payload) => this.userIdService
            .takeUserId()
            .pipe(switchMap((userId) => this.dpAdapter.createPaymentDetails(payload.sessionId, payload.signature, userId))), {
            strategy: CommandStrategy.Queue,
        });
    }
    getCardRegistrationDetails() {
        return this.RequestUrlQuery.get();
    }
    createPaymentDetails(sessionId, signature) {
        return this.createPaymentDetailsCommand.execute({ sessionId, signature });
    }
}
DpCheckoutPaymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutPaymentService, deps: [{ token: DigitalPaymentsAdapter }, { token: i2.CommandService }, { token: i2.QueryService }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
DpCheckoutPaymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutPaymentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutPaymentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: DigitalPaymentsAdapter }, { type: i2.CommandService }, { type: i2.QueryService }, { type: i2.UserIdService }]; } });

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
const KEY = 'digital-payment.checkout.request';
class DpLocalStorageService {
    constructor(statePersistenceService) {
        this.statePersistenceService = statePersistenceService;
        this.subscription = new Subscription();
    }
    syncCardRegistrationState(request) {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: KEY,
            state$: of(request),
        }));
    }
    readCardRegistrationState() {
        const paymentRequest = this.statePersistenceService.readStateFromStorage({
            key: KEY,
        });
        this.clearDpStorage();
        return paymentRequest;
    }
    clearDpStorage() {
        this.statePersistenceService.syncWithStorage({
            key: KEY,
            state$: of({}),
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
DpLocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpLocalStorageService, deps: [{ token: i2.StatePersistenceService }], target: i0.ɵɵFactoryTarget.Injectable });
DpLocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpLocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpLocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.StatePersistenceService }]; } });

class DpPaymentCallbackComponent {
    constructor(dpPaymentService, dpStorageService, globalMsgService, route) {
        this.dpPaymentService = dpPaymentService;
        this.dpStorageService = dpStorageService;
        this.globalMsgService = globalMsgService;
        this.route = route;
        this.closeCallback = new EventEmitter();
        this.paymentDetailsAdded = new EventEmitter();
    }
    ngOnInit() {
        const dpResponse = this.route.snapshot.queryParamMap.get(DP_CARD_REGISTRATION_STATUS);
        if ((dpResponse === null || dpResponse === void 0 ? void 0 : dpResponse.toLowerCase()) === 'successful') {
            this.fetchPaymentDetails();
        }
        else {
            this.globalMsgService.add({ key: 'dpPaymentForm.cancelledOrFailed' }, GlobalMessageType.MSG_TYPE_WARNING);
            this.closeCallback.emit();
        }
    }
    fetchPaymentDetails() {
        const paymentRequest = this.dpStorageService.readCardRegistrationState();
        if ((paymentRequest === null || paymentRequest === void 0 ? void 0 : paymentRequest.sessionId) && (paymentRequest === null || paymentRequest === void 0 ? void 0 : paymentRequest.signature)) {
            this.dpPaymentService
                .createPaymentDetails(paymentRequest.sessionId, paymentRequest.signature)
                .subscribe((details) => {
                if (details === null || details === void 0 ? void 0 : details.id) {
                    this.paymentDetailsAdded.emit(details);
                }
                else if (details) {
                    this.globalMsgService.add({ key: 'dpPaymentForm.error.paymentFetch' }, GlobalMessageType.MSG_TYPE_ERROR);
                    this.closeCallback.emit();
                }
            });
        }
        else {
            this.globalMsgService.add({ key: 'dpPaymentForm.error.unknown' }, GlobalMessageType.MSG_TYPE_ERROR);
            this.closeCallback.emit();
        }
    }
}
DpPaymentCallbackComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackComponent, deps: [{ token: DpCheckoutPaymentService }, { token: DpLocalStorageService }, { token: i2.GlobalMessageService }, { token: i4.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
DpPaymentCallbackComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DpPaymentCallbackComponent, selector: "cx-dp-payment-callback", outputs: { closeCallback: "closeCallback", paymentDetailsAdded: "paymentDetailsAdded" }, ngImport: i0, template: "<div class=\"text-center\">{{ 'dpPaymentForm.callback' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n", dependencies: [{ kind: "component", type: i8.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-dp-payment-callback', template: "<div class=\"text-center\">{{ 'dpPaymentForm.callback' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n" }]
        }], ctorParameters: function () { return [{ type: DpCheckoutPaymentService }, { type: DpLocalStorageService }, { type: i2.GlobalMessageService }, { type: i4.ActivatedRoute }]; }, propDecorators: { closeCallback: [{
                type: Output
            }], paymentDetailsAdded: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DpPaymentCallbackModule {
}
DpPaymentCallbackModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DpPaymentCallbackModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, declarations: [DpPaymentCallbackComponent], imports: [CommonModule, SpinnerModule, I18nModule], exports: [DpPaymentCallbackComponent] });
DpPaymentCallbackModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, imports: [CommonModule, SpinnerModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentCallbackModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpinnerModule, I18nModule],
                    declarations: [DpPaymentCallbackComponent],
                    exports: [DpPaymentCallbackComponent],
                }]
        }] });

class DpPaymentFormComponent {
    constructor(dpPaymentService, dpStorageService, globalMsgService, winRef) {
        this.dpPaymentService = dpPaymentService;
        this.dpStorageService = dpStorageService;
        this.globalMsgService = globalMsgService;
        this.winRef = winRef;
        this.closeForm = new EventEmitter();
    }
    ngOnInit() {
        this.dpPaymentService.getCardRegistrationDetails().subscribe((request) => {
            if (request === null || request === void 0 ? void 0 : request.url) {
                this.dpStorageService.syncCardRegistrationState(request);
                this.redirect(request.url);
            }
            else if (request) {
                this.globalMsgService.add({ key: 'dpPaymentForm.error.redirect' }, GlobalMessageType.MSG_TYPE_ERROR);
                this.closeForm.emit();
            }
        });
    }
    redirect(url) {
        const window = this.winRef.nativeWindow;
        if (window === null || window === void 0 ? void 0 : window.location) {
            window.location.href = url;
        }
    }
}
DpPaymentFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormComponent, deps: [{ token: DpCheckoutPaymentService }, { token: DpLocalStorageService }, { token: i2.GlobalMessageService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
DpPaymentFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DpPaymentFormComponent, selector: "cx-dp-payment-form", outputs: { closeForm: "closeForm" }, ngImport: i0, template: "<div class=\"text-center\">{{ 'dpPaymentForm.redirect' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n", dependencies: [{ kind: "component", type: i8.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-dp-payment-form', template: "<div class=\"text-center\">{{ 'dpPaymentForm.redirect' | cxTranslate }}</div>\n<div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n" }]
        }], ctorParameters: function () { return [{ type: DpCheckoutPaymentService }, { type: DpLocalStorageService }, { type: i2.GlobalMessageService }, { type: i2.WindowRef }]; }, propDecorators: { closeForm: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DpPaymentFormModule {
}
DpPaymentFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DpPaymentFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormModule, declarations: [DpPaymentFormComponent], imports: [CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        I18nModule,
        SpinnerModule], exports: [DpPaymentFormComponent] });
DpPaymentFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormModule, imports: [CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        I18nModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        I18nModule,
                        SpinnerModule,
                    ],
                    declarations: [DpPaymentFormComponent],
                    exports: [DpPaymentFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DpPaymentMethodComponent extends CheckoutPaymentMethodComponent {
    isDpCallback() {
        const queryParams = this.activatedRoute.snapshot.queryParamMap.get(DP_CARD_REGISTRATION_STATUS);
        return !!queryParams;
    }
    hideCallbackScreen() {
        this.showCallbackScreen = false;
    }
    paymentDetailsAdded(paymentDetails) {
        this.savePaymentMethod(paymentDetails);
        this.next();
    }
    // TODO:#checkout - handle breaking changes
    constructor(userPaymentService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, globalMessageService) {
        super(userPaymentService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, globalMessageService);
        this.userPaymentService = userPaymentService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.activatedRoute = activatedRoute;
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.globalMessageService = globalMessageService;
        this.showCallbackScreen = false;
        this.showCallbackScreen = this.isDpCallback();
    }
}
DpPaymentMethodComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodComponent, deps: [{ token: i2.UserPaymentService }, { token: i2$1.CheckoutDeliveryAddressService }, { token: i2$1.CheckoutPaymentService }, { token: i4.ActivatedRoute }, { token: i2.TranslationService }, { token: i4$1.ActiveCartFacade }, { token: i5.CheckoutStepService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
DpPaymentMethodComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DpPaymentMethodComponent, selector: "cx-payment-method", usesInheritance: true, ngImport: i0, template: "<!-- Copied from core module except #newPaymentForm -->\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <h3 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n    {{ 'paymentForm.payment' | cxTranslate }}\n  </h3>\n  <ng-container *ngIf=\"!showCallbackScreen; else loadingPaymentDetails\">\n    <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n      <div\n        role=\"status\"\n        [attr.aria-label]=\"'common.loaded' | cxTranslate\"\n      ></div>\n      <ng-container\n        *ngIf=\"\n          cards?.length && !newPaymentFormManuallyOpened;\n          else newPaymentForm\n        \"\n      >\n        <p class=\"cx-checkout-text\">\n          {{ 'paymentForm.choosePaymentMethod' | cxTranslate }}\n        </p>\n        <div class=\"cx-checkout-btns row\">\n          <div class=\"col-md-12 col-lg-6\">\n            <button\n              class=\"btn btn-block btn-secondary\"\n              (click)=\"showNewPaymentForm()\"\n            >\n              {{ 'paymentForm.addNewPayment' | cxTranslate }}\n            </button>\n          </div>\n        </div>\n\n        <div class=\"cx-checkout-body row\">\n          <div\n            class=\"cx-payment-card col-md-12 col-lg-6\"\n            *ngFor=\"let card of cards; let i = index\"\n          >\n            <div class=\"cx-payment-card-inner\">\n              <cx-card\n                [border]=\"true\"\n                [fitToContainer]=\"true\"\n                [content]=\"card.content\"\n                (sendCard)=\"selectPaymentMethod(card.paymentMethod)\"\n              ></cx-card>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row cx-checkout-btns\">\n          <div class=\"col-md-12 col-lg-6\">\n            <button class=\"btn btn-block btn-secondary\" (click)=\"back()\">\n              {{ backBtnText | cxTranslate }}\n            </button>\n          </div>\n          <div class=\"col-md-12 col-lg-6\">\n            <button\n              class=\"btn btn-block btn-primary\"\n              [disabled]=\"!(selectedMethod$ | async)?.id\"\n              (click)=\"next()\"\n            >\n              {{ 'common.continue' | cxTranslate }}\n            </button>\n          </div>\n        </div>\n      </ng-container>\n    </ng-container>\n\n    <ng-template #newPaymentForm>\n      <cx-dp-payment-form\n        (setPaymentDetails)=\"setPaymentDetails($event)\"\n        (closeForm)=\"hideNewPaymentForm()\"\n      ></cx-dp-payment-form>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #loading>\n    <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n  </ng-template>\n\n  <ng-template #loadingPaymentDetails>\n    <cx-dp-payment-callback\n      (paymentDetailsAdded)=\"paymentDetailsAdded($event)\"\n      (closeCallback)=\"hideCallbackScreen()\"\n    ></cx-dp-payment-callback>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: DpPaymentFormComponent, selector: "cx-dp-payment-form", outputs: ["closeForm"] }, { kind: "component", type: i8.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i8.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: DpPaymentCallbackComponent, selector: "cx-dp-payment-callback", outputs: ["closeCallback", "paymentDetailsAdded"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-payment-method', changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- Copied from core module except #newPaymentForm -->\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <h3 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n    {{ 'paymentForm.payment' | cxTranslate }}\n  </h3>\n  <ng-container *ngIf=\"!showCallbackScreen; else loadingPaymentDetails\">\n    <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n      <div\n        role=\"status\"\n        [attr.aria-label]=\"'common.loaded' | cxTranslate\"\n      ></div>\n      <ng-container\n        *ngIf=\"\n          cards?.length && !newPaymentFormManuallyOpened;\n          else newPaymentForm\n        \"\n      >\n        <p class=\"cx-checkout-text\">\n          {{ 'paymentForm.choosePaymentMethod' | cxTranslate }}\n        </p>\n        <div class=\"cx-checkout-btns row\">\n          <div class=\"col-md-12 col-lg-6\">\n            <button\n              class=\"btn btn-block btn-secondary\"\n              (click)=\"showNewPaymentForm()\"\n            >\n              {{ 'paymentForm.addNewPayment' | cxTranslate }}\n            </button>\n          </div>\n        </div>\n\n        <div class=\"cx-checkout-body row\">\n          <div\n            class=\"cx-payment-card col-md-12 col-lg-6\"\n            *ngFor=\"let card of cards; let i = index\"\n          >\n            <div class=\"cx-payment-card-inner\">\n              <cx-card\n                [border]=\"true\"\n                [fitToContainer]=\"true\"\n                [content]=\"card.content\"\n                (sendCard)=\"selectPaymentMethod(card.paymentMethod)\"\n              ></cx-card>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row cx-checkout-btns\">\n          <div class=\"col-md-12 col-lg-6\">\n            <button class=\"btn btn-block btn-secondary\" (click)=\"back()\">\n              {{ backBtnText | cxTranslate }}\n            </button>\n          </div>\n          <div class=\"col-md-12 col-lg-6\">\n            <button\n              class=\"btn btn-block btn-primary\"\n              [disabled]=\"!(selectedMethod$ | async)?.id\"\n              (click)=\"next()\"\n            >\n              {{ 'common.continue' | cxTranslate }}\n            </button>\n          </div>\n        </div>\n      </ng-container>\n    </ng-container>\n\n    <ng-template #newPaymentForm>\n      <cx-dp-payment-form\n        (setPaymentDetails)=\"setPaymentDetails($event)\"\n        (closeForm)=\"hideNewPaymentForm()\"\n      ></cx-dp-payment-form>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #loading>\n    <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n  </ng-template>\n\n  <ng-template #loadingPaymentDetails>\n    <cx-dp-payment-callback\n      (paymentDetailsAdded)=\"paymentDetailsAdded($event)\"\n      (closeCallback)=\"hideCallbackScreen()\"\n    ></cx-dp-payment-callback>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2.UserPaymentService }, { type: i2$1.CheckoutDeliveryAddressService }, { type: i2$1.CheckoutPaymentService }, { type: i4.ActivatedRoute }, { type: i2.TranslationService }, { type: i4$1.ActiveCartFacade }, { type: i5.CheckoutStepService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DpPaymentMethodModule extends CheckoutPaymentMethodModule {
}
DpPaymentMethodModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, deps: null, target: i0.ɵɵFactoryTarget.NgModule });
DpPaymentMethodModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, declarations: [DpPaymentMethodComponent], imports: [CommonModule,
        DpPaymentFormModule,
        RouterModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        DpPaymentCallbackModule, i2.ConfigModule], exports: [DpPaymentMethodComponent] });
DpPaymentMethodModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, imports: [CommonModule,
        DpPaymentFormModule,
        RouterModule,
        CardModule,
        SpinnerModule,
        I18nModule,
        DpPaymentCallbackModule,
        ConfigModule.withConfig({
            cmsComponents: {
                CheckoutPaymentDetails: {
                    component: DpPaymentMethodComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpPaymentMethodModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DpPaymentFormModule,
                        RouterModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                        DpPaymentCallbackModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                CheckoutPaymentDetails: {
                                    component: DpPaymentMethodComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [DpPaymentMethodComponent],
                    exports: [DpPaymentMethodComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DpCheckoutModule {
}
DpCheckoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DpCheckoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, imports: [DpPaymentMethodModule] });
DpCheckoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, providers: [
        {
            provide: DigitalPaymentsAdapter,
            useClass: OccDigitalPaymentsAdapter,
        },
        {
            provide: DP_DETAILS_NORMALIZER,
            useExisting: OccDpDetailsNormalizer,
            multi: true,
        },
        {
            provide: DP_REQUEST_NORMALIZER,
            useExisting: OccDpRequestNormalizer,
            multi: true,
        },
        DpCheckoutPaymentService,
        provideDefaultConfig(occDigitalPaymentsConfig),
    ], imports: [DpPaymentMethodModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DpPaymentMethodModule],
                    providers: [
                        {
                            provide: DigitalPaymentsAdapter,
                            useClass: OccDigitalPaymentsAdapter,
                        },
                        {
                            provide: DP_DETAILS_NORMALIZER,
                            useExisting: OccDpDetailsNormalizer,
                            multi: true,
                        },
                        {
                            provide: DP_REQUEST_NORMALIZER,
                            useExisting: OccDpRequestNormalizer,
                            multi: true,
                        },
                        DpCheckoutPaymentService,
                        provideDefaultConfig(occDigitalPaymentsConfig),
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
class DigitalPaymentsModule {
}
DigitalPaymentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DigitalPaymentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, imports: [DpCheckoutModule] });
DigitalPaymentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, imports: [DpCheckoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DigitalPaymentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [DpCheckoutModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DigitalPaymentsModule, DpCheckoutModule, DpCheckoutPaymentService };
//# sourceMappingURL=spartacus-digital-payments.mjs.map
