import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, HostBinding, NgModule, Optional, ViewChild, Injectable, inject, isDevMode } from '@angular/core';
import * as i2 from '@spartacus/checkout/base/components';
import { CheckoutAuthGuard, CartNotEmptyGuard, CheckoutDeliveryAddressComponent, CheckoutReviewSubmitComponent, CheckoutStepsSetGuard } from '@spartacus/checkout/base/components';
import { CartValidationGuard } from '@spartacus/cart/base/core';
import * as i1 from '@spartacus/core';
import { I18nModule, ConfigModule, provideDefaultConfig, GlobalMessageType, isNotUndefined, getLastValueSync, UrlModule, FeaturesConfigModule, B2BUserRole, LoggerService } from '@spartacus/core';
import { Subscription, combineLatest, of, BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged, map, take, tap, switchMap, catchError } from 'rxjs/operators';
import * as i5 from '@spartacus/checkout/b2b/root';
import { B2BPaymentTypeEnum } from '@spartacus/checkout/b2b/root';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i7 from '@spartacus/storefront';
import { AddressFormModule, CardModule, SpinnerModule, PromotionsModule, IconModule, OutletModule } from '@spartacus/storefront';
import * as i1$1 from '@spartacus/checkout/base/root';
import * as i4 from '@spartacus/cart/base/root';
import * as i5$1 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterComponent {
    get disabled() {
        return !this.isAccountPayment;
    }
    constructor(userCostCenterService, checkoutCostCenterFacade, checkoutPaymentTypeFacade) {
        this.userCostCenterService = userCostCenterService;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.subscription = new Subscription();
        this.userCostCenters$ = this.userCostCenterService
            .getActiveCostCenters()
            .pipe(filter((costCenters) => !!costCenters));
    }
    ngOnInit() {
        this.subscription.add(this.checkoutPaymentTypeFacade
            .isAccountPayment()
            .pipe(distinctUntilChanged())
            .subscribe((isAccountPayment) => {
            this.isAccountPayment = isAccountPayment;
        }));
        this.costCenters$ = combineLatest([
            this.userCostCenters$,
            this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data), distinctUntilChanged()),
        ]).pipe(take(1), tap(([costCenters, costCenter]) => {
            if (!costCenter) {
                this.setCostCenter(costCenters[0].code);
            }
            else {
                this.costCenterId = costCenter.code;
            }
        }), map(([costCenters]) => costCenters));
    }
    setCostCenter(selectCostCenter) {
        this.costCenterId = selectCostCenter;
        this.checkoutCostCenterFacade.setCostCenter(this.costCenterId);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CheckoutCostCenterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterComponent, deps: [{ token: i1.UserCostCenterService }, { token: i5.CheckoutCostCenterFacade }, { token: i5.CheckoutPaymentTypeFacade }], target: i0.ɵɵFactoryTarget.Component });
CheckoutCostCenterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CheckoutCostCenterComponent, selector: "cx-cost-center", host: { properties: { "class.hidden": "this.disabled" } }, ngImport: i0, template: "<ng-container *ngIf=\"isAccountPayment\">\n  <div class=\"row\">\n    <div class=\"col-md-12 col-xl-10\">\n      <ng-container *ngIf=\"costCenters$ | async as costCenters\">\n        <div *ngIf=\"costCenters.length !== 0\">\n          <label>\n            <span class=\"label-content required\">{{\n              'checkoutB2B.costCenter' | cxTranslate\n            }}</span>\n            <select (change)=\"setCostCenter($event.target.value)\">\n              <option\n                *ngFor=\"let costCenter of costCenters\"\n                value=\"{{ costCenter.code }}\"\n                [selected]=\"costCenterId === costCenter.code\"\n              >\n                {{ costCenter.name }}\n              </option>\n            </select>\n            <span class=\"label-content\">{{\n              'checkoutB2B.availableLabel' | cxTranslate\n            }}</span>\n          </label>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cost-center', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"isAccountPayment\">\n  <div class=\"row\">\n    <div class=\"col-md-12 col-xl-10\">\n      <ng-container *ngIf=\"costCenters$ | async as costCenters\">\n        <div *ngIf=\"costCenters.length !== 0\">\n          <label>\n            <span class=\"label-content required\">{{\n              'checkoutB2B.costCenter' | cxTranslate\n            }}</span>\n            <select (change)=\"setCostCenter($event.target.value)\">\n              <option\n                *ngFor=\"let costCenter of costCenters\"\n                value=\"{{ costCenter.code }}\"\n                [selected]=\"costCenterId === costCenter.code\"\n              >\n                {{ costCenter.name }}\n              </option>\n            </select>\n            <span class=\"label-content\">{{\n              'checkoutB2B.availableLabel' | cxTranslate\n            }}</span>\n          </label>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UserCostCenterService }, { type: i5.CheckoutCostCenterFacade }, { type: i5.CheckoutPaymentTypeFacade }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['class.hidden']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutCostCenterModule {
}
CheckoutCostCenterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutCostCenterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, declarations: [CheckoutCostCenterComponent], imports: [CommonModule,
        I18nModule, i1.ConfigModule] });
CheckoutCostCenterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, imports: [CommonModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                CheckoutCostCenterComponent: {
                    component: CheckoutCostCenterComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutCostCenterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                CheckoutCostCenterComponent: {
                                    component: CheckoutCostCenterComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutCostCenterComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BCheckoutDeliveryAddressComponent extends CheckoutDeliveryAddressComponent {
    constructor(userAddressService, checkoutDeliveryAddressFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, checkoutDeliveryModesFacade, globalMessageService, checkoutCostCenterFacade, checkoutPaymentTypeFacade, userCostCenterService) {
        super(userAddressService, checkoutDeliveryAddressFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, checkoutDeliveryModesFacade, globalMessageService);
        this.userAddressService = userAddressService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.activatedRoute = activatedRoute;
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.globalMessageService = globalMessageService;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.userCostCenterService = userCostCenterService;
        this.subscriptions = new Subscription();
        this.isAccountPayment$ = this.checkoutPaymentTypeFacade
            .isAccountPayment()
            .pipe(distinctUntilChanged());
        this.costCenterAddresses$ = this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data), distinctUntilChanged((prev, curr) => prev?.code === curr?.code), switchMap((costCenter) => {
            this.doneAutoSelect = false;
            return costCenter?.code
                ? this.userCostCenterService.getCostCenterAddresses(costCenter.code)
                : of([]);
        }));
        this.creditCardAddressLoading$ = super.getAddressLoading();
        this.accountAddressLoading$ = combineLatest([
            this.creditCardAddressLoading$,
            this.checkoutCostCenterFacade
                .getCostCenterState()
                .pipe(map((state) => state.loading)),
        ]).pipe(map(([creditCardAddressLoading, costCenterLoading]) => creditCardAddressLoading || costCenterLoading), distinctUntilChanged());
        this.isAccountPayment = false;
    }
    ngOnInit() {
        this.subscriptions.add(this.isAccountPayment$.subscribe((isAccount) => (this.isAccountPayment = isAccount)));
        super.ngOnInit();
    }
    loadAddresses() {
        if (!this.isAccountPayment) {
            super.loadAddresses();
        }
        // else: do nothing, as we don't need to load user addresses for account payment
    }
    getAddressLoading() {
        return this.isAccountPayment$.pipe(switchMap((isAccountPayment) => isAccountPayment
            ? this.accountAddressLoading$
            : this.creditCardAddressLoading$));
    }
    getSupportedAddresses() {
        return this.isAccountPayment$.pipe(switchMap((isAccountPayment) => isAccountPayment
            ? this.costCenterAddresses$
            : super.getSupportedAddresses()));
    }
    selectDefaultAddress(addresses, selected) {
        if (!this.doneAutoSelect &&
            addresses?.length &&
            (!selected || Object.keys(selected).length === 0)) {
            if (this.isAccountPayment) {
                if (addresses.length === 1) {
                    this.setAddress(addresses[0]);
                }
            }
            else {
                super.selectDefaultAddress(addresses, selected);
            }
            this.doneAutoSelect = true;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
B2BCheckoutDeliveryAddressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressComponent, deps: [{ token: i1.UserAddressService }, { token: i1$1.CheckoutDeliveryAddressFacade }, { token: i3.ActivatedRoute }, { token: i1.TranslationService }, { token: i4.ActiveCartFacade }, { token: i2.CheckoutStepService }, { token: i1$1.CheckoutDeliveryModesFacade }, { token: i1.GlobalMessageService }, { token: i5.CheckoutCostCenterFacade }, { token: i5.CheckoutPaymentTypeFacade }, { token: i1.UserCostCenterService }], target: i0.ɵɵFactoryTarget.Component });
B2BCheckoutDeliveryAddressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: B2BCheckoutDeliveryAddressComponent, selector: "cx-delivery-address", usesInheritance: true, ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.shippingAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        isAccountPayment || (cards?.length && !addressFormOpened);\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\" *ngIf=\"!isAccountPayment\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-secondary\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i7.AddressFormComponent, selector: "cx-address-form", inputs: ["addressData", "actionBtnLabel", "cancelBtnLabel", "setAsDefaultField", "showTitleCode", "showCancelBtn"], outputs: ["submitAddress", "backToAddress"] }, { kind: "component", type: i7.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i7.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-delivery-address', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.shippingAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        isAccountPayment || (cards?.length && !addressFormOpened);\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\" *ngIf=\"!isAccountPayment\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-secondary\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UserAddressService }, { type: i1$1.CheckoutDeliveryAddressFacade }, { type: i3.ActivatedRoute }, { type: i1.TranslationService }, { type: i4.ActiveCartFacade }, { type: i2.CheckoutStepService }, { type: i1$1.CheckoutDeliveryModesFacade }, { type: i1.GlobalMessageService }, { type: i5.CheckoutCostCenterFacade }, { type: i5.CheckoutPaymentTypeFacade }, { type: i1.UserCostCenterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BCheckoutDeliveryAddressModule {
}
B2BCheckoutDeliveryAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
B2BCheckoutDeliveryAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, declarations: [B2BCheckoutDeliveryAddressComponent], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule], exports: [B2BCheckoutDeliveryAddressComponent] });
B2BCheckoutDeliveryAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutDeliveryAddress: {
                    component: B2BCheckoutDeliveryAddressComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        AddressFormModule,
        CardModule,
        SpinnerModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutDeliveryAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        AddressFormModule,
                        CardModule,
                        SpinnerModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutDeliveryAddress: {
                                    component: B2BCheckoutDeliveryAddressComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [B2BCheckoutDeliveryAddressComponent],
                    exports: [B2BCheckoutDeliveryAddressComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeComponent {
    constructor(checkoutPaymentTypeFacade, checkoutStepService, activatedRoute, globalMessageService) {
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.checkoutStepService = checkoutStepService;
        this.activatedRoute = activatedRoute;
        this.globalMessageService = globalMessageService;
        this.busy$ = new BehaviorSubject(false);
        this.paymentTypesError = false;
        this.isUpdating$ = combineLatest([
            this.busy$,
            this.checkoutPaymentTypeFacade
                .getSelectedPaymentTypeState()
                .pipe(map((state) => state.loading)),
        ]).pipe(map(([busy, loading]) => busy || loading), distinctUntilChanged());
        this.paymentTypes$ = this.checkoutPaymentTypeFacade
            .getPaymentTypes()
            .pipe(tap(() => (this.paymentTypesError = false)), catchError((error) => {
            if (error.details?.[0]?.type === "ClassMismatchError" /* OccHttpErrorType.CLASS_MISMATCH_ERROR */ &&
                this.globalMessageService) {
                this.globalMessageService.add({ key: 'httpHandlers.forbidden' }, GlobalMessageType.MSG_TYPE_ERROR);
                this.paymentTypesError = true;
            }
            return of([]);
        }));
        this.typeSelected$ = combineLatest([
            this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data)),
            this.paymentTypes$,
        ]).pipe(map(([selectedPaymentType, availablePaymentTypes]) => {
            if (selectedPaymentType &&
                availablePaymentTypes.find((availablePaymentType) => {
                    return availablePaymentType.code === selectedPaymentType.code;
                })) {
                return selectedPaymentType;
            }
            if (availablePaymentTypes.length) {
                this.busy$.next(true);
                this.checkoutPaymentTypeFacade
                    .setPaymentType(availablePaymentTypes[0].code, this.poNumberInputElement?.nativeElement?.value)
                    .subscribe({
                    complete: () => this.onSuccess(),
                    error: () => this.onError(),
                });
                return availablePaymentTypes[0];
            }
            return undefined;
        }), filter(isNotUndefined), distinctUntilChanged(), tap((selected) => {
            this.typeSelected = selected?.code;
            this.checkoutStepService.resetSteps();
            this.checkoutStepService.disableEnableStep("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, selected?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT);
        }));
        this.cartPoNumber$ = this.checkoutPaymentTypeFacade
            .getPurchaseOrderNumberState()
            .pipe(filter((state) => !state.loading), map((state) => state.data), filter(isNotUndefined), distinctUntilChanged());
    }
    changeType(code) {
        this.busy$.next(true);
        this.typeSelected = code;
        this.checkoutPaymentTypeFacade
            .setPaymentType(code, this.poNumberInputElement.nativeElement.value)
            .subscribe({
            complete: () => this.onSuccess(),
            error: () => this.onError(),
        });
    }
    next() {
        if (!this.typeSelected) {
            return;
        }
        const poNumberInput = this.poNumberInputElement.nativeElement.value;
        // if the PO number didn't change
        if (poNumberInput === getLastValueSync(this.cartPoNumber$)) {
            this.checkoutStepService.next(this.activatedRoute);
            return;
        }
        this.busy$.next(true);
        this.checkoutPaymentTypeFacade
            .setPaymentType(this.typeSelected, poNumberInput)
            .subscribe({
            // we don't call onSuccess here, because it can cause a spinner flickering
            complete: () => this.checkoutStepService.next(this.activatedRoute),
            error: () => this.onError(),
        });
    }
    back() {
        this.checkoutStepService.back(this.activatedRoute);
    }
    onSuccess() {
        this.busy$.next(false);
    }
    onError() {
        this.busy$.next(false);
    }
}
CheckoutPaymentTypeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeComponent, deps: [{ token: i5.CheckoutPaymentTypeFacade }, { token: i2.CheckoutStepService }, { token: i3.ActivatedRoute }, { token: i1.GlobalMessageService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CheckoutPaymentTypeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CheckoutPaymentTypeComponent, selector: "cx-payment-type", viewQueries: [{ propertyName: "poNumberInputElement", first: true, predicate: ["poNumber"], descendants: true }], ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutB2B.methodOfPayment.paymentType' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"paymentTypes$ | async as paymentTypes\">\n  <ng-container\n    *ngIf=\"\n      !!paymentTypes.length &&\n        (typeSelected$ | async) &&\n        !(isUpdating$ | async);\n      else loading\n    \"\n  >\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <label>\n          <span class=\"label-content\">{{\n            'checkoutB2B.poNumber' | cxTranslate\n          }}</span>\n          <input\n            #poNumber\n            class=\"form-control\"\n            formControlName=\"poNumber\"\n            type=\"text\"\n            placeholder=\"{{ 'checkoutB2B.placeholder' | cxTranslate }}\"\n            value=\"{{ cartPoNumber$ | async }}\"\n          />\n        </label>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <label class=\"cx-payment-type-container\">\n          <span class=\"label-content\">{{\n            'paymentTypes.title' | cxTranslate\n          }}</span>\n          <div class=\"form-check\" *ngFor=\"let type of paymentTypes\">\n            <input\n              id=\"paymentType-{{ type.code }}\"\n              class=\"form-check-input\"\n              role=\"radio\"\n              type=\"radio\"\n              aria-checked=\"true\"\n              (change)=\"changeType(type.code)\"\n              [value]=\"type.code\"\n              [checked]=\"type.code === typeSelected\"\n              formControlName=\"paymentType\"\n            />\n            <label\n              class=\"cx-payment-type-label form-check-label form-radio-label\"\n              for=\"paymentType-{{ type.code }}\"\n            >\n              <div class=\"cx-payment-type\">\n                {{ 'paymentTypes.paymentType_' + type?.code | cxTranslate }}\n              </div>\n            </label>\n          </div>\n        </label>\n      </div>\n    </div>\n\n    <div class=\"cx-checkout-btns row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-secondary\" (click)=\"back()\">\n          {{ 'checkout.backToCart' | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-primary\" (click)=\"next()\">\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\" *ngIf=\"!paymentTypesError\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i7.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-payment-type', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutB2B.methodOfPayment.paymentType' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"paymentTypes$ | async as paymentTypes\">\n  <ng-container\n    *ngIf=\"\n      !!paymentTypes.length &&\n        (typeSelected$ | async) &&\n        !(isUpdating$ | async);\n      else loading\n    \"\n  >\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <label>\n          <span class=\"label-content\">{{\n            'checkoutB2B.poNumber' | cxTranslate\n          }}</span>\n          <input\n            #poNumber\n            class=\"form-control\"\n            formControlName=\"poNumber\"\n            type=\"text\"\n            placeholder=\"{{ 'checkoutB2B.placeholder' | cxTranslate }}\"\n            value=\"{{ cartPoNumber$ | async }}\"\n          />\n        </label>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <label class=\"cx-payment-type-container\">\n          <span class=\"label-content\">{{\n            'paymentTypes.title' | cxTranslate\n          }}</span>\n          <div class=\"form-check\" *ngFor=\"let type of paymentTypes\">\n            <input\n              id=\"paymentType-{{ type.code }}\"\n              class=\"form-check-input\"\n              role=\"radio\"\n              type=\"radio\"\n              aria-checked=\"true\"\n              (change)=\"changeType(type.code)\"\n              [value]=\"type.code\"\n              [checked]=\"type.code === typeSelected\"\n              formControlName=\"paymentType\"\n            />\n            <label\n              class=\"cx-payment-type-label form-check-label form-radio-label\"\n              for=\"paymentType-{{ type.code }}\"\n            >\n              <div class=\"cx-payment-type\">\n                {{ 'paymentTypes.paymentType_' + type?.code | cxTranslate }}\n              </div>\n            </label>\n          </div>\n        </label>\n      </div>\n    </div>\n\n    <div class=\"cx-checkout-btns row\">\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-secondary\" (click)=\"back()\">\n          {{ 'checkout.backToCart' | cxTranslate }}\n        </button>\n      </div>\n      <div class=\"col-md-12 col-lg-6\">\n        <button class=\"btn btn-block btn-primary\" (click)=\"next()\">\n          {{ 'common.continue' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\" *ngIf=\"!paymentTypesError\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i5.CheckoutPaymentTypeFacade }, { type: i2.CheckoutStepService }, { type: i3.ActivatedRoute }, { type: i1.GlobalMessageService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { poNumberInputElement: [{
                type: ViewChild,
                args: ['poNumber', { static: false }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutPaymentTypeModule {
}
CheckoutPaymentTypeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutPaymentTypeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, declarations: [CheckoutPaymentTypeComponent], imports: [CommonModule,
        I18nModule,
        SpinnerModule, i1.ConfigModule], exports: [CheckoutPaymentTypeComponent] });
CheckoutPaymentTypeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, imports: [CommonModule,
        I18nModule,
        SpinnerModule,
        ConfigModule.withConfig({
            cmsComponents: {
                CheckoutPaymentType: {
                    component: CheckoutPaymentTypeComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentTypeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        SpinnerModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                CheckoutPaymentType: {
                                    component: CheckoutPaymentTypeComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CheckoutPaymentTypeComponent],
                    exports: [CheckoutPaymentTypeComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BCheckoutReviewSubmitComponent extends CheckoutReviewSubmitComponent {
    constructor(checkoutDeliveryAddressFacade, checkoutPaymentFacade, activeCartFacade, translationService, checkoutStepService, checkoutDeliveryModesFacade, checkoutPaymentTypeFacade, checkoutCostCenterFacade, userCostCenterService) {
        super(checkoutDeliveryAddressFacade, checkoutPaymentFacade, activeCartFacade, translationService, checkoutStepService, checkoutDeliveryModesFacade);
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.activeCartFacade = activeCartFacade;
        this.translationService = translationService;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.userCostCenterService = userCostCenterService;
        this.checkoutStepTypePaymentType = "paymentType" /* CheckoutStepType.PAYMENT_TYPE */;
    }
    get poNumber$() {
        return this.checkoutPaymentTypeFacade.getPurchaseOrderNumberState().pipe(filter((state) => !state.loading && !state.error), map((state) => state.data));
    }
    get paymentType$() {
        return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading && !state.error), map((state) => state.data));
    }
    get isAccountPayment$() {
        return this.checkoutPaymentTypeFacade.isAccountPayment();
    }
    get costCenter$() {
        return this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading && !state.error), map((state) => state.data));
    }
    getCheckoutPaymentSteps() {
        return [
            "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */,
            "paymentType" /* CheckoutStepType.PAYMENT_TYPE */,
            "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */,
        ];
    }
    getCostCenterCard(costCenter) {
        return combineLatest([
            this.translationService.translate('checkoutB2B.costCenter'),
        ]).pipe(map(([textTitle]) => {
            return {
                title: textTitle,
                textBold: costCenter?.name,
                text: ['(' + costCenter?.unit?.name + ')'],
            };
        }));
    }
    getPoNumberCard(poNumber) {
        return combineLatest([
            this.translationService.translate('checkoutB2B.review.poNumber'),
            this.translationService.translate('checkoutB2B.noPoNumber'),
        ]).pipe(map(([textTitle, noneTextTitle]) => {
            return {
                title: textTitle,
                textBold: poNumber ? poNumber : noneTextTitle,
            };
        }));
    }
    getPaymentTypeCard(paymentType) {
        return combineLatest([
            this.translationService.translate('checkoutB2B.progress.methodOfPayment'),
            this.translationService.translate('paymentTypes.paymentType_' + paymentType.code),
        ]).pipe(map(([textTitle, paymentTypeTranslation]) => {
            return {
                title: textTitle,
                textBold: paymentTypeTranslation,
            };
        }));
    }
}
B2BCheckoutReviewSubmitComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitComponent, deps: [{ token: i1$1.CheckoutDeliveryAddressFacade }, { token: i1$1.CheckoutPaymentFacade }, { token: i4.ActiveCartFacade }, { token: i1.TranslationService }, { token: i2.CheckoutStepService }, { token: i1$1.CheckoutDeliveryModesFacade }, { token: i5.CheckoutPaymentTypeFacade }, { token: i5.CheckoutCostCenterFacade }, { token: i1.UserCostCenterService }], target: i0.ɵɵFactoryTarget.Component });
B2BCheckoutReviewSubmitComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: B2BCheckoutReviewSubmitComponent, selector: "cx-review-submit", usesInheritance: true, ngImport: i0, template: "<div class=\"cx-review\">\n  <!-- TITLE -->\n  <h2 class=\"cx-review-title d-none d-lg-block d-xl-block\">\n    {{ 'checkoutReview.review' | cxTranslate }}\n  </h2>\n\n  <div class=\"cx-review-summary row\">\n    <ng-container *ngIf=\"(steps$ | async)?.slice(0, -1) as steps\">\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-payment-col\">\n        <ng-container *ngFor=\"let step of paymentSteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentType\">\n              <ng-container *ngTemplateOutlet=\"poNumber\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentType\">\n              <ng-container *ngTemplateOutlet=\"paymentType\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentDetails\">\n              <ng-container *ngTemplateOutlet=\"paymentMethod\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryAddress\">\n              <ng-container *ngTemplateOutlet=\"costCenter\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-shipping-col\">\n        <ng-container *ngFor=\"let step of deliverySteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryAddress\">\n              <ng-container *ngTemplateOutlet=\"deliveryAddress\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryMode\">\n              <ng-container *ngTemplateOutlet=\"deliveryMode\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </ng-container>\n  </div>\n\n  <!-- PO NUMBER SECTION -->\n  <ng-template #poNumber>\n    <div class=\"cx-review-summary-card\">\n      <cx-card [content]=\"getPoNumberCard(poNumber$ | async) | async\"></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentType' | cxTranslate\"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentType)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- PAYMENT TYPE SECTION -->\n  <ng-template #paymentType>\n    <div class=\"cx-review-summary-card\">\n      <cx-card\n        *ngIf=\"paymentType$ | async as paymentType\"\n        [content]=\"getPaymentTypeCard(paymentType) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentType' | cxTranslate\"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentType)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- COST CENTER SECTION -->\n  <ng-template #costCenter>\n    <ng-container *ngIf=\"isAccountPayment$ | async\">\n      <div class=\"cx-review-summary-card\">\n        <cx-card\n          *ngIf=\"costCenter$ | async as costCenter\"\n          [content]=\"getCostCenterCard(costCenter) | async\"\n        ></cx-card>\n        <div class=\"cx-review-summary-edit-step\">\n          <a\n            [attr.aria-label]=\"\n              'checkoutReview.editDeliveryAddressDetails' | cxTranslate\n            \"\n            [routerLink]=\"\n              {\n                cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryAddress)\n              } | cxUrl\n            \"\n            ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n          ></a>\n        </div>\n      </div>\n    </ng-container>\n  </ng-template>\n\n  <!-- DELIVERY ADDRESS SECTION -->\n  <ng-template #deliveryAddress>\n    <div\n      *ngIf=\"deliveryAddress$ | async as deliveryAddress\"\n      class=\"cx-review-summary-card cx-review-card-address\"\n    >\n      <cx-card\n        [content]=\"getDeliveryAddressCard(deliveryAddress) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"\n            'checkoutReview.editDeliveryAddressDetails' | cxTranslate\n          \"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryAddress)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- DELIVERY MODE SECTION -->\n  <ng-template #deliveryMode>\n    <div class=\"cx-review-summary-card cx-review-card-shipping\">\n      <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'!6.4'\">\n        <cx-card\n          *ngIf=\"deliveryMode$ | async as deliveryMode\"\n          [content]=\"getDeliveryModeCard(deliveryMode) | async\"\n        >\n        </cx-card>\n      </ng-container>\n      <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'6.4'\">\n        <div>\n          <cx-card\n            *ngIf=\"deliveryMode$ | async as deliveryMode\"\n            [content]=\"getDeliveryModeCard(deliveryMode) | async\"\n          >\n          </cx-card>\n          <ng-template\n            [cxOutlet]=\"cartOutlets.DELIVERY_MODE\"\n            [cxOutletContext]=\"{\n              item: cart$ | async,\n              readonly: true\n            }\"\n          >\n          </ng-template>\n        </div>\n      </ng-container>\n\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editDeliveryMode' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryMode) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- PAYMENT METHOD SECTION -->\n  <ng-template #paymentMethod>\n    <div class=\"cx-review-summary-card cx-review-card-payment\">\n      <div>\n        <cx-card\n          *ngIf=\"paymentDetails$ | async as paymentDetails\"\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentDetails' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentDetails) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- CART ITEM SECTION -->\n  <ng-container *ngIf=\"cart$ | async as cart\">\n    <div class=\"cx-review-cart-total d-none d-lg-block d-xl-block\">\n      {{\n        'cartItems.cartTotal'\n          | cxTranslate: { count: cart.deliveryItemsQuantity }\n      }}:\n      {{ cart.totalPrice?.formattedValue }}\n    </div>\n    <div class=\"cx-review-cart-heading d-block d-lg-none d-xl-none\">\n      {{ 'checkoutReview.placeOrder' | cxTranslate }}\n    </div>\n    <div class=\"cx-review-cart-item\" *ngIf=\"entries$ | async as entries\">\n      <cx-promotions\n        [promotions]=\"\n          (cart.appliedOrderPromotions || []).concat(\n            cart.potentialOrderPromotions || []\n          )\n        \"\n      ></cx-promotions>\n\n      <ng-template\n        [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          items: entries,\n          readonly: true,\n          promotionLocation: promotionLocation\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i7.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i7.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "component", type: i7.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i7.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "directive", type: i1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-review-submit', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-review\">\n  <!-- TITLE -->\n  <h2 class=\"cx-review-title d-none d-lg-block d-xl-block\">\n    {{ 'checkoutReview.review' | cxTranslate }}\n  </h2>\n\n  <div class=\"cx-review-summary row\">\n    <ng-container *ngIf=\"(steps$ | async)?.slice(0, -1) as steps\">\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-payment-col\">\n        <ng-container *ngFor=\"let step of paymentSteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentType\">\n              <ng-container *ngTemplateOutlet=\"poNumber\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentType\">\n              <ng-container *ngTemplateOutlet=\"paymentType\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypePaymentDetails\">\n              <ng-container *ngTemplateOutlet=\"paymentMethod\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryAddress\">\n              <ng-container *ngTemplateOutlet=\"costCenter\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n      <div class=\"col-md-12 col-lg-6 col-xl-6 cx-review-shipping-col\">\n        <ng-container *ngFor=\"let step of deliverySteps(steps)\">\n          <ng-container [ngSwitch]=\"step.type[0]\">\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryAddress\">\n              <ng-container *ngTemplateOutlet=\"deliveryAddress\"></ng-container>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"checkoutStepTypeDeliveryMode\">\n              <ng-container *ngTemplateOutlet=\"deliveryMode\"></ng-container>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </ng-container>\n  </div>\n\n  <!-- PO NUMBER SECTION -->\n  <ng-template #poNumber>\n    <div class=\"cx-review-summary-card\">\n      <cx-card [content]=\"getPoNumberCard(poNumber$ | async) | async\"></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentType' | cxTranslate\"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentType)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- PAYMENT TYPE SECTION -->\n  <ng-template #paymentType>\n    <div class=\"cx-review-summary-card\">\n      <cx-card\n        *ngIf=\"paymentType$ | async as paymentType\"\n        [content]=\"getPaymentTypeCard(paymentType) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentType' | cxTranslate\"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentType)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- COST CENTER SECTION -->\n  <ng-template #costCenter>\n    <ng-container *ngIf=\"isAccountPayment$ | async\">\n      <div class=\"cx-review-summary-card\">\n        <cx-card\n          *ngIf=\"costCenter$ | async as costCenter\"\n          [content]=\"getCostCenterCard(costCenter) | async\"\n        ></cx-card>\n        <div class=\"cx-review-summary-edit-step\">\n          <a\n            [attr.aria-label]=\"\n              'checkoutReview.editDeliveryAddressDetails' | cxTranslate\n            \"\n            [routerLink]=\"\n              {\n                cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryAddress)\n              } | cxUrl\n            \"\n            ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n          ></a>\n        </div>\n      </div>\n    </ng-container>\n  </ng-template>\n\n  <!-- DELIVERY ADDRESS SECTION -->\n  <ng-template #deliveryAddress>\n    <div\n      *ngIf=\"deliveryAddress$ | async as deliveryAddress\"\n      class=\"cx-review-summary-card cx-review-card-address\"\n    >\n      <cx-card\n        [content]=\"getDeliveryAddressCard(deliveryAddress) | async\"\n      ></cx-card>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"\n            'checkoutReview.editDeliveryAddressDetails' | cxTranslate\n          \"\n          [routerLink]=\"\n            {\n              cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryAddress)\n            } | cxUrl\n          \"\n          ><cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon\n        ></a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- DELIVERY MODE SECTION -->\n  <ng-template #deliveryMode>\n    <div class=\"cx-review-summary-card cx-review-card-shipping\">\n      <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'!6.4'\">\n        <cx-card\n          *ngIf=\"deliveryMode$ | async as deliveryMode\"\n          [content]=\"getDeliveryModeCard(deliveryMode) | async\"\n        >\n        </cx-card>\n      </ng-container>\n      <!-- TODO:(CXINT-2309) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'6.4'\">\n        <div>\n          <cx-card\n            *ngIf=\"deliveryMode$ | async as deliveryMode\"\n            [content]=\"getDeliveryModeCard(deliveryMode) | async\"\n          >\n          </cx-card>\n          <ng-template\n            [cxOutlet]=\"cartOutlets.DELIVERY_MODE\"\n            [cxOutletContext]=\"{\n              item: cart$ | async,\n              readonly: true\n            }\"\n          >\n          </ng-template>\n        </div>\n      </ng-container>\n\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editDeliveryMode' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypeDeliveryMode) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- PAYMENT METHOD SECTION -->\n  <ng-template #paymentMethod>\n    <div class=\"cx-review-summary-card cx-review-card-payment\">\n      <div>\n        <cx-card\n          *ngIf=\"paymentDetails$ | async as paymentDetails\"\n          [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n        ></cx-card>\n      </div>\n      <div class=\"cx-review-summary-edit-step\">\n        <a\n          [attr.aria-label]=\"'checkoutReview.editPaymentDetails' | cxTranslate\"\n          [routerLink]=\"\n            { cxRoute: getCheckoutStepUrl(checkoutStepTypePaymentDetails) }\n              | cxUrl\n          \"\n        >\n          <cx-icon aria-hidden=\"true\" [type]=\"iconTypes.PENCIL\"></cx-icon>\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <!-- CART ITEM SECTION -->\n  <ng-container *ngIf=\"cart$ | async as cart\">\n    <div class=\"cx-review-cart-total d-none d-lg-block d-xl-block\">\n      {{\n        'cartItems.cartTotal'\n          | cxTranslate: { count: cart.deliveryItemsQuantity }\n      }}:\n      {{ cart.totalPrice?.formattedValue }}\n    </div>\n    <div class=\"cx-review-cart-heading d-block d-lg-none d-xl-none\">\n      {{ 'checkoutReview.placeOrder' | cxTranslate }}\n    </div>\n    <div class=\"cx-review-cart-item\" *ngIf=\"entries$ | async as entries\">\n      <cx-promotions\n        [promotions]=\"\n          (cart.appliedOrderPromotions || []).concat(\n            cart.potentialOrderPromotions || []\n          )\n        \"\n      ></cx-promotions>\n\n      <ng-template\n        [cxOutlet]=\"cartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          items: entries,\n          readonly: true,\n          promotionLocation: promotionLocation\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CheckoutDeliveryAddressFacade }, { type: i1$1.CheckoutPaymentFacade }, { type: i4.ActiveCartFacade }, { type: i1.TranslationService }, { type: i2.CheckoutStepService }, { type: i1$1.CheckoutDeliveryModesFacade }, { type: i5.CheckoutPaymentTypeFacade }, { type: i5.CheckoutCostCenterFacade }, { type: i1.UserCostCenterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class B2BCheckoutReviewSubmitModule {
}
B2BCheckoutReviewSubmitModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
B2BCheckoutReviewSubmitModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, declarations: [B2BCheckoutReviewSubmitComponent], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule,
        FeaturesConfigModule], exports: [B2BCheckoutReviewSubmitComponent] });
B2BCheckoutReviewSubmitModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CheckoutReviewOrder: {
                    component: B2BCheckoutReviewSubmitComponent,
                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        CardModule,
        I18nModule,
        UrlModule,
        RouterModule,
        PromotionsModule,
        IconModule,
        OutletModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: B2BCheckoutReviewSubmitModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                        PromotionsModule,
                        IconModule,
                        OutletModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CheckoutReviewOrder: {
                                    component: B2BCheckoutReviewSubmitComponent,
                                    guards: [CheckoutAuthGuard, CartNotEmptyGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [B2BCheckoutReviewSubmitComponent],
                    exports: [B2BCheckoutReviewSubmitComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BAuthGuard extends CheckoutAuthGuard {
    constructor(authService, authRedirectService, checkoutConfigService, activeCartFacade, semanticPathService, router, userAccountFacade, globalMessageService) {
        super(authService, authRedirectService, checkoutConfigService, activeCartFacade, semanticPathService, router);
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.checkoutConfigService = checkoutConfigService;
        this.activeCartFacade = activeCartFacade;
        this.semanticPathService = semanticPathService;
        this.router = router;
        this.userAccountFacade = userAccountFacade;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return combineLatest([
            this.authService.isUserLoggedIn(),
            this.activeCartFacade.isGuestCart(),
            this.userAccountFacade.get(),
            this.activeCartFacade.isStable(),
        ]).pipe(map(([isLoggedIn, isGuestCart, user, isStable]) => ({
            isLoggedIn,
            isGuestCart,
            user,
            isStable,
        })), filter((data) => data.isStable), 
        // if the user is authenticated and we have their data, OR if the user is anonymous
        filter((data) => (!!data.user && data.isLoggedIn) || !data.isLoggedIn), map((data) => {
            if (!data.isLoggedIn) {
                return data.isGuestCart ? true : this.handleAnonymousUser();
            }
            else if (data.user && 'roles' in data.user) {
                return this.handleUserRole(data.user);
            }
            return data.isLoggedIn;
        }));
    }
    handleUserRole(user) {
        const roles = user.roles;
        if (roles?.includes(B2BUserRole.CUSTOMER)) {
            return true;
        }
        this.globalMessageService.add({ key: 'checkoutB2B.invalid.accountType' }, GlobalMessageType.MSG_TYPE_WARNING);
        return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
    }
}
CheckoutB2BAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BAuthGuard, deps: [{ token: i1.AuthService }, { token: i1.AuthRedirectService }, { token: i2.CheckoutConfigService }, { token: i4.ActiveCartFacade }, { token: i1.SemanticPathService }, { token: i3.Router }, { token: i5$1.UserAccountFacade }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutB2BAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.AuthRedirectService }, { type: i2.CheckoutConfigService }, { type: i4.ActiveCartFacade }, { type: i1.SemanticPathService }, { type: i3.Router }, { type: i5$1.UserAccountFacade }, { type: i1.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BStepsSetGuard extends CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, checkoutPaymentTypeFacade, checkoutCostCenterFacade, activeCartFacade) {
        super(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, activeCartFacade);
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.activeCartFacade = activeCartFacade;
        this.logger = inject(LoggerService);
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return combineLatest([
            this.checkoutStepService.steps$,
            this.checkoutPaymentTypeFacade.isAccountPayment(),
        ]).pipe(tap(([, isAccount]) => {
            this.checkoutStepService.disableEnableStep("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, isAccount);
        }), take(1), switchMap(([steps, isAccount]) => {
            currentIndex = steps.findIndex((step) => {
                const stepRouteUrl = `/${this.routingConfigService.getRouteConfig(step.routeName)?.paths?.[0]}`;
                return stepRouteUrl === currentRouteUrl;
            });
            // get current step
            let currentStep;
            if (currentIndex >= 0) {
                currentStep = steps[currentIndex];
            }
            if (Boolean(currentStep)) {
                return this.isB2BStepSet(steps[currentIndex - 1], isAccount);
            }
            else {
                if (isDevMode()) {
                    this.logger.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isB2BStepSet(step, isAccountPayment) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "paymentType" /* CheckoutStepType.PAYMENT_TYPE */: {
                    return this.isPaymentTypeSet(step);
                }
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddressAndCostCenterSet(step, isAccountPayment);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isPaymentTypeSet(step) {
        return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentType) => {
            if (paymentType) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryAddressAndCostCenterSet(step, isAccountPayment) {
        return combineLatest([
            this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data)),
            this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data)),
        ]).pipe(map(([deliveryAddress, costCenter]) => {
            if (isAccountPayment) {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    !!costCenter) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
            else {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    costCenter === undefined) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
        }));
    }
}
CheckoutB2BStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BStepsSetGuard, deps: [{ token: i2.CheckoutStepService }, { token: i1.RoutingConfigService }, { token: i1$1.CheckoutDeliveryAddressFacade }, { token: i1$1.CheckoutPaymentFacade }, { token: i1$1.CheckoutDeliveryModesFacade }, { token: i3.Router }, { token: i5.CheckoutPaymentTypeFacade }, { token: i5.CheckoutCostCenterFacade }, { token: i4.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutB2BStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.CheckoutStepService }, { type: i1.RoutingConfigService }, { type: i1$1.CheckoutDeliveryAddressFacade }, { type: i1$1.CheckoutPaymentFacade }, { type: i1$1.CheckoutDeliveryModesFacade }, { type: i3.Router }, { type: i5.CheckoutPaymentTypeFacade }, { type: i5.CheckoutCostCenterFacade }, { type: i4.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BComponentsModule {
}
CheckoutB2BComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, imports: [CommonModule,
        CheckoutCostCenterModule,
        CheckoutPaymentTypeModule,
        B2BCheckoutDeliveryAddressModule,
        B2BCheckoutReviewSubmitModule] });
CheckoutB2BComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, providers: [
        {
            provide: CheckoutAuthGuard,
            useExisting: CheckoutB2BAuthGuard,
        },
        {
            provide: CheckoutStepsSetGuard,
            useExisting: CheckoutB2BStepsSetGuard,
        },
    ], imports: [CommonModule,
        CheckoutCostCenterModule,
        CheckoutPaymentTypeModule,
        B2BCheckoutDeliveryAddressModule,
        B2BCheckoutReviewSubmitModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CheckoutCostCenterModule,
                        CheckoutPaymentTypeModule,
                        B2BCheckoutDeliveryAddressModule,
                        B2BCheckoutReviewSubmitModule,
                    ],
                    providers: [
                        {
                            provide: CheckoutAuthGuard,
                            useExisting: CheckoutB2BAuthGuard,
                        },
                        {
                            provide: CheckoutStepsSetGuard,
                            useExisting: CheckoutB2BStepsSetGuard,
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

/**
 * Generated bundle index. Do not edit.
 */

export { B2BCheckoutDeliveryAddressComponent, B2BCheckoutDeliveryAddressModule, B2BCheckoutReviewSubmitComponent, B2BCheckoutReviewSubmitModule, CheckoutB2BAuthGuard, CheckoutB2BComponentsModule, CheckoutB2BStepsSetGuard, CheckoutCostCenterComponent, CheckoutCostCenterModule, CheckoutPaymentTypeComponent, CheckoutPaymentTypeModule };
//# sourceMappingURL=spartacus-checkout-b2b-components.mjs.map
