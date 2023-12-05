import * as i0 from '@angular/core';
import { Component, inject, Injectable, Optional, ChangeDetectionStrategy, ViewChild, EventEmitter, Input, Output, ViewChildren, Pipe, HostBinding, NgModule } from '@angular/core';
import * as i1 from '@spartacus/storefront';
import { ICON_TYPE, CustomFormValidators, DIALOG_TYPE, DirectionMode, BREAKPOINT, FormErrorsModule, IconModule, SpinnerModule, PasswordVisibilityToggleModule, KeyboardFocusModule, NgSelectA11yModule, SortingModule, PaginationModule, MessageComponentModule } from '@spartacus/storefront';
import * as i1$1 from '@spartacus/core';
import { GlobalMessageType, RoutingService, OCC_CART_ID_CURRENT, I18nModule, FeaturesConfigModule, provideDefaultConfig } from '@spartacus/core';
import * as i1$2 from '@angular/forms';
import { FormControl, Validators, UntypedFormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, combineLatest, iif, defer, EMPTY, of, NEVER } from 'rxjs';
import { take, map, shareReplay, filter, tap, concatMap, finalize, first, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as i2 from '@spartacus/cart/saved-cart/root';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$2 from '@spartacus/cart/base/root';
import * as i2$1 from '@spartacus/asm/root';
import { ASM_ENABLED_LOCAL_STORAGE_KEY, CustomerListColumnActionType } from '@spartacus/asm/root';
import { AsmDialogActionType } from '@spartacus/asm/customer-360/root';
import * as i6 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i2$3 from '@spartacus/asm/core';
import * as i2$4 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var BIND_CART_DIALOG_ACTION;
(function (BIND_CART_DIALOG_ACTION) {
    BIND_CART_DIALOG_ACTION["CANCEL"] = "CANCEL";
    BIND_CART_DIALOG_ACTION["REPLACE"] = "REPLACE";
})(BIND_CART_DIALOG_ACTION || (BIND_CART_DIALOG_ACTION = {}));
class AsmBindCartDialogComponent {
    constructor(launchDialogService) {
        this.launchDialogService = launchDialogService;
        this.BIND_CART_ACTION = BIND_CART_DIALOG_ACTION;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
}
AsmBindCartDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartDialogComponent, deps: [{ token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
AsmBindCartDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmBindCartDialogComponent, selector: "cx-asm-bind-cart-dialog", ngImport: i0, template: "<div\n  class=\"cx-asm-bind-cart-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <h2 id=\"asm-bind-cart-dialog-title\" class=\"title modal-title\">\n        {{ 'asm.bindCart.dialog.title' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-dialog-row\">\n        <div class=\"cx-dialog-item\">\n          {{ 'asm.bindCart.dialog.body' | cxTranslate }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.REPLACE)\"\n        [attr.aria-label]=\"'asm.bindCart.dialog.actions.replace' | cxTranslate\"\n        class=\"btn btn-primary\"\n        type=\"button\"\n      >\n        {{ 'asm.bindCart.dialog.actions.replace' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-bind-cart-dialog', template: "<div\n  class=\"cx-asm-bind-cart-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <h2 id=\"asm-bind-cart-dialog-title\" class=\"title modal-title\">\n        {{ 'asm.bindCart.dialog.title' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-dialog-row\">\n        <div class=\"cx-dialog-item\">\n          {{ 'asm.bindCart.dialog.body' | cxTranslate }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.REPLACE)\"\n        [attr.aria-label]=\"'asm.bindCart.dialog.actions.replace' | cxTranslate\"\n        class=\"btn btn-primary\"\n        type=\"button\"\n      >\n        {{ 'asm.bindCart.dialog.actions.replace' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var SAVE_CART_DIALOG_ACTION;
(function (SAVE_CART_DIALOG_ACTION) {
    SAVE_CART_DIALOG_ACTION["CANCEL"] = "CANCEL";
    SAVE_CART_DIALOG_ACTION["SAVE"] = "SAVE";
})(SAVE_CART_DIALOG_ACTION || (SAVE_CART_DIALOG_ACTION = {}));
class AsmSaveCartDialogComponent {
    constructor(launchDialogService, savedCartFacade) {
        this.launchDialogService = launchDialogService;
        this.savedCartFacade = savedCartFacade;
        this.BIND_CART_ACTION = SAVE_CART_DIALOG_ACTION;
        this.showDialogAlert$ = new BehaviorSubject(true);
        this.globalMessageType = GlobalMessageType;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
    }
    ngOnInit() {
        this.launchDialogService.data$.pipe(take(1)).subscribe((data) => {
            this.cart = data;
            this.setCartTotalQty();
        });
    }
    setCartTotalQty() {
        let count = 0;
        if (this.cart.entries) {
            for (const entry of this.cart.entries) {
                count += entry.quantity ? entry.quantity : 0;
            }
        }
        this.cartQty = count;
    }
    closeDialogAlert() {
        this.showDialogAlert$.next(false);
    }
    closeModal(reason) {
        if (reason === SAVE_CART_DIALOG_ACTION.SAVE) {
            this.saveCart();
        }
        this.launchDialogService.closeDialog(reason);
    }
    saveCart() {
        this.savedCartFacade.saveCart({
            cartId: this.cart.code,
            saveCartName: this.cart.code,
            saveCartDescription: '-',
        });
    }
}
AsmSaveCartDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmSaveCartDialogComponent, deps: [{ token: i1.LaunchDialogService }, { token: i2.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Component });
AsmSaveCartDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmSaveCartDialogComponent, selector: "cx-asm-save-cart-dialog", ngImport: i0, template: "<div\n  class=\"cx-asm-save-cart-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <h2 id=\"asm-save-cart-dialog-title\" class=\"title modal-title\">\n        {{ 'asm.saveCart.dialog.title' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <ng-container *ngIf=\"cartQty > 0; else showSaveCartWarning\">\n        <div class=\"message-container\">\n          <cx-message\n            *ngIf=\"showDialogAlert$ | async\"\n            [text]=\"'asm.saveCart.dialog.saveInfo' | cxTranslate\"\n            [type]=\"globalMessageType.MSG_TYPE_INFO\"\n            (closeMessage)=\"closeDialogAlert()\"\n          >\n          </cx-message>\n        </div>\n      </ng-container>\n      <ng-template #showSaveCartWarning>\n        <div class=\"message-container\">\n          <cx-message\n            *ngIf=\"showDialogAlert$ | async\"\n            [text]=\"'asm.saveCart.dialog.disableInfo' | cxTranslate\"\n            [type]=\"globalMessageType.MSG_TYPE_WARNING\"\n            (closeMessage)=\"closeDialogAlert()\"\n          >\n          </cx-message>\n        </div>\n      </ng-template>\n\n      <div class=\"cx-dialog-content\">\n        <div class=\"cx-dialog-row row\">\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-right item-left-text\"\n          >\n            {{ 'asm.saveCart.dialog.row.id' | cxTranslate }}\n          </div>\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-left item-right-text\"\n          >\n            {{ cart.code }}\n          </div>\n        </div>\n        <div class=\"cx-dialog-row row\">\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-right item-left-text\"\n          >\n            {{ 'asm.saveCart.dialog.row.qty' | cxTranslate }}\n          </div>\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-left item-right-text\"\n          >\n            {{ cartQty }}\n          </div>\n        </div>\n        <div class=\"cx-dialog-row row\">\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-right item-left-text\"\n          >\n            {{ 'asm.saveCart.dialog.row.total' | cxTranslate }}\n          </div>\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-left item-right-text\"\n          >\n            {{ cart.totalPriceWithTax?.formattedValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        id=\"asm-save-cart-dialog-btn\"\n        (click)=\"closeModal(BIND_CART_ACTION.SAVE)\"\n        [attr.aria-label]=\"'asm.saveCart.dialog.actions.save' | cxTranslate\"\n        class=\"btn btn-primary\"\n        type=\"button\"\n        [disabled]=\"this.cartQty === 0\"\n      >\n        {{ 'asm.saveCart.dialog.actions.save' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmSaveCartDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-save-cart-dialog', template: "<div\n  class=\"cx-asm-save-cart-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <h2 id=\"asm-save-cart-dialog-title\" class=\"title modal-title\">\n        {{ 'asm.saveCart.dialog.title' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <ng-container *ngIf=\"cartQty > 0; else showSaveCartWarning\">\n        <div class=\"message-container\">\n          <cx-message\n            *ngIf=\"showDialogAlert$ | async\"\n            [text]=\"'asm.saveCart.dialog.saveInfo' | cxTranslate\"\n            [type]=\"globalMessageType.MSG_TYPE_INFO\"\n            (closeMessage)=\"closeDialogAlert()\"\n          >\n          </cx-message>\n        </div>\n      </ng-container>\n      <ng-template #showSaveCartWarning>\n        <div class=\"message-container\">\n          <cx-message\n            *ngIf=\"showDialogAlert$ | async\"\n            [text]=\"'asm.saveCart.dialog.disableInfo' | cxTranslate\"\n            [type]=\"globalMessageType.MSG_TYPE_WARNING\"\n            (closeMessage)=\"closeDialogAlert()\"\n          >\n          </cx-message>\n        </div>\n      </ng-template>\n\n      <div class=\"cx-dialog-content\">\n        <div class=\"cx-dialog-row row\">\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-right item-left-text\"\n          >\n            {{ 'asm.saveCart.dialog.row.id' | cxTranslate }}\n          </div>\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-left item-right-text\"\n          >\n            {{ cart.code }}\n          </div>\n        </div>\n        <div class=\"cx-dialog-row row\">\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-right item-left-text\"\n          >\n            {{ 'asm.saveCart.dialog.row.qty' | cxTranslate }}\n          </div>\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-left item-right-text\"\n          >\n            {{ cartQty }}\n          </div>\n        </div>\n        <div class=\"cx-dialog-row row\">\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-right item-left-text\"\n          >\n            {{ 'asm.saveCart.dialog.row.total' | cxTranslate }}\n          </div>\n          <div\n            class=\"cx-dialog-item col-sm-6 col-md-6 text-left item-right-text\"\n          >\n            {{ cart.totalPriceWithTax?.formattedValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        id=\"asm-save-cart-dialog-btn\"\n        (click)=\"closeModal(BIND_CART_ACTION.SAVE)\"\n        [attr.aria-label]=\"'asm.saveCart.dialog.actions.save' | cxTranslate\"\n        class=\"btn btn-primary\"\n        type=\"button\"\n        [disabled]=\"this.cartQty === 0\"\n      >\n        {{ 'asm.saveCart.dialog.actions.save' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i2.SavedCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmComponentService {
    constructor(authService, csAgentAuthService, winRef, 
    // TODO(CXSPA-3090): Remove optional flag in 7.0 where service is used
    asmEnablerService, asmDeepLinkService) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.winRef = winRef;
        this.asmEnablerService = asmEnablerService;
        this.asmDeepLinkService = asmDeepLinkService;
        this.isEmulatedByDeepLink$ = new BehaviorSubject(false);
        this.showDeeplinkCartInfoAlert$ = new BehaviorSubject(false);
        this.routingService = inject(RoutingService);
        // TODO(CXSPA-3090): We can remove this in 7.0 and use asmDeepLinkService instead.
        this.searchparam = new URLSearchParams(this.winRef?.location?.search);
    }
    /**
     * Returns a deep link parameter value if it is in the url.
     */
    getSearchParameter(key) {
        // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0
        return (this.asmDeepLinkService?.getSearchParameter(key) ??
            this.searchparam.get(key));
    }
    isEmulatedByDeepLink() {
        return this.isEmulatedByDeepLink$;
    }
    setEmulatedByDeepLink(emulated) {
        this.isEmulatedByDeepLink$.next(emulated);
    }
    setShowDeeplinkCartInfoAlert(display) {
        this.showDeeplinkCartInfoAlert$.next(display);
    }
    shouldShowDeeplinkCartInfoAlert() {
        return this.showDeeplinkCartInfoAlert$;
    }
    logoutCustomerSupportAgentAndCustomer() {
        this.csAgentAuthService.logoutCustomerSupportAgent();
    }
    logoutCustomer() {
        this.authService.logout();
    }
    isCustomerEmulationSessionInProgress() {
        return this.csAgentAuthService.isCustomerEmulated();
    }
    /**
     * We're currently only removing the persisted storage in the browser
     * to ensure the ASM experience isn't loaded on the next visit. There are a few
     * optimizations we could think of:
     * - drop the `asm` parameter from the URL, in case it's still there
     * - remove the generated UI from the DOM (outlets currently do not support this)
     */
    unload() {
        if (this.winRef.localStorage) {
            this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
        }
    }
    /**
     * check whether try to emulate customer from deeplink
     */
    isEmulateInURL() {
        // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0
        return ((this.asmDeepLinkService?.isEmulateInURL() ??
            this.asmEnablerService?.isEmulateInURL()) ||
            false);
    }
    /**
     * Returns valid deep link parameters in the url.
     */
    getDeepLinkUrlParams() {
        return this.asmDeepLinkService?.getParamsInUrl();
    }
    /**
     * Handles the navigation based on deep link parameters in the URL
     * or passed parameter.
     */
    handleDeepLinkNavigation(parameters = this.getDeepLinkUrlParams()) {
        this.asmDeepLinkService?.handleNavigation(parameters);
    }
    handleAsmDialogAction(event) {
        if (typeof event === 'object' &&
            event.actionType === AsmDialogActionType.NAVIGATE) {
            this.routingService.go(event.route);
        }
    }
}
AsmComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentService, deps: [{ token: i1$1.AuthService }, { token: i2$1.CsAgentAuthService }, { token: i1$1.WindowRef }, { token: i2$1.AsmEnablerService, optional: true }, { token: i2$1.AsmDeepLinkService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
AsmComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i2$1.CsAgentAuthService }, { type: i1$1.WindowRef }, { type: i2$1.AsmEnablerService, decorators: [{
                    type: Optional
                }] }, { type: i2$1.AsmDeepLinkService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DotSpinnerComponent {
}
DotSpinnerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DotSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DotSpinnerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DotSpinnerComponent, selector: "cx-dot-spinner", ngImport: i0, template: "<div></div>\n<div></div>\n<div></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DotSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-dot-spinner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div></div>\n<div></div>\n<div></div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmBindCartComponent {
    constructor(globalMessageService, activeCartFacade, multiCartFacade, asmBindCartFacade, launchDialogService, savedCartFacade, asmComponentService, routing, featureConfig) {
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.asmBindCartFacade = asmBindCartFacade;
        this.launchDialogService = launchDialogService;
        this.savedCartFacade = savedCartFacade;
        this.asmComponentService = asmComponentService;
        this.routing = routing;
        this.featureConfig = featureConfig;
        this.activeCartValidator = (control) => {
            if (control.value === this.activeCartId) {
                return { activeCartError: true };
            }
            if (!!this.deepLinkCartId && control.value !== this.deepLinkCartId) {
                this.resetDeeplinkCart();
            }
            return null;
        };
        this.cartId = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            this.activeCartValidator,
        ]);
        this.loading$ = new BehaviorSubject(false);
        this.valid$ = this.cartId.statusChanges.pipe(map((status) => status === 'VALID'), shareReplay(1));
        this.activeCartId = '';
        this.deepLinkCartId = '';
        this.displayBindCartBtn$ = new BehaviorSubject(true);
        this.displaySaveCartBtn$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscribeForDeeplinkCart();
        this.subscription.add(this.activeCartFacade.getActiveCartId().subscribe((response) => {
            this.activeCartId = response ?? '';
            this.cartId.setValue(this.deepLinkCartId || this.activeCartId);
        }));
    }
    resetInput() {
        if (!this.cartId.value) {
            this.cartId.setValue(this.activeCartId);
        }
    }
    /**
     * Bind the input cart number to the customer
     */
    bindCartToCustomer() {
        const anonymousCartId = this.cartId.value;
        const subscription = combineLatest([
            this.loading$.asObservable(),
            this.valid$,
        ])
            .pipe(take(1), filter(([loading, valid]) => !loading && valid), tap(() => this.loading$.next(true)), concatMap(() => this.activeCartFacade.getActive().pipe(map((cart) => cart.deliveryItemsQuantity ?? 0), take(1))), concatMap((cartItemCount) => iif(() => Boolean(this.activeCartId && cartItemCount), this.openDialog(this.activeCartId, anonymousCartId), this.simpleBindCart(anonymousCartId))), finalize(() => this.loading$.next(false)))
            .subscribe({
            next: () => {
                this.globalMessageService.add({ key: 'asm.bindCart.success' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
            },
            error: (error) => {
                this.globalMessageService.add(error.details?.[0].message ?? '', GlobalMessageType.MSG_TYPE_ERROR);
            },
        });
        this.subscription.add(subscription);
    }
    onSaveInactiveCart() {
        this.asmComponentService?.setShowDeeplinkCartInfoAlert(false);
        const customerId = this.asmComponentService?.getSearchParameter('customerId');
        this.multiCartFacade.loadCart({
            cartId: this.deepLinkCartId,
            userId: customerId,
        });
        this.multiCartFacade
            .getCartEntity(this.deepLinkCartId)
            .pipe(filter((state) => state.loading === false && state.success === true), take(1), map((state) => state.value), filter((cart) => !!cart))
            .subscribe((cart) => {
            this.openASMSaveCartDialog(cart);
        });
        this.afterCloseASMSaveCartDialog();
    }
    clearText() {
        this.cartId.setValue('');
        this.resetDeeplinkCart();
    }
    resetDeeplinkCart() {
        if (this.featureConfig?.isLevel('6.2')) {
            this.deepLinkCartId = '';
            this.displayBindCartBtn$.next(true);
            this.displaySaveCartBtn$.next(false);
            this.asmComponentService?.setShowDeeplinkCartInfoAlert(false);
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Binds cart on subscription and reloads cart
     */
    simpleBindCart(anonymousCartId) {
        return defer(() => this.asmBindCartFacade.bindCart(anonymousCartId)).pipe(tap(() => this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT)));
    }
    /**
     * Opens dialog and passes non-cancel result to select action
     */
    openDialog(activeCartId, anonymousCartId) {
        return defer(() => {
            this.launchDialogService.openDialogAndSubscribe("ASM_BIND_CART" /* LAUNCH_CALLER.ASM_BIND_CART */, this.bindToCartElemRef);
            return this.launchDialogService.dialogClose.pipe(filter((result) => Boolean(result)), take(1));
        }).pipe(filter((dialogResult) => Boolean(dialogResult)), concatMap((dialogResult) => {
            return this.selectBindAction(activeCartId, anonymousCartId, dialogResult);
        }));
    }
    selectBindAction(activeCartId, anonymousCartId, action) {
        switch (action) {
            case BIND_CART_DIALOG_ACTION.REPLACE:
                return this.replaceCart(activeCartId, anonymousCartId);
            case BIND_CART_DIALOG_ACTION.CANCEL:
            default:
                return EMPTY;
        }
    }
    replaceCart(previousActiveCartId, anonymousCartId) {
        return this.simpleBindCart(anonymousCartId).pipe(tap(() => {
            this.savedCartFacade.saveCart({
                cartId: previousActiveCartId,
                saveCartName: previousActiveCartId,
                // TODO(#12660): Remove default value once backend is updated
                saveCartDescription: '-',
            });
        }));
    }
    // TODO(CXSPA-3090): Remove optional service flags in 7.0
    subscribeForDeeplinkCart() {
        if (this.featureConfig?.isLevel('6.2')) {
            this.subscription.add(this.asmComponentService
                ?.isEmulatedByDeepLink()
                .pipe(filter((emulated) => emulated &&
                !!this.asmComponentService?.getSearchParameter('cartId')))
                .subscribe(() => {
                // TODO(CXSPA-3090): Remove feature flag in 7.0.
                if (this.featureConfig?.isLevel('6.3')) {
                    const cartType = this.asmComponentService?.getSearchParameter('cartType');
                    if (cartType === 'inactive' || cartType === 'active') {
                        this.displayBindCartBtn$.next(false);
                        this.displaySaveCartBtn$.next(cartType === 'inactive');
                        this.deepLinkCartId =
                            this.asmComponentService?.getSearchParameter('cartId');
                        this.cartId.setValue(this.deepLinkCartId);
                        this.asmComponentService?.setShowDeeplinkCartInfoAlert(true);
                        this.asmComponentService?.handleDeepLinkNavigation();
                    }
                    return;
                }
                // TODO(CXSPA-3090): Remove this implementation in 7.0
                if (this.isDeepLinkInactiveCart()) {
                    this.displayBindCartBtn$.next(false);
                    this.displaySaveCartBtn$.next(true);
                    this.onDeeplinkCart();
                }
                else if (this.isDeepLinkActiveCart()) {
                    this.onDeeplinkCart();
                    this.goToActiveCartDetail();
                    this.displayBindCartBtn$.next(false);
                    this.displaySaveCartBtn$.next(false);
                }
            }));
        }
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    onDeeplinkCart() {
        this.deepLinkCartId = this.asmComponentService?.getSearchParameter('cartId');
        this.cartId.setValue(this.deepLinkCartId);
        this.asmComponentService?.setShowDeeplinkCartInfoAlert(true);
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    isDeepLinkInactiveCart() {
        const cartType = this.asmComponentService?.getSearchParameter('cartType');
        return cartType === 'inactive';
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    isDeepLinkActiveCart() {
        const cartType = this.asmComponentService?.getSearchParameter('cartType');
        return cartType === 'active';
    }
    openASMSaveCartDialog(inactiveCart) {
        this.launchDialogService.openDialogAndSubscribe("ASM_SAVE_CART" /* LAUNCH_CALLER.ASM_SAVE_CART */, this.saveInactiveCartElemRef, inactiveCart);
    }
    afterCloseASMSaveCartDialog() {
        this.launchDialogService.dialogClose
            .pipe(filter((result) => result === SAVE_CART_DIALOG_ACTION.SAVE), take(1), tap(() => this.loading$.next(true)))
            .subscribe();
        this.savedCartFacade
            .getSaveCartProcessSuccess()
            .pipe(filter((success) => success), take(1), tap(() => this.loading$.next(false)))
            .subscribe(() => {
            this.goToSavedCartDetails(this.deepLinkCartId);
            this.displaySaveCartBtn$.next(false);
        });
        this.savedCartFacade
            .getSaveCartProcessError()
            .pipe(filter((error) => error), take(1), tap(() => this.loading$.next(false)))
            .subscribe();
    }
    goToSavedCartDetails(cartId) {
        this.routing?.go({
            cxRoute: 'savedCartsDetails',
            params: { savedCartId: cartId },
        });
    }
    /**
     * @deprecated in 6.3: Will be removed in CXSPA-3090.
     */
    goToActiveCartDetail() {
        this.routing?.go({ cxRoute: 'cart' });
    }
}
AsmBindCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartComponent, deps: [{ token: i1$1.GlobalMessageService }, { token: i2$2.ActiveCartFacade }, { token: i2$2.MultiCartFacade }, { token: i2$1.AsmBindCartFacade }, { token: i1.LaunchDialogService }, { token: i2.SavedCartFacade }, { token: AsmComponentService, optional: true }, { token: i1$1.RoutingService, optional: true }, { token: i1$1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AsmBindCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmBindCartComponent, selector: "cx-asm-bind-cart", viewQueries: [{ propertyName: "bindToCartElemRef", first: true, predicate: ["bindToCart"], descendants: true }, { propertyName: "saveInactiveCartElemRef", first: true, predicate: ["saveInactiveCart"], descendants: true }], ngImport: i0, template: "<form>\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    *ngIf=\"displayBindCartBtn$ | async\"\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n    (click)=\"bindCartToCustomer()\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <button\n      id=\"asm-save-inactive-cart-btn\"\n      #saveInactiveCart\n      *ngIf=\"displaySaveCartBtn$ | async\"\n      class=\"cx-asm-bindCartToCustomer cx-asm-active\"\n      type=\"submit\"\n      [class.cx-bind-loading]=\"loading$ | async\"\n      (click)=\"onSaveInactiveCart()\"\n    >\n      <span [attr.aria-hidden]=\"loading$ | async\">\n        {{ 'asm.saveCart.saveCartBtn' | cxTranslate }}\n      </span>\n      <cx-dot-spinner\n        [attr.aria-hidden]=\"!(loading$ | async)\"\n        [attr.aria-label]=\"'common.loading' | cxTranslate\"\n      ></cx-dot-spinner>\n    </button>\n  </ng-container>\n</form>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-bind-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form>\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    *ngIf=\"displayBindCartBtn$ | async\"\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n    (click)=\"bindCartToCustomer()\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <button\n      id=\"asm-save-inactive-cart-btn\"\n      #saveInactiveCart\n      *ngIf=\"displaySaveCartBtn$ | async\"\n      class=\"cx-asm-bindCartToCustomer cx-asm-active\"\n      type=\"submit\"\n      [class.cx-bind-loading]=\"loading$ | async\"\n      (click)=\"onSaveInactiveCart()\"\n    >\n      <span [attr.aria-hidden]=\"loading$ | async\">\n        {{ 'asm.saveCart.saveCartBtn' | cxTranslate }}\n      </span>\n      <cx-dot-spinner\n        [attr.aria-hidden]=\"!(loading$ | async)\"\n        [attr.aria-label]=\"'common.loading' | cxTranslate\"\n      ></cx-dot-spinner>\n    </button>\n  </ng-container>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.GlobalMessageService }, { type: i2$2.ActiveCartFacade }, { type: i2$2.MultiCartFacade }, { type: i2$1.AsmBindCartFacade }, { type: i1.LaunchDialogService }, { type: i2.SavedCartFacade }, { type: AsmComponentService, decorators: [{
                    type: Optional
                }] }, { type: i1$1.RoutingService, decorators: [{
                    type: Optional
                }] }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { bindToCartElemRef: [{
                type: ViewChild,
                args: ['bindToCart']
            }], saveInactiveCartElemRef: [{
                type: ViewChild,
                args: ['saveInactiveCart']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCreateCustomerFormComponent {
    constructor(launchDialogService, fb, asmCreateCustomerFacade, translationService) {
        this.launchDialogService = launchDialogService;
        this.fb = fb;
        this.asmCreateCustomerFacade = asmCreateCustomerFacade;
        this.translationService = translationService;
        this.iconTypes = ICON_TYPE;
        this.isLoading$ = new BehaviorSubject(false);
        this.showDialogInfoAlert = true;
        this.globalMessageType = GlobalMessageType;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, CustomFormValidators.emailValidator]],
        });
    }
    submitForm() {
        if (this.registerForm.valid) {
            this.registerUser();
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
    registerUser() {
        this.isLoading$.next(true);
        const { firstName, lastName, email } = this.registerForm.value;
        this.createdCustomer = {
            firstName: firstName ?? '',
            lastName: lastName ?? '',
            email: email ?? '',
        };
        const obs$ = this.asmCreateCustomerFacade.createCustomer(this.collectDataFromRegisterForm());
        obs$.subscribe({
            next: (result) => this.onRegisterUserSuccess(result),
            error: (error) => this.onRegisterUserFail(error),
        });
        obs$.subscribe({
            complete: () => this.isLoading$.next(false),
        });
    }
    collectDataFromRegisterForm() {
        return {
            firstName: this.createdCustomer.firstName,
            lastName: this.createdCustomer.lastName,
            emailAddress: this.createdCustomer.email,
        };
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    closeDialogInfoAlert() {
        this.showDialogInfoAlert = false;
    }
    closeDialogBackendErroAlert(index) {
        this.showDialogBackendErrorAlerts[index] = false;
    }
    onRegisterUserSuccess(user) {
        this.launchDialogService.closeDialog(user);
    }
    onRegisterUserFail(error) {
        this.isLoading$.next(false);
        this.backendErrorMessages = [];
        this.showDialogBackendErrorAlerts = [];
        const unknownError = 'httpHandlers.unknownError';
        const errorDetails = error.details ?? [];
        if (errorDetails.length === 0) {
            this.addErrorMessage(unknownError);
        }
        errorDetails.forEach((errorDetail) => {
            switch (errorDetail.type || '') {
                case 'ValidationError':
                    this.addErrorMessage(`asm.createCustomerForm.validationErrors.${errorDetail.subject}`);
                    break;
                case 'AssistedServiceDuplicatedUidError':
                    this.addErrorMessage('asm.createCustomerForm.badRequestDuplicatedEmail', {
                        emailAddress: this.createdCustomer.email,
                    });
                    break;
                default:
                    this.addErrorMessage(unknownError);
            }
        });
    }
    addErrorMessage(key, options) {
        this.translationService
            .translate(key, options)
            .pipe(first())
            .subscribe((text) => {
            this.backendErrorMessages.push(text);
            this.showDialogBackendErrorAlerts.push(true);
        });
    }
}
AsmCreateCustomerFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFormComponent, deps: [{ token: i1.LaunchDialogService }, { token: i1$2.FormBuilder }, { token: i2$1.AsmCreateCustomerFacade }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
AsmCreateCustomerFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCreateCustomerFormComponent, selector: "cx-asm-create-customer-form", ngImport: i0, template: "<div\n  class=\"cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <div class=\"cx-modal-content\">\n    <ng-container>\n      <form (ngSubmit)=\"submitForm()\" [formGroup]=\"registerForm\">\n        <!-- Modal Header -->\n        <div class=\"cx-dialog-header modal-header\">\n          <h2 class=\"title modal-title\">\n            {{ 'asm.createCustomerForm.title' | cxTranslate }}\n          </h2>\n        </div>\n        <!-- Modal Body -->\n        <div class=\"cx-dialog-body modal-body\">\n          <div class=\"message-container\">\n            <cx-message\n              *ngIf=\"showDialogInfoAlert\"\n              [text]=\"'asm.createCustomerForm.createAccountAlert' | cxTranslate\"\n              [type]=\"globalMessageType.MSG_TYPE_INFO\"\n              (closeMessage)=\"closeDialogInfoAlert()\"\n            >\n            </cx-message>\n            <ng-container\n              *ngFor=\"let errorMessage of backendErrorMessages; let i = index\"\n            >\n              <cx-message\n                *ngIf=\"showDialogBackendErrorAlerts[i]\"\n                [text]=\"errorMessage\"\n                [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n                (closeMessage)=\"closeDialogBackendErroAlert(i)\"\n              >\n              </cx-message>\n            </ng-container>\n          </div>\n\n          <div *ngIf=\"!(isLoading$ | async); else loading\">\n            <div class=\"form-group\">\n              <label>\n                <span class=\"label-content\">{{\n                  'asm.createCustomerForm.firstName.label' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  class=\"form-control\"\n                  placeholder=\"{{\n                    'asm.createCustomerForm.firstName.placeholder' | cxTranslate\n                  }}\"\n                  formControlName=\"firstName\"\n                  name=\"text\"\n                />\n                <cx-form-errors\n                  [control]=\"registerForm.get('firstName')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n\n            <div class=\"form-group\">\n              <label>\n                <span class=\"label-content\">{{\n                  'asm.createCustomerForm.lastName.label' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  class=\"form-control\"\n                  placeholder=\"{{\n                    'asm.createCustomerForm.lastName.placeholder' | cxTranslate\n                  }}\"\n                  name=\"text\"\n                  formControlName=\"lastName\"\n                />\n                <cx-form-errors\n                  [control]=\"registerForm.get('lastName')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n\n            <div class=\"form-group\">\n              <label>\n                <span class=\"label-content\">{{\n                  'asm.createCustomerForm.emailAddress.label' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  class=\"form-control\"\n                  placeholder=\"{{\n                    'asm.createCustomerForm.emailAddress.placeholder'\n                      | cxTranslate\n                  }}\"\n                  name=\"email\"\n                  formControlName=\"email\"\n                />\n                <cx-form-errors\n                  [control]=\"registerForm.get('email')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n          </div>\n        </div>\n        <!-- Modal Footer -->\n        <div class=\"modal-footer\">\n          <button\n            type=\"submit\"\n            class=\"\n              btn\n              cx-asm-create-customer-btn cx-asm-create-customer-btn-create\n            \"\n          >\n            {{ 'asm.createCustomerForm.createAccount' | cxTranslate }}\n          </button>\n          <button\n            type=\"button\"\n            class=\"\n              btn\n              cx-asm-create-customer-btn cx-asm-create-customer-btn-cancel\n            \"\n            (click)=\"closeModal('Cancel click')\"\n          >\n            {{ 'asm.createCustomerForm.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </form>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i1.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-create-customer-form', template: "<div\n  class=\"cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <div class=\"cx-modal-content\">\n    <ng-container>\n      <form (ngSubmit)=\"submitForm()\" [formGroup]=\"registerForm\">\n        <!-- Modal Header -->\n        <div class=\"cx-dialog-header modal-header\">\n          <h2 class=\"title modal-title\">\n            {{ 'asm.createCustomerForm.title' | cxTranslate }}\n          </h2>\n        </div>\n        <!-- Modal Body -->\n        <div class=\"cx-dialog-body modal-body\">\n          <div class=\"message-container\">\n            <cx-message\n              *ngIf=\"showDialogInfoAlert\"\n              [text]=\"'asm.createCustomerForm.createAccountAlert' | cxTranslate\"\n              [type]=\"globalMessageType.MSG_TYPE_INFO\"\n              (closeMessage)=\"closeDialogInfoAlert()\"\n            >\n            </cx-message>\n            <ng-container\n              *ngFor=\"let errorMessage of backendErrorMessages; let i = index\"\n            >\n              <cx-message\n                *ngIf=\"showDialogBackendErrorAlerts[i]\"\n                [text]=\"errorMessage\"\n                [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n                (closeMessage)=\"closeDialogBackendErroAlert(i)\"\n              >\n              </cx-message>\n            </ng-container>\n          </div>\n\n          <div *ngIf=\"!(isLoading$ | async); else loading\">\n            <div class=\"form-group\">\n              <label>\n                <span class=\"label-content\">{{\n                  'asm.createCustomerForm.firstName.label' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  class=\"form-control\"\n                  placeholder=\"{{\n                    'asm.createCustomerForm.firstName.placeholder' | cxTranslate\n                  }}\"\n                  formControlName=\"firstName\"\n                  name=\"text\"\n                />\n                <cx-form-errors\n                  [control]=\"registerForm.get('firstName')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n\n            <div class=\"form-group\">\n              <label>\n                <span class=\"label-content\">{{\n                  'asm.createCustomerForm.lastName.label' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  class=\"form-control\"\n                  placeholder=\"{{\n                    'asm.createCustomerForm.lastName.placeholder' | cxTranslate\n                  }}\"\n                  name=\"text\"\n                  formControlName=\"lastName\"\n                />\n                <cx-form-errors\n                  [control]=\"registerForm.get('lastName')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n\n            <div class=\"form-group\">\n              <label>\n                <span class=\"label-content\">{{\n                  'asm.createCustomerForm.emailAddress.label' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  class=\"form-control\"\n                  placeholder=\"{{\n                    'asm.createCustomerForm.emailAddress.placeholder'\n                      | cxTranslate\n                  }}\"\n                  name=\"email\"\n                  formControlName=\"email\"\n                />\n                <cx-form-errors\n                  [control]=\"registerForm.get('email')\"\n                ></cx-form-errors>\n              </label>\n            </div>\n          </div>\n        </div>\n        <!-- Modal Footer -->\n        <div class=\"modal-footer\">\n          <button\n            type=\"submit\"\n            class=\"\n              btn\n              cx-asm-create-customer-btn cx-asm-create-customer-btn-create\n            \"\n          >\n            {{ 'asm.createCustomerForm.createAccount' | cxTranslate }}\n          </button>\n          <button\n            type=\"button\"\n            class=\"\n              btn\n              cx-asm-create-customer-btn cx-asm-create-customer-btn-cancel\n            \"\n            (click)=\"closeModal('Cancel click')\"\n          >\n            {{ 'asm.createCustomerForm.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </form>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\"><cx-spinner></cx-spinner></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i1$2.FormBuilder }, { type: i2$1.AsmCreateCustomerFacade }, { type: i1$1.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmCreateCustomerFormLayoutConfig = {
    launch: {
        ASM_CREATE_CUSTOMER_FORM: {
            inlineRoot: true,
            component: AsmCreateCustomerFormComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CSAgentLoginFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.csAgentTokenLoading = false;
        this.submitEvent = new EventEmitter();
    }
    ngOnInit() {
        this.csAgentLoginForm = this.fb.group({
            userId: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
    onSubmit() {
        if (this.csAgentLoginForm.valid) {
            this.submitEvent.emit({
                userId: this.csAgentLoginForm.get('userId')?.value,
                password: this.csAgentLoginForm.get('password')?.value,
            });
        }
        else {
            this.csAgentLoginForm.markAllAsTouched();
        }
    }
}
CSAgentLoginFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CSAgentLoginFormComponent, deps: [{ token: i1$2.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
CSAgentLoginFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CSAgentLoginFormComponent, selector: "cx-csagent-login-form", inputs: { csAgentTokenLoading: "csAgentTokenLoading" }, outputs: { submitEvent: "submitEvent" }, ngImport: i0, template: "<form\n  (ngSubmit)=\"onSubmit()\"\n  [formGroup]=\"csAgentLoginForm\"\n  *ngIf=\"!csAgentTokenLoading\"\n>\n  <label>\n    <input\n      required=\"true\"\n      type=\"text\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'asm.loginForm.userId.label' | cxTranslate }}\"\n      [attr.aria-label]=\"'asm.loginForm.userId.label' | cxTranslate\"\n    />\n    <cx-form-errors [control]=\"csAgentLoginForm.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <input\n      required=\"true\"\n      type=\"password\"\n      placeholder=\"{{ 'asm.loginForm.password.label' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'asm.loginForm.password.label' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors\n      [control]=\"csAgentLoginForm.get('password')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.loginForm.submit' | cxTranslate }}\n  </button>\n</form>\n\n<cx-dot-spinner\n  *ngIf=\"csAgentTokenLoading\"\n  aria-hidden=\"false\"\n  [attr.aria-label]=\"'common.loading' | cxTranslate\"\n></cx-dot-spinner>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i1.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "component", type: DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CSAgentLoginFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-csagent-login-form', template: "<form\n  (ngSubmit)=\"onSubmit()\"\n  [formGroup]=\"csAgentLoginForm\"\n  *ngIf=\"!csAgentTokenLoading\"\n>\n  <label>\n    <input\n      required=\"true\"\n      type=\"text\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'asm.loginForm.userId.label' | cxTranslate }}\"\n      [attr.aria-label]=\"'asm.loginForm.userId.label' | cxTranslate\"\n    />\n    <cx-form-errors [control]=\"csAgentLoginForm.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <input\n      required=\"true\"\n      type=\"password\"\n      placeholder=\"{{ 'asm.loginForm.password.label' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'asm.loginForm.password.label' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors\n      [control]=\"csAgentLoginForm.get('password')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.loginForm.submit' | cxTranslate }}\n  </button>\n</form>\n\n<cx-dot-spinner\n  *ngIf=\"csAgentTokenLoading\"\n  aria-hidden=\"false\"\n  [attr.aria-label]=\"'common.loading' | cxTranslate\"\n></cx-dot-spinner>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.UntypedFormBuilder }]; }, propDecorators: { csAgentTokenLoading: [{
                type: Input
            }], submitEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerSelectionComponent {
    constructor(fb, asmService, config, directionService, launchDialogService) {
        this.fb = fb;
        this.asmService = asmService;
        this.config = config;
        this.directionService = directionService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.submitEvent = new EventEmitter();
        this.activeFocusedButtonIndex = -1;
    }
    ngOnInit() {
        this.customerSelectionForm = this.fb.group({
            searchTerm: ['', Validators.required],
        });
        this.asmService.customerSearchReset();
        this.searchResultsLoading$ =
            this.asmService.getCustomerSearchResultsLoading();
        this.searchResults = this.asmService.getCustomerSearchResults();
        this.subscription.add(this.customerSelectionForm.controls.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((searchTermValue) => {
            this.handleSearchTerm(searchTermValue);
        }));
    }
    handleSearchTerm(searchTermValue) {
        if (!!this.selectedCustomer &&
            searchTermValue !== this.selectedCustomer.name) {
            this.selectedCustomer = undefined;
        }
        if (Boolean(this.selectedCustomer)) {
            return;
        }
        this.asmService.customerSearchReset();
        this.activeFocusedButtonIndex = -1;
        if (searchTermValue.trim().length >= 3) {
            this.asmService.customerSearch({
                query: searchTermValue,
                pageSize: this.config.asm?.customerSearch?.maxResults,
            });
        }
    }
    selectCustomerFromList(event, customer) {
        this.selectedCustomer = customer;
        this.customerSelectionForm.controls.searchTerm.setValue(this.selectedCustomer.name);
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    onSubmit() {
        if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
            this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
        }
        else {
            this.customerSelectionForm.markAllAsTouched();
        }
    }
    onDocumentClick(event) {
        if (Boolean(this.resultList)) {
            if (this.resultList.nativeElement.contains(event.target) ||
                this.searchTerm.nativeElement.contains(event.target)) {
                return;
            }
            else {
                this.asmService.customerSearchReset();
            }
        }
    }
    closeResults(event) {
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.asmService.customerSearchReset();
    }
    /**
     * set focus to the first searched item
     * @param event keyboard event
     */
    focusFirstItem(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = 0;
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set mouse cursor to the end of search text
     * @param event keyboard event
     */
    setSelectionEnd(event) {
        event.preventDefault();
        if (this.searchTerm.nativeElement.value?.length) {
            const selectionStart = this.searchTerm.nativeElement.value.length;
            this.searchTerm.nativeElement.selectionStart = selectionStart;
            this.searchTerm.nativeElement.selectionEnd = selectionStart;
        }
    }
    /**
     * set focus on previous searh result item.  If no previous item then go to end of item.
     * @param event keyboard event
     */
    focusPreviousChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex--;
        if (this.activeFocusedButtonIndex < 0) {
            this.activeFocusedButtonIndex = this.searchResultItems.length - 1;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus on next searh result item.  if no next item then go to the first item
     * @param event keyboard event
     */
    focusNextChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex++;
        if (this.activeFocusedButtonIndex > this.searchResultItems.length - 1) {
            this.activeFocusedButtonIndex = 0;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus to input search text
     * @param event keyboard event
     */
    focusInputText(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = -1;
        this.searchTerm.nativeElement.focus();
        if (this.searchTerm.nativeElement.value?.length) {
            let selectionPos = this.searchTerm.nativeElement.selectionEnd;
            const searchTermLength = this.searchTerm.nativeElement.value.length;
            if (this.isBackNavigation(event)) {
                selectionPos = selectionPos <= 0 ? 0 : selectionPos - 1;
            }
            else if (this.isForwardsNavigation(event)) {
                selectionPos =
                    selectionPos >= searchTermLength
                        ? searchTermLength
                        : selectionPos + 1;
            }
            else if (event.code === 'Home') {
                selectionPos = 0;
            }
            else if (event.code === 'End') {
                selectionPos = searchTermLength;
            }
            this.searchTerm.nativeElement.selectionStart = selectionPos;
            this.searchTerm.nativeElement.selectionEnd = selectionPos;
        }
    }
    /**
     * set focus to selected item
     * @param {number} selectedIndex - current selected item index
     */
    updateItemIndex(selectedIndex) {
        this.searchResultItems.toArray()?.[selectedIndex]?.nativeElement.focus();
    }
    createCustomer() {
        this.asmService.customerSearchReset();
        this.launchDialogService?.openDialogAndSubscribe("ASM_CREATE_CUSTOMER_FORM" /* LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM */, this.createCustomerLink);
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
}
CustomerSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerSelectionComponent, deps: [{ token: i1$2.UntypedFormBuilder }, { token: i2$3.AsmService }, { token: i2$1.AsmConfig }, { token: i1.DirectionService }, { token: i1.LaunchDialogService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CustomerSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: { submitEvent: "submitEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "resultList", first: true, predicate: ["resultList"], descendants: true }, { propertyName: "searchTerm", first: true, predicate: ["searchTerm"], descendants: true }, { propertyName: "createCustomerLink", first: true, predicate: ["createCustomerLink"], descendants: true }, { propertyName: "searchResultItems", predicate: ["searchResultItem"], descendants: true }], ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n\n  <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n  <ng-container *cxFeatureLevel=\"'!6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"closeResults($event)\"\n      (keydown.enter)=\"closeResults($event)\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n    </button>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"createCustomer()\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      <span>{{ 'asm.customerSearch.noMatchResult' | cxTranslate }}</span>\n      <span #createCustomerLink class=\"linkStyleLabel\">{{\n        'asm.customerSearch.createCustomer' | cxTranslate\n      }}</span>\n    </button>\n  </ng-container>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n", dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerSelectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-selection', host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n\n  <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n  <ng-container *cxFeatureLevel=\"'!6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"closeResults($event)\"\n      (keydown.enter)=\"closeResults($event)\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n    </button>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.1'\">\n    <button\n      #searchResultItem\n      (click)=\"createCustomer()\"\n      (keydown.escape)=\"closeResults($event)\"\n      (keydown.arrowright)=\"focusInputText($event)\"\n      (keydown.arrowleft)=\"focusInputText($event)\"\n      (keydown.home)=\"focusInputText($event)\"\n      (keydown.end)=\"focusInputText($event)\"\n      [class.active]=\"activeFocusedButtonIndex === 0\"\n      [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n      *ngIf=\"\n        !(searchResultsLoading$ | async) &&\n        searchTerm.value.length >= 3 &&\n        !!results.entries &&\n        results.entries.length <= 0\n      \"\n    >\n      <span>{{ 'asm.customerSearch.noMatchResult' | cxTranslate }}</span>\n      <span #createCustomerLink class=\"linkStyleLabel\">{{\n        'asm.customerSearch.createCustomer' | cxTranslate\n      }}</span>\n    </button>\n  </ng-container>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.UntypedFormBuilder }, { type: i2$3.AsmService }, { type: i2$1.AsmConfig }, { type: i1.DirectionService }, { type: i1.LaunchDialogService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], resultList: [{
                type: ViewChild,
                args: ['resultList']
            }], searchTerm: [{
                type: ViewChild,
                args: ['searchTerm']
            }], createCustomerLink: [{
                type: ViewChild,
                args: ['createCustomerLink']
            }], searchResultItems: [{
                type: ViewChildren,
                args: ['searchResultItem']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FormatTimerPipe {
    transform(totalSeconds) {
        if (totalSeconds < 0) {
            totalSeconds = 0;
        }
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let zeroPaddedMinutes;
        if (minutes < 10) {
            zeroPaddedMinutes = ('00' + minutes).slice(-2);
        }
        else {
            zeroPaddedMinutes = minutes + '';
        }
        const zeroPaddedSeconds = ('00' + seconds).slice(-2);
        return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
    }
}
FormatTimerPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormatTimerPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormatTimerPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FormatTimerPipe, name: "formatTimer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormatTimerPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatTimer',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmSessionTimerComponent {
    constructor(config, asmComponentService, routingService, changeDetectorRef, userIdService) {
        this.config = config;
        this.asmComponentService = asmComponentService;
        this.routingService = routingService;
        this.changeDetectorRef = changeDetectorRef;
        this.userIdService = userIdService;
        this.subscriptions = new Subscription();
        this.maxStartDelayInSeconds = 60000;
    }
    ngOnInit() {
        this.initTimer();
        this.interval = setInterval(() => {
            const currentSeconds = new Date().getTime() / 1000;
            this.timeLeft = Math.floor(this.expiredTime - currentSeconds);
            if (this.timeLeft <= 0) {
                clearInterval(this.interval);
                this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
            }
            this.changeDetectorRef.markForCheck();
        }, 1000);
        this.resetOnNavigate();
        this.resetOnCustomerSessionChange();
    }
    resetOnNavigate() {
        this.subscriptions.add(this.routingService.isNavigating().subscribe((isNavigating) => {
            if (isNavigating) {
                this.resetTimer();
            }
        }));
    }
    resetOnCustomerSessionChange() {
        this.subscriptions.add(this.userIdService
            .getUserId()
            .pipe(distinctUntilChanged())
            .subscribe(() => this.resetTimer()));
    }
    initTimer() {
        const timeoutPropertyInSeconds = this.getTimerStartDelayInSeconds();
        const currentSeconds = new Date().getTime() / 1000;
        this.timeLeft = timeoutPropertyInSeconds;
        this.expiredTime = currentSeconds + this.timeLeft;
    }
    resetTimer() {
        if (this.timeLeft > 0) {
            this.initTimer();
        }
    }
    getTimerStartDelayInSeconds() {
        if (this.config.asm?.agentSessionTimer?.startingDelayInSeconds === undefined) {
            return 600;
        }
        if (this.config.asm.agentSessionTimer.startingDelayInSeconds >
            this.maxStartDelayInSeconds) {
            return this.maxStartDelayInSeconds;
        }
        else {
            return this.config.asm.agentSessionTimer.startingDelayInSeconds;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
AsmSessionTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmSessionTimerComponent, deps: [{ token: i2$1.AsmConfig }, { token: AsmComponentService }, { token: i1$1.RoutingService }, { token: i0.ChangeDetectorRef }, { token: i1$1.UserIdService }], target: i0.ɵɵFactoryTarget.Component });
AsmSessionTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer", ngImport: i0, template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n", dependencies: [{ kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: FormatTimerPipe, name: "formatTimer" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmSessionTimerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-session-timer', template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.AsmConfig }, { type: AsmComponentService }, { type: i1$1.RoutingService }, { type: i0.ChangeDetectorRef }, { type: i1$1.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerEmulationComponent {
    constructor(asmComponentService, userAccountFacade, 
    // TODO(CXSPA-3090): Remove optional flag in 7.0
    launchDialogService, featureModules) {
        this.asmComponentService = asmComponentService;
        this.userAccountFacade = userAccountFacade;
        this.launchDialogService = launchDialogService;
        this.featureModules = featureModules;
        this.isAsmCustomer360Configured = false;
        this.isAsmCustomer360Loaded$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.isAsmCustomer360Configured =
            this.featureModules?.isConfigured('asmCustomer360');
        if (this.isAsmCustomer360Configured) {
            // trigger lazy loading of the Customer 360 feature:
            this.featureModules?.resolveFeature('asmCustomer360').subscribe(() => {
                this.isAsmCustomer360Loaded$.next(true);
            });
        }
        this.subscription.add(this.userAccountFacade.get().subscribe((user) => {
            if (user) {
                this.customer = user;
            }
        }));
        this.isCustomerEmulationSessionInProgress$ =
            this.asmComponentService.isCustomerEmulationSessionInProgress();
    }
    logoutCustomer() {
        this.asmComponentService.logoutCustomer();
    }
    openAsmCustomer360() {
        this.subscription.add(this.isAsmCustomer360Loaded$
            .pipe(filter((isReady) => Boolean(isReady)))
            .subscribe(() => {
            const data = { customer: this.customer };
            this.launchDialogService?.openDialogAndSubscribe("ASM_CUSTOMER_360" /* LAUNCH_CALLER.ASM_CUSTOMER_360 */, this.asmCustomer360LauncherElement, data);
            this.subscription.add(this.launchDialogService?.dialogClose
                .pipe(filter((result) => Boolean(result)))
                .subscribe((event) => {
                this.asmComponentService.handleAsmDialogAction(event);
            }));
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CustomerEmulationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEmulationComponent, deps: [{ token: AsmComponentService }, { token: i2$4.UserAccountFacade }, { token: i1.LaunchDialogService, optional: true }, { token: i1$1.FeatureModulesService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CustomerEmulationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerEmulationComponent, selector: "cx-customer-emulation", viewQueries: [{ propertyName: "asmCustomer360LauncherElement", first: true, predicate: ["asmCustomer360Launcher"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <ng-container *cxFeatureLevel=\"'6.6'\">\n    <button\n      *ngIf=\"isAsmCustomer360Configured && customer\"\n      #asmCustomer360Launcher\n      class=\"cx-360-button\"\n      (click)=\"openAsmCustomer360()\"\n    >\n      {{ 'asm.asmCustomer360Button' | cxTranslate }}\n    </button>\n  </ng-container>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: AsmBindCartComponent, selector: "cx-asm-bind-cart" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerEmulationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-emulation', template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <ng-container *cxFeatureLevel=\"'6.6'\">\n    <button\n      *ngIf=\"isAsmCustomer360Configured && customer\"\n      #asmCustomer360Launcher\n      class=\"cx-360-button\"\n      (click)=\"openAsmCustomer360()\"\n    >\n      {{ 'asm.asmCustomer360Button' | cxTranslate }}\n    </button>\n  </ng-container>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: AsmComponentService }, { type: i2$4.UserAccountFacade }, { type: i1.LaunchDialogService, decorators: [{
                    type: Optional
                }] }, { type: i1$1.FeatureModulesService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { asmCustomer360LauncherElement: [{
                type: ViewChild,
                args: ['asmCustomer360Launcher']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmToggleUiComponent {
    constructor(asmService) {
        this.asmService = asmService;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.asmService.getAsmUiState().subscribe((uiState) => {
            this.isCollapsed =
                uiState.collapsed === undefined ? false : uiState.collapsed;
        }));
    }
    toggleUi() {
        this.asmService.updateAsmUiState({ collapsed: !this.isCollapsed });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmToggleUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmToggleUiComponent, deps: [{ token: i2$3.AsmService }], target: i0.ɵɵFactoryTarget.Component });
AsmToggleUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui", ngImport: i0, template: "<a class=\"toggleUi\" (click)=\"toggleUi()\" tabindex=\"0\" role=\"button\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n", dependencies: [{ kind: "directive", type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmToggleUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-toggle-ui', template: "<a class=\"toggleUi\" (click)=\"toggleUi()\" tabindex=\"0\" role=\"button\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i2$3.AsmService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_TYPE_KEY = {
    active: 'asm.activeCartAlertInfo',
    inactive: 'asm.saveInactiveCartAlertInfo',
};
class AsmMainUiComponent {
    constructor(authService, csAgentAuthService, asmComponentService, globalMessageService, routingService, asmService, userAccountFacade, launchDialogService, featureConfig) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.asmComponentService = asmComponentService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.asmService = asmService;
        this.userAccountFacade = userAccountFacade;
        this.launchDialogService = launchDialogService;
        this.featureConfig = featureConfig;
        this.iconTypes = ICON_TYPE;
        this.showDeeplinkCartInfoAlert$ = this.asmComponentService.shouldShowDeeplinkCartInfoAlert();
        this.deeplinkCartAlertKey = '';
        this.showCreateCustomerSuccessfullyAlert = false;
        this.globalMessageType = GlobalMessageType;
        this.disabled = false;
        this.startingCustomerSession = false;
        this.showCustomerEmulationInfoAlert = true;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.customerSupportAgentLoggedIn$ = this.csAgentAuthService
            .isCustomerSupportAgentLoggedIn()
            .pipe(distinctUntilChanged(), tap((loggedIn) => {
            if (!loggedIn) {
                this.closeModal();
            }
        }));
        this.csAgentTokenLoading$ =
            this.csAgentAuthService.getCustomerSupportAgentTokenLoading();
        this.customer$ = this.authService.isUserLoggedIn().pipe(switchMap((isLoggedIn) => {
            if (isLoggedIn) {
                this.handleCustomerSessionStartRedirection();
                return this.userAccountFacade.get();
            }
            else {
                return of(undefined);
            }
        }));
        this.isCollapsed$ = this.asmService
            .getAsmUiState()
            .pipe(map((uiState) => uiState.collapsed === undefined ? false : uiState.collapsed));
        this.subscription.add(this.launchDialogService.dialogClose
            .pipe(filter((result) => Boolean(result)))
            .subscribe((result) => {
            if (typeof result !== 'string') {
                if ('selectedUser' in result) {
                    this.startCustomerEmulationSession(result.selectedUser);
                    if (result.actionType === CustomerListColumnActionType.ORDER_HISTORY) {
                        this.routingService.go({ cxRoute: 'orders' });
                    }
                }
                else if ('customerId' in result) {
                    this.startCustomerEmulationSession({
                        customerId: result.customerId,
                    });
                    this.showCreateCustomerSuccessfullyAlert = true;
                    this.routingService.go('/');
                }
                if ('actionType' in result &&
                    result.actionType === CustomerListColumnActionType.ACTIVE_CART) {
                    this.routingService.go({ cxRoute: 'cart' });
                }
            }
        }));
        this.subscribeForDeeplink();
    }
    /**
     * When agent is logged in and deep link has customerID,
     * call logout if has customer emulated(userLoggedin) but not emulated by deep link.
     * call startSessionWithParameters
     */
    subscribeForDeeplink() {
        if (this.featureConfig?.isLevel('6.2')) {
            if (this.asmComponentService.isEmulateInURL()) {
                //Always route to home page to avoid 404
                this.routingService.go('/');
            }
            // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0.
            const parameters = this.asmComponentService.getDeepLinkUrlParams() ?? {
                customerId: this.asmComponentService.getSearchParameter('customerId'),
                orderId: this.asmComponentService.getSearchParameter('orderId'),
                ticketId: this.asmComponentService.getSearchParameter('ticketId'),
                cartId: this.asmComponentService.getSearchParameter('cartId'),
                cartType: this.asmComponentService.getSearchParameter('cartType'),
                emulated: false,
            };
            this.deeplinkCartAlertKey = CART_TYPE_KEY[parameters.cartType || ''];
            this.subscription.add(combineLatest([
                this.customerSupportAgentLoggedIn$,
                this.authService.isUserLoggedIn(),
                this.asmComponentService.isEmulatedByDeepLink(),
            ]).subscribe(([agentLoggedIn, userLoggedin, isEmulatedByDeepLink]) => {
                if (agentLoggedIn && parameters.customerId) {
                    if (!isEmulatedByDeepLink && userLoggedin) {
                        this.confirmSwitchCustomer(parameters.customerId);
                    }
                    else {
                        setTimeout(() => this.startSessionWithParameters({
                            ...parameters,
                            emulated: isEmulatedByDeepLink,
                        }));
                    }
                }
            }));
        }
    }
    confirmSwitchCustomer(switchCustomerId) {
        this.customer$
            .pipe(filter((curCustomer) => !!curCustomer), take(1))
            .subscribe((curCustomer) => {
            if (curCustomer?.customerId !== switchCustomerId) {
                this.userAccountFacade.getById(switchCustomerId).subscribe({
                    next: (switchCustomer) => {
                        this.launchDialogService.openDialogAndSubscribe("ASM_SWITCH_CUSTOMER" /* LAUNCH_CALLER.ASM_SWITCH_CUSTOMER */, this.element, { curCustomer: curCustomer, switchCustomer: switchCustomer });
                    },
                    error: (error) => {
                        this.globalMessageService.add(error.details?.[0].message ?? '', GlobalMessageType.MSG_TYPE_ERROR);
                    },
                });
            }
            else {
                this.asmComponentService.setEmulatedByDeepLink(true);
            }
        });
    }
    /**
     * If url contains customerId and we haven't emulatedFromURL, we'll change the isEmulatedByDeepLink flag and
     * start emulate customer in URL.
     */
    startSessionWithParameters(parameters) {
        if (!parameters.emulated) {
            this.asmComponentService.setEmulatedByDeepLink(true);
            this.startCustomerEmulationSession({
                customerId: parameters.customerId,
            }, parameters);
        }
    }
    handleCustomerSessionStartRedirection() {
        this.asmComponentService
            .isCustomerEmulationSessionInProgress()
            .pipe(take(1))
            .subscribe((isCustomerEmulated) => {
            if (this.startingCustomerSession && isCustomerEmulated) {
                this.startingCustomerSession = false;
                this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
                this.routingService.go('/');
            }
        });
    }
    loginCustomerSupportAgent({ userId, password, }) {
        this.csAgentAuthService.authorizeCustomerSupportAgent(userId, password);
    }
    logout() {
        this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
    }
    startCustomerEmulationSession({ customerId }, parameters) {
        if (customerId) {
            this.csAgentAuthService.startCustomerEmulationSession(customerId);
            this.startingCustomerSession = true;
            this.showCustomerEmulationInfoAlert = true;
            this.showCreateCustomerSuccessfullyAlert = false;
            if (parameters) {
                // TODO(CXSPA-3090): Remove feature flag in 7.0
                if (this.featureConfig?.isLevel('6.3')) {
                    this.asmComponentService.handleDeepLinkNavigation({
                        customerId,
                        ...parameters,
                    });
                }
                else {
                    // TODOi(CXSPA-3090): Remove this implementation in 7.0
                    this.handleDeepLinkParamsAfterStartSession(parameters);
                }
            }
        }
        else {
            this.globalMessageService.add({ key: 'asm.error.noCustomerId' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    handleDeepLinkParamsAfterStartSession(parameters) {
        if ((parameters.cartType === 'active' ||
            parameters.cartType === 'inactive') &&
            parameters.cartId) {
            return;
        }
        if (parameters.cartType === 'saved' && parameters.cartId) {
            // Navigate to saved cart
            this.routingService.go('my-account/saved-cart/' + parameters.cartId);
        }
        else if (parameters.orderId) {
            // Navigate to order details
            this.routingService.go({
                cxRoute: 'orderDetails',
                params: { code: parameters.orderId },
            });
        }
        else if (parameters.ticketId) {
            // Navigate to support ticket details
            this.routingService.go({
                cxRoute: 'supportTicketDetails',
                params: { ticketCode: parameters.ticketId },
            });
        }
    }
    hideUi() {
        this.disabled = true;
        this.asmComponentService.unload();
    }
    showCustomList() {
        this.launchDialogService.openDialogAndSubscribe("ASM_CUSTOMER_LIST" /* LAUNCH_CALLER.ASM_CUSTOMER_LIST */, this.element);
    }
    closeModal() {
        this.launchDialogService.closeDialog('logout');
    }
    createCustomer() {
        this.launchDialogService?.openDialogAndSubscribe("ASM_CREATE_CUSTOMER_FORM" /* LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM */, this.addNewCustomerLink);
    }
    closeDialogConfirmationAlert() {
        this.showCreateCustomerSuccessfullyAlert = false;
    }
    closeDeeplinkCartInfoAlert() {
        this.asmComponentService.setShowDeeplinkCartInfoAlert(false);
    }
    closeCustomerEmulationInfoAlert() {
        this.showCustomerEmulationInfoAlert = false;
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
AsmMainUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmMainUiComponent, deps: [{ token: i1$1.AuthService }, { token: i2$1.CsAgentAuthService }, { token: AsmComponentService }, { token: i1$1.GlobalMessageService }, { token: i1$1.RoutingService }, { token: i2$3.AsmService }, { token: i2$4.UserAccountFacade }, { token: i1.LaunchDialogService }, { token: i1$1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AsmMainUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmMainUiComponent, selector: "cx-asm-main-ui", host: { properties: { "class.hidden": "this.disabled" } }, viewQueries: [{ propertyName: "element", first: true, predicate: ["customerListLink"], descendants: true }, { propertyName: "addNewCustomerLink", first: true, predicate: ["addNewCustomerLink"], descendants: true }], ngImport: i0, template: "<div class=\"asm-bar\">\n  <div class=\"asm-bar-branding\">\n    <img\n      class=\"logo\"\n      src=\"data:image/png;base64,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\"\n      width=\"48\"\n      height=\"24\"\n      alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n    />\n\n    <div class=\"asm-title\">\n      {{ 'asm.mainTitle' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"asm-bar-actions\">\n    <div\n      class=\"cx-asm-customer-list\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    >\n      <a\n        #customerListLink\n        tabindex=\"0\"\n        role=\"button\"\n        class=\"cx-asm-customer-list-link\"\n        (click)=\"showCustomList()\"\n      >\n        <cx-icon [type]=\"iconTypes.USER_FRIENDS\"></cx-icon>\n        <span>{{ 'asm.customers' | cxTranslate }}</span></a\n      >\n    </div>\n\n    <cx-asm-toggle-ui></cx-asm-toggle-ui>\n\n    <cx-asm-session-timer\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    ></cx-asm-session-timer>\n\n    <button\n      class=\"close\"\n      title=\"{{ 'asm.hideUi' | cxTranslate }}\"\n      *ngIf=\"\n        !(customerSupportAgentLoggedIn$ | async) &&\n        !(csAgentTokenLoading$ | async)\n      \"\n      (click)=\"hideUi()\"\n    ></button>\n\n    <button\n      class=\"logout\"\n      title=\"{{ 'asm.logout' | cxTranslate }}\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n      (click)=\"logout()\"\n    ></button>\n  </div>\n</div>\n\n<ng-container *ngIf=\"!(isCollapsed$ | async) as notCollapsed\">\n  <ng-container\n    *ngIf=\"customerSupportAgentLoggedIn$ | async; else showLoginForm\"\n  >\n    <ng-container *ngIf=\"customer$ | async; else showCustomerSelection\">\n      <cx-customer-emulation *ngIf=\"notCollapsed\"></cx-customer-emulation>\n      <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <cx-message\n          *ngIf=\"notCollapsed && showCreateCustomerSuccessfullyAlert\"\n          [text]=\"'asm.createCustomerSuccessfullyAlert' | cxTranslate\"\n          [type]=\"globalMessageType.MSG_TYPE_CONFIRMATION\"\n          (closeMessage)=\"closeDialogConfirmationAlert()\"\n        >\n        </cx-message>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.2'\">\n        <cx-message\n          *ngIf=\"showDeeplinkCartInfoAlert$ | async\"\n          [text]=\"deeplinkCartAlertKey | cxTranslate\"\n          [type]=\"globalMessageType.MSG_TYPE_INFO\"\n          (closeMessage)=\"closeDeeplinkCartInfoAlert()\"\n        >\n        </cx-message>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.3'\">\n        <cx-message\n          *ngIf=\"notCollapsed && showCustomerEmulationInfoAlert\"\n          [text]=\"'asm.startCustomerEmulationAlertInfo' | cxTranslate\"\n          [type]=\"globalMessageType.MSG_TYPE_INFO\"\n          (closeMessage)=\"closeCustomerEmulationInfoAlert()\"\n        >\n        </cx-message>\n      </ng-container>\n    </ng-container>\n    <ng-template #showCustomerSelection>\n      <cx-customer-selection\n        *ngIf=\"notCollapsed\"\n        (submitEvent)=\"startCustomerEmulationSession($event)\"\n      ></cx-customer-selection>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #showLoginForm>\n    <cx-csagent-login-form\n      *ngIf=\"notCollapsed\"\n      (submitEvent)=\"loginCustomerSupportAgent($event)\"\n      [csAgentTokenLoading]=\"csAgentTokenLoading$ | async\"\n    ></cx-csagent-login-form>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "component", type: CSAgentLoginFormComponent, selector: "cx-csagent-login-form", inputs: ["csAgentTokenLoading"], outputs: ["submitEvent"] }, { kind: "component", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: ["submitEvent"] }, { kind: "component", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer" }, { kind: "component", type: CustomerEmulationComponent, selector: "cx-customer-emulation" }, { kind: "component", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui" }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmMainUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-main-ui', template: "<div class=\"asm-bar\">\n  <div class=\"asm-bar-branding\">\n    <img\n      class=\"logo\"\n      src=\"data:image/png;base64,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\"\n      width=\"48\"\n      height=\"24\"\n      alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n    />\n\n    <div class=\"asm-title\">\n      {{ 'asm.mainTitle' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"asm-bar-actions\">\n    <div\n      class=\"cx-asm-customer-list\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    >\n      <a\n        #customerListLink\n        tabindex=\"0\"\n        role=\"button\"\n        class=\"cx-asm-customer-list-link\"\n        (click)=\"showCustomList()\"\n      >\n        <cx-icon [type]=\"iconTypes.USER_FRIENDS\"></cx-icon>\n        <span>{{ 'asm.customers' | cxTranslate }}</span></a\n      >\n    </div>\n\n    <cx-asm-toggle-ui></cx-asm-toggle-ui>\n\n    <cx-asm-session-timer\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    ></cx-asm-session-timer>\n\n    <button\n      class=\"close\"\n      title=\"{{ 'asm.hideUi' | cxTranslate }}\"\n      *ngIf=\"\n        !(customerSupportAgentLoggedIn$ | async) &&\n        !(csAgentTokenLoading$ | async)\n      \"\n      (click)=\"hideUi()\"\n    ></button>\n\n    <button\n      class=\"logout\"\n      title=\"{{ 'asm.logout' | cxTranslate }}\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n      (click)=\"logout()\"\n    ></button>\n  </div>\n</div>\n\n<ng-container *ngIf=\"!(isCollapsed$ | async) as notCollapsed\">\n  <ng-container\n    *ngIf=\"customerSupportAgentLoggedIn$ | async; else showLoginForm\"\n  >\n    <ng-container *ngIf=\"customer$ | async; else showCustomerSelection\">\n      <cx-customer-emulation *ngIf=\"notCollapsed\"></cx-customer-emulation>\n      <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <cx-message\n          *ngIf=\"notCollapsed && showCreateCustomerSuccessfullyAlert\"\n          [text]=\"'asm.createCustomerSuccessfullyAlert' | cxTranslate\"\n          [type]=\"globalMessageType.MSG_TYPE_CONFIRMATION\"\n          (closeMessage)=\"closeDialogConfirmationAlert()\"\n        >\n        </cx-message>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.2'\">\n        <cx-message\n          *ngIf=\"showDeeplinkCartInfoAlert$ | async\"\n          [text]=\"deeplinkCartAlertKey | cxTranslate\"\n          [type]=\"globalMessageType.MSG_TYPE_INFO\"\n          (closeMessage)=\"closeDeeplinkCartInfoAlert()\"\n        >\n        </cx-message>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.3'\">\n        <cx-message\n          *ngIf=\"notCollapsed && showCustomerEmulationInfoAlert\"\n          [text]=\"'asm.startCustomerEmulationAlertInfo' | cxTranslate\"\n          [type]=\"globalMessageType.MSG_TYPE_INFO\"\n          (closeMessage)=\"closeCustomerEmulationInfoAlert()\"\n        >\n        </cx-message>\n      </ng-container>\n    </ng-container>\n    <ng-template #showCustomerSelection>\n      <cx-customer-selection\n        *ngIf=\"notCollapsed\"\n        (submitEvent)=\"startCustomerEmulationSession($event)\"\n      ></cx-customer-selection>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #showLoginForm>\n    <cx-csagent-login-form\n      *ngIf=\"notCollapsed\"\n      (submitEvent)=\"loginCustomerSupportAgent($event)\"\n      [csAgentTokenLoading]=\"csAgentTokenLoading$ | async\"\n    ></cx-csagent-login-form>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i2$1.CsAgentAuthService }, { type: AsmComponentService }, { type: i1$1.GlobalMessageService }, { type: i1$1.RoutingService }, { type: i2$3.AsmService }, { type: i2$4.UserAccountFacade }, { type: i1.LaunchDialogService }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['class.hidden']
            }], element: [{
                type: ViewChild,
                args: ['customerListLink']
            }], addNewCustomerLink: [{
                type: ViewChild,
                args: ['addNewCustomerLink']
            }] } });

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
var SWITCH_CUSTOMER_DIALOG_ACTION;
(function (SWITCH_CUSTOMER_DIALOG_ACTION) {
    SWITCH_CUSTOMER_DIALOG_ACTION["CANCEL"] = "CANCEL";
    SWITCH_CUSTOMER_DIALOG_ACTION["SWITCH"] = "SWITCH";
})(SWITCH_CUSTOMER_DIALOG_ACTION || (SWITCH_CUSTOMER_DIALOG_ACTION = {}));
class AsmSwitchCustomerDialogComponent {
    constructor(launchDialogService, asmComponentService) {
        this.launchDialogService = launchDialogService;
        this.asmComponentService = asmComponentService;
        this.SWITCH_CUSTOMER_DIALOG_ACTION = SWITCH_CUSTOMER_DIALOG_ACTION;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
    }
    ngOnInit() {
        this.launchDialogService.data$
            .pipe(take(1))
            .subscribe((data) => {
            this.curCustomerName = data.curCustomer.name || '';
            this.switchCustomerName = data.switchCustomer.name || '';
        });
    }
    closeModal(reason) {
        if (reason === SWITCH_CUSTOMER_DIALOG_ACTION.SWITCH) {
            this.asmComponentService.logoutCustomer();
        }
        this.launchDialogService.closeDialog(reason);
    }
}
AsmSwitchCustomerDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmSwitchCustomerDialogComponent, deps: [{ token: i1.LaunchDialogService }, { token: AsmComponentService }], target: i0.ɵɵFactoryTarget.Component });
AsmSwitchCustomerDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmSwitchCustomerDialogComponent, selector: "cx-asm-switch-customer-dialog", ngImport: i0, template: "<div\n  class=\"cx-asm-switch-customer-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(SWITCH_CUSTOMER_DIALOG_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <div>\n        <span>\n          <cx-icon type=\"WARNING\"></cx-icon>\n        </span>\n        <span id=\"asm-switch-customer-dialog-title\" class=\"title modal-title\">\n          {{ 'asm.switchCustomer.dialog.title' | cxTranslate }}\n        </span>\n      </div>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-dialog-row switch-customer-content\">\n        <div class=\"cx-dialog-item\">\n          {{\n            'asm.switchCustomer.dialog.body'\n              | cxTranslate\n                : {\n                    customerA: curCustomerName,\n                    customerB: switchCustomerName\n                  }\n          }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        (click)=\"closeModal(SWITCH_CUSTOMER_DIALOG_ACTION.SWITCH)\"\n        [attr.aria-label]=\"\n          'asm.switchCustomer.dialog.actions.switch' | cxTranslate\n        \"\n        class=\"btn btn-primary\"\n        type=\"button\"\n      >\n        {{ 'asm.switchCustomer.dialog.actions.switch' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(SWITCH_CUSTOMER_DIALOG_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmSwitchCustomerDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-switch-customer-dialog', template: "<div\n  class=\"cx-asm-switch-customer-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(SWITCH_CUSTOMER_DIALOG_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <div>\n        <span>\n          <cx-icon type=\"WARNING\"></cx-icon>\n        </span>\n        <span id=\"asm-switch-customer-dialog-title\" class=\"title modal-title\">\n          {{ 'asm.switchCustomer.dialog.title' | cxTranslate }}\n        </span>\n      </div>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-dialog-row switch-customer-content\">\n        <div class=\"cx-dialog-item\">\n          {{\n            'asm.switchCustomer.dialog.body'\n              | cxTranslate\n                : {\n                    customerA: curCustomerName,\n                    customerB: switchCustomerName\n                  }\n          }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        (click)=\"closeModal(SWITCH_CUSTOMER_DIALOG_ACTION.SWITCH)\"\n        [attr.aria-label]=\"\n          'asm.switchCustomer.dialog.actions.switch' | cxTranslate\n        \"\n        class=\"btn btn-primary\"\n        type=\"button\"\n      >\n        {{ 'asm.switchCustomer.dialog.actions.switch' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(SWITCH_CUSTOMER_DIALOG_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: AsmComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerListComponent {
    constructor(launchDialogService, breakpointService, asmConfig, translation, asmCustomerListFacade, 
    // TODO:(CXSPA-3090) for next major release remove feature level
    featureConfig, occConfig) {
        this.launchDialogService = launchDialogService;
        this.breakpointService = breakpointService;
        this.asmConfig = asmConfig;
        this.translation = translation;
        this.asmCustomerListFacade = asmCustomerListFacade;
        this.featureConfig = featureConfig;
        this.occConfig = occConfig;
        this.DEFAULT_PAGE_SIZE = 5;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'customer-list-selector',
            focusOnEscape: true,
        };
        this.iconTypes = ICON_TYPE;
        this.BREAKPOINT = BREAKPOINT;
        this.currentPage = 0;
        this.maxPage = 0;
        this.loaded = false;
        this.listsError = false;
        this.listsEmpty = false;
        this.enableAsmB2bCustomerList = false;
        this.customerListColumnActionType = CustomerListColumnActionType;
        this.searchBox = new UntypedFormControl();
        this.teardown = new Subscription();
        this.breakpoint$ = this.getBreakpoint();
    }
    ngOnInit() {
        this.pageSize =
            this.asmConfig.asm?.customerList?.pageSize ?? this.DEFAULT_PAGE_SIZE;
        this.customerListConfig = this.asmConfig?.asm?.customerList;
        this.customerListsPage$ =
            this.asmCustomerListFacade.getCustomerListsState().pipe(tap((state) => (this.listsError = !!state.error)), map((state) => {
                if (state?.data?.userGroups?.length === 0) {
                    this.listsEmpty = true;
                    return undefined;
                }
                else {
                    return state.data;
                }
            }), distinctUntilChanged(), tap((result) => {
                // set the first value of this.customerListsPage$ to be selected
                if (!this.selectedUserGroupId) {
                    this.selectedUserGroupId = result?.userGroups?.[0]?.uid;
                    this.sorts = null;
                    this.fetchCustomers();
                }
            })) ?? NEVER;
        this.customerSearchLoading$ = this.asmCustomerListFacade
            .getCustomerListCustomersSearchResultsLoading()
            .pipe(tap((loading) => (this.loaded = !loading)));
        this.teardown.add(this.customerSearchLoading$.subscribe());
        this.teardown.add(() => this.asmCustomerListFacade.customerListCustomersSearchReset());
        this.customerSearchError$ =
            this.asmCustomerListFacade.getCustomerListCustomersSearchResultsError();
        this.customerSearchPage$ = this.asmCustomerListFacade
            .getCustomerListCustomersSearchResults()
            .pipe(tap((result) => {
            if (result?.sorts) {
                this.sorts = result.sorts;
                this.sortCode = result.pagination?.sort;
            }
            if (result?.entries.length < this.pageSize) {
                this.maxPage = result.pagination?.currentPage ?? 0;
            }
            else {
                this.maxPage = this.currentPage + 1;
            }
        }));
    }
    ngOnDestroy() {
        this.teardown.unsubscribe();
    }
    changePage(page) {
        const options = {
            customerListId: this.selectedUserGroupId,
            pageSize: this.pageSize,
            currentPage: page,
            sort: this.sortCode,
        };
        if (this.searchBox?.value) {
            options.query = this.searchBox.value;
        }
        this.asmCustomerListFacade.customerListCustomersSearch(options);
    }
    fetchCustomers() {
        // TODO: (CXSPA-2722 for remove ) Remove FeatureConfigService for 7.0
        this.enableAsmB2bCustomerList =
            (this.featureConfig?.isLevel('6.1') ?? false) &&
                this.selectedUserGroupId === 'b2bCustomerList';
        if (this.selectedUserGroupId) {
            const options = {
                customerListId: this.selectedUserGroupId,
                pageSize: this.pageSize,
                currentPage: this.currentPage,
            };
            if (this.sortCode) {
                options.sort = this.sortCode;
            }
            if (this.searchBox?.value) {
                options.query = this.searchBox.value;
            }
            this.asmCustomerListFacade.customerListCustomersSearchReset();
            this.asmCustomerListFacade.customerListCustomersSearch(options);
        }
        this.updateCustomerListColumns();
    }
    updateCustomerListColumns() {
        const columns = this.customerListConfig?.columns || [];
        for (const column of columns) {
            if (column.headerLocalizationKey ===
                'asm.customerList.tableHeader.account' ||
                column.headerLocalizationKey === 'hideHeaders') {
                column.headerLocalizationKey = this.enableAsmB2bCustomerList
                    ? 'asm.customerList.tableHeader.account'
                    : 'hideHeaders';
            }
            if (column.headerLocalizationKey === 'asm.customerList.tableHeader.cart') {
                column.headerLocalizationKey = this.featureConfig?.isLevel('6.1')
                    ? column.headerLocalizationKey
                    : 'hideHeaders';
            }
        }
    }
    onChangeCustomerGroup() {
        this.currentPage = 0;
        this.sorts = null;
        this.sortCode = '';
        this.fetchCustomers();
    }
    getGroupName(customerListsPage, id) {
        return (customerListsPage?.userGroups?.find((userGroup) => userGroup.uid === id)
            ?.name ?? '');
    }
    getBadgeText(customerEntry) {
        return ((customerEntry.firstName?.charAt(0) ?? '') +
            (customerEntry.lastName?.charAt(0) ?? ''));
    }
    startColumnAction(customerEntry, action) {
        this.selectedCustomer = customerEntry;
        const closeValue = {
            actionType: action,
            selectedUser: customerEntry,
        };
        this.closeModal(closeValue);
    }
    onKey(event) {
        if (event.key === 'Enter') {
            this.searchCustomers();
        }
    }
    searchCustomers() {
        this.currentPage = 0;
        this.fetchCustomers();
    }
    isRequired(customerEntry, type) {
        if (type === CustomerListColumnActionType.ACTIVE_CART &&
            !customerEntry.lastCartId) {
            return true;
        }
        if (type === CustomerListColumnActionType.ORDER_HISTORY &&
            customerEntry.hasOrder !== true) {
            return true;
        }
        return false;
    }
    changeSortCode(sortCode) {
        this.sortCode = sortCode;
        this.fetchCustomers();
    }
    goToNextPage() {
        if (this.currentPage >= this.maxPage) {
            this.currentPage = this.maxPage;
        }
        else {
            if (this.loaded) {
                this.currentPage++;
                this.fetchCustomers();
            }
        }
    }
    goToPreviousPage() {
        if (this.currentPage <= 0) {
            this.currentPage = 0;
        }
        else {
            if (this.loaded) {
                this.currentPage--;
                this.fetchCustomers();
            }
        }
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('asm.customerList.tableSort.byName'),
            this.translation.translate('asm.customerList.tableSort.byNameAsc'),
            this.translation.translate('asm.customerList.tableSort.byNameDesc'),
            this.translation.translate('asm.customerList.tableSort.byDateAsc'),
            this.translation.translate('asm.customerList.tableSort.byDateDesc'),
            this.translation.translate('asm.customerList.tableSort.byOrderDateAsc'),
            this.translation.translate('asm.customerList.tableSort.byOrderDateDesc'),
            this.translation.translate('asm.customerList.tableSort.byUnit'),
            this.translation.translate('asm.customerList.tableSort.byUnitDesc'),
        ]).pipe(map(([textByName, textByNameAsc, textByNameDesc, textByDateAsc, textByDateDesc, textByOrderDateAsc, textByOrderDateDesc, textByUnit, textByUnitDesc,]) => {
            return {
                byName: textByName,
                byNameAsc: textByNameAsc,
                byNameDesc: textByNameDesc,
                byOrderDateAsc: textByOrderDateAsc,
                byOrderDateDesc: textByOrderDateDesc,
                byDateAsc: textByDateAsc,
                byDateDesc: textByDateDesc,
                byUnit: textByUnit,
                byUnitDesc: textByUnitDesc,
            };
        }));
    }
    createCustomer() {
        this.launchDialogService.closeDialog('Create customer click');
        this.launchDialogService?.openDialogAndSubscribe("ASM_CREATE_CUSTOMER_FORM" /* LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM */, this.addNewCustomerLink);
    }
    getBreakpoint() {
        return this.breakpointService.breakpoint$.pipe(map((breakpoint) => {
            if (breakpoint === BREAKPOINT.lg || breakpoint === BREAKPOINT.xl) {
                breakpoint = BREAKPOINT.md;
            }
            return breakpoint;
        }));
    }
}
CustomerListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerListComponent, deps: [{ token: i1.LaunchDialogService }, { token: i1.BreakpointService }, { token: i2$1.AsmConfig }, { token: i1$1.TranslationService }, { token: i2$1.AsmCustomerListFacade }, { token: i1$1.FeatureConfigService, optional: true }, { token: i1$1.OccConfig, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CustomerListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CustomerListComponent, selector: "cx-customer-list", viewQueries: [{ propertyName: "addNewCustomerLink", first: true, predicate: ["addNewCustomerLink"], descendants: true }], ngImport: i0, template: "<div\n  class=\"cx-asm-customer-list cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <ng-container>\n      <div class=\"cx-dialog-header modal-header\">\n        <h2 id=\"asm-customer-list-title\" class=\"title modal-title\">\n          {{ 'asm.customerList.title' | cxTranslate }}\n        </h2>\n        <div id=\"asm-customer-list-desc\" class=\"cx-visually-hidden\">\n          {{ 'asm.customerList.description' | cxTranslate }}\n        </div>\n        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'!6.1'\">\n          <ng-template *ngTemplateOutlet=\"closeButton\"></ng-template>\n        </ng-container>\n        <ng-container *cxFeatureLevel=\"'6.1'\">\n          <ng-template *ngTemplateOutlet=\"createCustomerButton\"></ng-template>\n        </ng-container>\n      </div>\n      <div\n        class=\"cx-dialog-sub-header modal-header\"\n        [class.tablet-mobile]=\"(breakpoint$ | async) !== BREAKPOINT.md\"\n        *ngIf=\"customerListsPage$ | async as customerListsPage\"\n      >\n        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'!6.1'\">\n          <ng-template\n            *ngTemplateOutlet=\"\n              groupSelector;\n              context: { customerListsPage: customerListsPage }\n            \"\n          ></ng-template>\n        </ng-container>\n        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'6.1'\">\n          <div\n            class=\"cx-header-select\"\n            [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n          >\n            <ng-template\n              *ngTemplateOutlet=\"\n                groupSelector;\n                context: { customerListsPage: customerListsPage }\n              \"\n            ></ng-template>\n            <ng-template\n              *ngTemplateOutlet=\"\n                total;\n                context: {\n                  customerSearchPage: customerSearchPage$ | async\n                }\n              \"\n            >\n            </ng-template>\n          </div>\n        </ng-container>\n\n        <div\n          class=\"cx-header-actions\"\n          [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n        >\n          <ng-template *ngTemplateOutlet=\"sort\"></ng-template>\n          <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'!6.1'\">\n            <ng-template *ngTemplateOutlet=\"pagination\"></ng-template>\n          </ng-container>\n          <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'6.1'\">\n            <ng-template *ngTemplateOutlet=\"search\"></ng-template>\n          </ng-container>\n        </div>\n      </div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"cx-dialog-item\">\n            <div *ngIf=\"listsEmpty\" class=\"cx-error-state\">\n              {{ 'asm.customerList.noLists' | cxTranslate }}\n            </div>\n            <div *ngIf=\"listsError\" class=\"cx-error-state\">\n              {{ 'asm.customerList.listsError' | cxTranslate }}\n            </div>\n            <div *ngIf=\"customerSearchError$ | async\" class=\"cx-error-state\">\n              {{ 'generalErrors.pageFailure' | cxTranslate }}\n            </div>\n            <cx-spinner *ngIf=\"customerSearchLoading$ | async\"></cx-spinner>\n            <div *ngIf=\"customerSearchPage$ | async as customerSearchPage\">\n              <table\n                id=\"asm-cusomer-list-table\"\n                role=\"table\"\n                class=\"table\"\n                *ngIf=\"loaded\"\n              >\n                <caption class=\"cx-visually-hidden\">\n                  {{\n                    'asm.customerList.title' | cxTranslate\n                  }}\n                </caption>\n                <thead *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\">\n                  <tr role=\"row\">\n                    <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n                    <ng-container *cxFeatureLevel=\"'!6.1'\">\n                      <th\n                        role=\"columnheader\"\n                        class=\"cx-avatar-cell\"\n                        *ngIf=\"customerListConfig?.showAvatar\"\n                      >\n                        <span class=\"cx-visually-hidden\">\n                          {{\n                            'asm.customerList.tableHeader.customer'\n                              | cxTranslate\n                          }}\n                        </span>\n                      </th>\n                    </ng-container>\n                    <th\n                      role=\"columnheader\"\n                      *ngFor=\"let column of customerListConfig?.columns\"\n                    >\n                      <span\n                        *ngIf=\"\n                          column.headerLocalizationKey &&\n                          column.headerLocalizationKey !== 'hideHeaders'\n                        \"\n                      >\n                        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n                        <ng-container *cxFeatureLevel=\"'!6.1'\">\n                          {{ column.headerLocalizationKey | cxTranslate }}\n                        </ng-container>\n                        <ng-container *cxFeatureLevel=\"'6.1'\">\n                          <!-- TODO:(CXSPA-3090) for next major release replace the translation lable -->\n                          <ng-container\n                            *ngIf=\"\n                              column.headerLocalizationKey ===\n                              'asm.customerList.tableHeader.customer'\n                            \"\n                          >\n                            {{\n                              'asm.customerList.tableHeader.customerName'\n                                | cxTranslate\n                            }}\n                          </ng-container>\n                          <!-- TODO:(CXSPA-3090) for next major release replace the translation lable -->\n                          <ng-container\n                            *ngIf=\"\n                              column.headerLocalizationKey ===\n                              'asm.customerList.tableHeader.email'\n                            \"\n                          >\n                            {{\n                              'asm.customerList.tableHeader.emailId'\n                                | cxTranslate\n                            }}\n                          </ng-container>\n                          <ng-container\n                            *ngIf=\"\n                              column.headerLocalizationKey !==\n                                'asm.customerList.tableHeader.customer' &&\n                              column.headerLocalizationKey !==\n                                'asm.customerList.tableHeader.email'\n                            \"\n                          >\n                            {{ column.headerLocalizationKey | cxTranslate }}\n                          </ng-container>\n                        </ng-container>\n                      </span>\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr\n                    role=\"row\"\n                    *ngFor=\"let customerEntry of customerSearchPage?.entries\"\n                  >\n                    <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n                    <ng-container *cxFeatureLevel=\"'!6.1'\">\n                      <td\n                        role=\"cell\"\n                        *ngIf=\"customerListConfig?.showAvatar\"\n                        class=\"cx-avatar-cell\"\n                      >\n                        <div class=\"cx-avatar\">\n                          {{ getBadgeText(customerEntry) }}\n                        </div>\n                      </td>\n                    </ng-container>\n                    <!-- multi columns if desktop -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\"\n                    >\n                      <td\n                        role=\"cell\"\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: false\n                            }\n                          \"\n                        ></ng-template>\n                      </td>\n                    </ng-container>\n                    <!-- two column if tablet -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.sm\"\n                    >\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let even = even\n                          \"\n                        >\n                          <ng-container *ngIf=\"even\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let odd = odd\n                          \"\n                        >\n                          <ng-container *ngIf=\"odd\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                    </ng-container>\n                    <!-- one column if mobile -->\n                    <td\n                      role=\"cell\"\n                      class=\"cx-multi-cell\"\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n                    >\n                      <ng-container\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: true\n                            }\n                          \"\n                        ></ng-template>\n                      </ng-container>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <div\n                class=\"cx-empty-state\"\n                *ngIf=\"!customerSearchPage?.entries.length\"\n              >\n                {{ 'asm.customerList.noCustomers' | cxTranslate }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <!-- Modal Foot -->\n        <div\n          class=\"cx-dialog-sub-header modal-header cx-dialog-foot\"\n          [class.asm-mobile-pagination]=\"\n            (breakpoint$ | async) !== BREAKPOINT.md\n          \"\n          *ngIf=\"customerListsPage$ | async as customerListsPage\"\n        >\n          <div\n            class=\"cx-header-actions\"\n            [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n          >\n            <div *ngIf=\"customerSearchPage$ | async as customerSearchPage\">\n              <cx-pagination\n                [pagination]=\"customerSearchPage.pagination\"\n                (viewPageEvent)=\"changePage($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </div>\n        <div class=\"cx-dialog-footer modal-footer\">\n          <button\n            type=\"button\"\n            class=\"btn cx-asm-customer-list-btn-cancel\"\n            (click)=\"closeModal('Cancel click')\"\n          >\n            {{ 'asm.createCustomerForm.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </ng-container>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template\n  #cell\n  let-customerEntry=\"customerEntry\"\n  let-column=\"column\"\n  let-showHeader=\"showHeader\"\n>\n  <div\n    class=\"cx-cell-container\"\n    *ngIf=\"column.headerLocalizationKey !== 'hideHeaders'\"\n  >\n    <span class=\"cx-header-text\" *ngIf=\"showHeader\">\n      {{ column.headerLocalizationKey | cxTranslate }}\n    </span>\n\n    <ng-container *ngIf=\"!column.actionType\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </ng-container>\n\n    <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n    <ng-container *cxFeatureLevel=\"'6.1'\">\n      <div\n        class=\"cx-avatar\"\n        *ngIf=\"\n          customerListConfig?.showAvatar &&\n          column?.actionType === customerListColumnActionType?.START_SESSION\n        \"\n      >\n        <img\n          *ngIf=\"customerEntry?.userAvatar?.url\"\n          [attr.src]=\"\n            occConfig?.backend?.occ?.baseUrl + customerEntry?.userAvatar?.url\n          \"\n          alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n        />\n        <div class=\"cx-avatar-text\" *ngIf=\"!customerEntry?.userAvatar?.url\">\n          {{ getBadgeText(customerEntry) }}\n        </div>\n      </div>\n    </ng-container>\n\n    <button\n      *ngIf=\"column.actionType\"\n      (click)=\"startColumnAction(customerEntry, column.actionType)\"\n      class=\"btn btn-link cx-action-link cx-btn-cell\"\n      [class]=\"column.actionType === 'ACTIVE_CART' ? 'cx-cart' : ''\"\n      [disabled]=\"isRequired(customerEntry, column.actionType)\"\n      [attr.title]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n      [attr.aria-label]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n    >\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </button>\n  </div>\n</ng-template>\n<ng-template #cellContent let-customerEntry=\"customerEntry\" let-column=\"column\">\n  <div>\n    <span *ngIf=\"!column.icon\">{{\n      column.renderer?.(customerEntry) || ''\n    }}</span>\n    <cx-icon\n      *ngIf=\"column.icon\"\n      [attr.title]=\"\n        !column.actionType\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n      [class.cx-action-color]=\"\n        column.actionType && !isRequired(customerEntry, column.actionType)\n      \"\n      [type]=\"column.icon.symbol\"\n      [attr.aria-label]=\"\n        !column.actionType\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n    ></cx-icon>\n  </div>\n</ng-template>\n\n<ng-template #search>\n  <div class=\"form-group search-wrapper\">\n    <input\n      [formControl]=\"searchBox\"\n      (keyup)=\"onKey($event)\"\n      type=\"text\"\n      class=\"form-control\"\n      placeholder=\"{{ 'asm.customerList.searchBox' | cxTranslate }}\"\n      attr.aria-label=\"{{ 'asm.customerList.enterSearchBox' | cxTranslate }}\"\n    />\n    <cx-icon\n      [type]=\"iconTypes.SEARCH\"\n      role=\"button\"\n      [attr.aria-label]=\"'storeFinder.searchNearestStores' | cxTranslate\"\n      class=\"search\"\n      (click)=\"searchCustomers()\"\n    ></cx-icon>\n  </div>\n</ng-template>\n\n<ng-template #total let-customerSearchPage=\"customerSearchPage\">\n  <span class=\"cx-total\" *ngIf=\"customerSearchPage?.pagination?.totalResults\">\n    <ng-container *ngIf=\"customerSearchPage?.pagination?.totalResults > 1\">\n      {{\n        'asm.customerList.noOfCustomers'\n          | cxTranslate: { count: customerSearchPage?.pagination?.totalResults }\n      }}\n    </ng-container>\n    <ng-container *ngIf=\"customerSearchPage?.pagination?.totalResults === 1\">\n      {{ 'asm.customerList.oneCustomer' | cxTranslate }}\n    </ng-container>\n  </span>\n</ng-template>\n\n<ng-template #sort>\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.tableSort.sortBy' | cxTranslate\n    }}</span>\n    <cx-sorting\n      class=\"sort-selector\"\n      [sortOptions]=\"sorts\"\n      [sortLabels]=\"getSortLabels() | async\"\n      (sortListEvent)=\"changeSortCode($event)\"\n      [selectedOption]=\"sortCode\"\n      placeholder=\"{{ 'asm.customerList.tableSort.sortBy' | cxTranslate }}\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: sortCode,\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    ></cx-sorting>\n  </label>\n</ng-template>\n\n<ng-template #pagination>\n  <div class=\"cx-pagination-buttons\">\n    <div>\n      {{\n        'asm.customerList.page.page' | cxTranslate: { count: currentPage + 1 }\n      }}\n    </div>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToPreviousPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-previous\"\n      [disabled]=\"currentPage === 0 || !loaded\"\n    >\n      <cx-icon class=\"previous\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon\n      ><span>{{ 'asm.customerList.page.previous' | cxTranslate }}</span>\n    </button>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToNextPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-next\"\n      [disabled]=\"currentPage === maxPage || !loaded\"\n    >\n      <span>{{ 'asm.customerList.page.next' | cxTranslate }}</span\n      ><cx-icon class=\"next\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #groupSelector let-customerListsPage=\"customerListsPage\">\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.title' | cxTranslate\n    }}</span>\n    <ng-select\n      class=\"customer-list-selector\"\n      [searchable]=\"false\"\n      [clearable]=\"false\"\n      (change)=\"onChangeCustomerGroup()\"\n      [tabIndex]=\"0\"\n      [(ngModel)]=\"selectedUserGroupId\"\n      [items]=\"customerListsPage?.userGroups\"\n      bindLabel=\"name\"\n      bindValue=\"uid\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: getGroupName(customerListsPage, selectedUserGroupId),\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    >\n    </ng-select>\n  </label>\n</ng-template>\n\n<ng-template #closeButton>\n  <button\n    type=\"button\"\n    class=\"close\"\n    attr.aria-label=\"{{ 'common.close' | cxTranslate }}\"\n    (click)=\"closeModal('Cross click')\"\n  >\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-template>\n\n<ng-template #createCustomerButton>\n  <button\n    type=\"button\"\n    class=\"btn cx-asm-create-customer-btn\"\n    (click)=\"createCustomer()\"\n  >\n    <cx-icon [type]=\"iconTypes.USER_PLUS\"></cx-icon>\n    <span>{{ 'asm.customerList.createCustomer' | cxTranslate }}</span>\n  </button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i1$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i1.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "component", type: i1.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i1.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-list', template: "<div\n  class=\"cx-asm-customer-list cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <ng-container>\n      <div class=\"cx-dialog-header modal-header\">\n        <h2 id=\"asm-customer-list-title\" class=\"title modal-title\">\n          {{ 'asm.customerList.title' | cxTranslate }}\n        </h2>\n        <div id=\"asm-customer-list-desc\" class=\"cx-visually-hidden\">\n          {{ 'asm.customerList.description' | cxTranslate }}\n        </div>\n        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'!6.1'\">\n          <ng-template *ngTemplateOutlet=\"closeButton\"></ng-template>\n        </ng-container>\n        <ng-container *cxFeatureLevel=\"'6.1'\">\n          <ng-template *ngTemplateOutlet=\"createCustomerButton\"></ng-template>\n        </ng-container>\n      </div>\n      <div\n        class=\"cx-dialog-sub-header modal-header\"\n        [class.tablet-mobile]=\"(breakpoint$ | async) !== BREAKPOINT.md\"\n        *ngIf=\"customerListsPage$ | async as customerListsPage\"\n      >\n        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'!6.1'\">\n          <ng-template\n            *ngTemplateOutlet=\"\n              groupSelector;\n              context: { customerListsPage: customerListsPage }\n            \"\n          ></ng-template>\n        </ng-container>\n        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n        <ng-container *cxFeatureLevel=\"'6.1'\">\n          <div\n            class=\"cx-header-select\"\n            [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n          >\n            <ng-template\n              *ngTemplateOutlet=\"\n                groupSelector;\n                context: { customerListsPage: customerListsPage }\n              \"\n            ></ng-template>\n            <ng-template\n              *ngTemplateOutlet=\"\n                total;\n                context: {\n                  customerSearchPage: customerSearchPage$ | async\n                }\n              \"\n            >\n            </ng-template>\n          </div>\n        </ng-container>\n\n        <div\n          class=\"cx-header-actions\"\n          [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n        >\n          <ng-template *ngTemplateOutlet=\"sort\"></ng-template>\n          <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'!6.1'\">\n            <ng-template *ngTemplateOutlet=\"pagination\"></ng-template>\n          </ng-container>\n          <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n          <ng-container *cxFeatureLevel=\"'6.1'\">\n            <ng-template *ngTemplateOutlet=\"search\"></ng-template>\n          </ng-container>\n        </div>\n      </div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"cx-dialog-item\">\n            <div *ngIf=\"listsEmpty\" class=\"cx-error-state\">\n              {{ 'asm.customerList.noLists' | cxTranslate }}\n            </div>\n            <div *ngIf=\"listsError\" class=\"cx-error-state\">\n              {{ 'asm.customerList.listsError' | cxTranslate }}\n            </div>\n            <div *ngIf=\"customerSearchError$ | async\" class=\"cx-error-state\">\n              {{ 'generalErrors.pageFailure' | cxTranslate }}\n            </div>\n            <cx-spinner *ngIf=\"customerSearchLoading$ | async\"></cx-spinner>\n            <div *ngIf=\"customerSearchPage$ | async as customerSearchPage\">\n              <table\n                id=\"asm-cusomer-list-table\"\n                role=\"table\"\n                class=\"table\"\n                *ngIf=\"loaded\"\n              >\n                <caption class=\"cx-visually-hidden\">\n                  {{\n                    'asm.customerList.title' | cxTranslate\n                  }}\n                </caption>\n                <thead *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\">\n                  <tr role=\"row\">\n                    <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n                    <ng-container *cxFeatureLevel=\"'!6.1'\">\n                      <th\n                        role=\"columnheader\"\n                        class=\"cx-avatar-cell\"\n                        *ngIf=\"customerListConfig?.showAvatar\"\n                      >\n                        <span class=\"cx-visually-hidden\">\n                          {{\n                            'asm.customerList.tableHeader.customer'\n                              | cxTranslate\n                          }}\n                        </span>\n                      </th>\n                    </ng-container>\n                    <th\n                      role=\"columnheader\"\n                      *ngFor=\"let column of customerListConfig?.columns\"\n                    >\n                      <span\n                        *ngIf=\"\n                          column.headerLocalizationKey &&\n                          column.headerLocalizationKey !== 'hideHeaders'\n                        \"\n                      >\n                        <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n                        <ng-container *cxFeatureLevel=\"'!6.1'\">\n                          {{ column.headerLocalizationKey | cxTranslate }}\n                        </ng-container>\n                        <ng-container *cxFeatureLevel=\"'6.1'\">\n                          <!-- TODO:(CXSPA-3090) for next major release replace the translation lable -->\n                          <ng-container\n                            *ngIf=\"\n                              column.headerLocalizationKey ===\n                              'asm.customerList.tableHeader.customer'\n                            \"\n                          >\n                            {{\n                              'asm.customerList.tableHeader.customerName'\n                                | cxTranslate\n                            }}\n                          </ng-container>\n                          <!-- TODO:(CXSPA-3090) for next major release replace the translation lable -->\n                          <ng-container\n                            *ngIf=\"\n                              column.headerLocalizationKey ===\n                              'asm.customerList.tableHeader.email'\n                            \"\n                          >\n                            {{\n                              'asm.customerList.tableHeader.emailId'\n                                | cxTranslate\n                            }}\n                          </ng-container>\n                          <ng-container\n                            *ngIf=\"\n                              column.headerLocalizationKey !==\n                                'asm.customerList.tableHeader.customer' &&\n                              column.headerLocalizationKey !==\n                                'asm.customerList.tableHeader.email'\n                            \"\n                          >\n                            {{ column.headerLocalizationKey | cxTranslate }}\n                          </ng-container>\n                        </ng-container>\n                      </span>\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr\n                    role=\"row\"\n                    *ngFor=\"let customerEntry of customerSearchPage?.entries\"\n                  >\n                    <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n                    <ng-container *cxFeatureLevel=\"'!6.1'\">\n                      <td\n                        role=\"cell\"\n                        *ngIf=\"customerListConfig?.showAvatar\"\n                        class=\"cx-avatar-cell\"\n                      >\n                        <div class=\"cx-avatar\">\n                          {{ getBadgeText(customerEntry) }}\n                        </div>\n                      </td>\n                    </ng-container>\n                    <!-- multi columns if desktop -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\"\n                    >\n                      <td\n                        role=\"cell\"\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: false\n                            }\n                          \"\n                        ></ng-template>\n                      </td>\n                    </ng-container>\n                    <!-- two column if tablet -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.sm\"\n                    >\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let even = even\n                          \"\n                        >\n                          <ng-container *ngIf=\"even\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let odd = odd\n                          \"\n                        >\n                          <ng-container *ngIf=\"odd\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                    </ng-container>\n                    <!-- one column if mobile -->\n                    <td\n                      role=\"cell\"\n                      class=\"cx-multi-cell\"\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n                    >\n                      <ng-container\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: true\n                            }\n                          \"\n                        ></ng-template>\n                      </ng-container>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <div\n                class=\"cx-empty-state\"\n                *ngIf=\"!customerSearchPage?.entries.length\"\n              >\n                {{ 'asm.customerList.noCustomers' | cxTranslate }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <!-- Modal Foot -->\n        <div\n          class=\"cx-dialog-sub-header modal-header cx-dialog-foot\"\n          [class.asm-mobile-pagination]=\"\n            (breakpoint$ | async) !== BREAKPOINT.md\n          \"\n          *ngIf=\"customerListsPage$ | async as customerListsPage\"\n        >\n          <div\n            class=\"cx-header-actions\"\n            [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n          >\n            <div *ngIf=\"customerSearchPage$ | async as customerSearchPage\">\n              <cx-pagination\n                [pagination]=\"customerSearchPage.pagination\"\n                (viewPageEvent)=\"changePage($event)\"\n              ></cx-pagination>\n            </div>\n          </div>\n        </div>\n        <div class=\"cx-dialog-footer modal-footer\">\n          <button\n            type=\"button\"\n            class=\"btn cx-asm-customer-list-btn-cancel\"\n            (click)=\"closeModal('Cancel click')\"\n          >\n            {{ 'asm.createCustomerForm.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </ng-container>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template\n  #cell\n  let-customerEntry=\"customerEntry\"\n  let-column=\"column\"\n  let-showHeader=\"showHeader\"\n>\n  <div\n    class=\"cx-cell-container\"\n    *ngIf=\"column.headerLocalizationKey !== 'hideHeaders'\"\n  >\n    <span class=\"cx-header-text\" *ngIf=\"showHeader\">\n      {{ column.headerLocalizationKey | cxTranslate }}\n    </span>\n\n    <ng-container *ngIf=\"!column.actionType\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </ng-container>\n\n    <!-- TODO:(CXSPA-3090) for next major release remove feature level -->\n    <ng-container *cxFeatureLevel=\"'6.1'\">\n      <div\n        class=\"cx-avatar\"\n        *ngIf=\"\n          customerListConfig?.showAvatar &&\n          column?.actionType === customerListColumnActionType?.START_SESSION\n        \"\n      >\n        <img\n          *ngIf=\"customerEntry?.userAvatar?.url\"\n          [attr.src]=\"\n            occConfig?.backend?.occ?.baseUrl + customerEntry?.userAvatar?.url\n          \"\n          alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n        />\n        <div class=\"cx-avatar-text\" *ngIf=\"!customerEntry?.userAvatar?.url\">\n          {{ getBadgeText(customerEntry) }}\n        </div>\n      </div>\n    </ng-container>\n\n    <button\n      *ngIf=\"column.actionType\"\n      (click)=\"startColumnAction(customerEntry, column.actionType)\"\n      class=\"btn btn-link cx-action-link cx-btn-cell\"\n      [class]=\"column.actionType === 'ACTIVE_CART' ? 'cx-cart' : ''\"\n      [disabled]=\"isRequired(customerEntry, column.actionType)\"\n      [attr.title]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n      [attr.aria-label]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n    >\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </button>\n  </div>\n</ng-template>\n<ng-template #cellContent let-customerEntry=\"customerEntry\" let-column=\"column\">\n  <div>\n    <span *ngIf=\"!column.icon\">{{\n      column.renderer?.(customerEntry) || ''\n    }}</span>\n    <cx-icon\n      *ngIf=\"column.icon\"\n      [attr.title]=\"\n        !column.actionType\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n      [class.cx-action-color]=\"\n        column.actionType && !isRequired(customerEntry, column.actionType)\n      \"\n      [type]=\"column.icon.symbol\"\n      [attr.aria-label]=\"\n        !column.actionType\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n    ></cx-icon>\n  </div>\n</ng-template>\n\n<ng-template #search>\n  <div class=\"form-group search-wrapper\">\n    <input\n      [formControl]=\"searchBox\"\n      (keyup)=\"onKey($event)\"\n      type=\"text\"\n      class=\"form-control\"\n      placeholder=\"{{ 'asm.customerList.searchBox' | cxTranslate }}\"\n      attr.aria-label=\"{{ 'asm.customerList.enterSearchBox' | cxTranslate }}\"\n    />\n    <cx-icon\n      [type]=\"iconTypes.SEARCH\"\n      role=\"button\"\n      [attr.aria-label]=\"'storeFinder.searchNearestStores' | cxTranslate\"\n      class=\"search\"\n      (click)=\"searchCustomers()\"\n    ></cx-icon>\n  </div>\n</ng-template>\n\n<ng-template #total let-customerSearchPage=\"customerSearchPage\">\n  <span class=\"cx-total\" *ngIf=\"customerSearchPage?.pagination?.totalResults\">\n    <ng-container *ngIf=\"customerSearchPage?.pagination?.totalResults > 1\">\n      {{\n        'asm.customerList.noOfCustomers'\n          | cxTranslate: { count: customerSearchPage?.pagination?.totalResults }\n      }}\n    </ng-container>\n    <ng-container *ngIf=\"customerSearchPage?.pagination?.totalResults === 1\">\n      {{ 'asm.customerList.oneCustomer' | cxTranslate }}\n    </ng-container>\n  </span>\n</ng-template>\n\n<ng-template #sort>\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.tableSort.sortBy' | cxTranslate\n    }}</span>\n    <cx-sorting\n      class=\"sort-selector\"\n      [sortOptions]=\"sorts\"\n      [sortLabels]=\"getSortLabels() | async\"\n      (sortListEvent)=\"changeSortCode($event)\"\n      [selectedOption]=\"sortCode\"\n      placeholder=\"{{ 'asm.customerList.tableSort.sortBy' | cxTranslate }}\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: sortCode,\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    ></cx-sorting>\n  </label>\n</ng-template>\n\n<ng-template #pagination>\n  <div class=\"cx-pagination-buttons\">\n    <div>\n      {{\n        'asm.customerList.page.page' | cxTranslate: { count: currentPage + 1 }\n      }}\n    </div>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToPreviousPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-previous\"\n      [disabled]=\"currentPage === 0 || !loaded\"\n    >\n      <cx-icon class=\"previous\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon\n      ><span>{{ 'asm.customerList.page.previous' | cxTranslate }}</span>\n    </button>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToNextPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-next\"\n      [disabled]=\"currentPage === maxPage || !loaded\"\n    >\n      <span>{{ 'asm.customerList.page.next' | cxTranslate }}</span\n      ><cx-icon class=\"next\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #groupSelector let-customerListsPage=\"customerListsPage\">\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.title' | cxTranslate\n    }}</span>\n    <ng-select\n      class=\"customer-list-selector\"\n      [searchable]=\"false\"\n      [clearable]=\"false\"\n      (change)=\"onChangeCustomerGroup()\"\n      [tabIndex]=\"0\"\n      [(ngModel)]=\"selectedUserGroupId\"\n      [items]=\"customerListsPage?.userGroups\"\n      bindLabel=\"name\"\n      bindValue=\"uid\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: getGroupName(customerListsPage, selectedUserGroupId),\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    >\n    </ng-select>\n  </label>\n</ng-template>\n\n<ng-template #closeButton>\n  <button\n    type=\"button\"\n    class=\"close\"\n    attr.aria-label=\"{{ 'common.close' | cxTranslate }}\"\n    (click)=\"closeModal('Cross click')\"\n  >\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-template>\n\n<ng-template #createCustomerButton>\n  <button\n    type=\"button\"\n    class=\"btn cx-asm-create-customer-btn\"\n    (click)=\"createCustomer()\"\n  >\n    <cx-icon [type]=\"iconTypes.USER_PLUS\"></cx-icon>\n    <span>{{ 'asm.customerList.createCustomer' | cxTranslate }}</span>\n  </button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i1.BreakpointService }, { type: i2$1.AsmConfig }, { type: i1$1.TranslationService }, { type: i2$1.AsmCustomerListFacade }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }, { type: i1$1.OccConfig, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { addNewCustomerLink: [{
                type: ViewChild,
                args: ['addNewCustomerLink']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCustomerListLayoutConfig = {
    launch: {
        ASM_CUSTOMER_LIST: {
            inlineRoot: true,
            component: CustomerListComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmLayoutConfig = {
    launch: {
        ASM: {
            outlet: 'cx-storefront',
            component: AsmMainUiComponent,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmPaginationConfig = {
    pagination: {
        rangeCount: 2,
        addPrevious: true,
        addNext: true,
        addStart: false,
        addEnd: false,
        addFirst: true,
        addLast: true,
        addDots: true,
        substituteDotsForSingularPage: true,
        dotsLabel: '···',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultBindCartLayoutConfig = {
    launch: {
        ["ASM_BIND_CART" /* LAUNCH_CALLER.ASM_BIND_CART */]: {
            inlineRoot: true,
            component: AsmBindCartDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSaveCartLayoutConfig = {
    launch: {
        ["ASM_SAVE_CART" /* LAUNCH_CALLER.ASM_SAVE_CART */]: {
            inlineRoot: true,
            component: AsmSaveCartDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSwitchCustomerLayoutConfig = {
    launch: {
        ["ASM_SWITCH_CUSTOMER" /* LAUNCH_CALLER.ASM_SWITCH_CUSTOMER */]: {
            inlineRoot: true,
            component: AsmSwitchCustomerDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmComponentsModule {
}
AsmComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentsModule, declarations: [AsmBindCartDialogComponent,
        AsmSaveCartDialogComponent,
        AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerListComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent,
        AsmBindCartComponent,
        AsmSwitchCustomerDialogComponent,
        DotSpinnerComponent,
        AsmCreateCustomerFormComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        IconModule,
        NgSelectModule,
        FormsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule,
        KeyboardFocusModule,
        NgSelectA11yModule,
        SortingModule,
        PaginationModule,
        MessageComponentModule,
        FeaturesConfigModule], exports: [AsmBindCartDialogComponent,
        AsmSaveCartDialogComponent,
        AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerListComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent,
        AsmBindCartComponent,
        AsmSwitchCustomerDialogComponent,
        DotSpinnerComponent,
        AsmCreateCustomerFormComponent] });
AsmComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentsModule, providers: [
        provideDefaultConfig(defaultAsmLayoutConfig),
        provideDefaultConfig(defaultBindCartLayoutConfig),
        provideDefaultConfig(defaultSaveCartLayoutConfig),
        provideDefaultConfig(defaultSwitchCustomerLayoutConfig),
        provideDefaultConfig(defaultCustomerListLayoutConfig),
        provideDefaultConfig(defaultAsmPaginationConfig),
        provideDefaultConfig(defaultAsmCreateCustomerFormLayoutConfig),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        IconModule,
        NgSelectModule,
        FormsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule,
        KeyboardFocusModule,
        NgSelectA11yModule,
        SortingModule,
        PaginationModule,
        MessageComponentModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        FormErrorsModule,
                        IconModule,
                        NgSelectModule,
                        FormsModule,
                        SpinnerModule,
                        PasswordVisibilityToggleModule,
                        KeyboardFocusModule,
                        NgSelectA11yModule,
                        SortingModule,
                        PaginationModule,
                        MessageComponentModule,
                        FeaturesConfigModule,
                    ],
                    declarations: [
                        AsmBindCartDialogComponent,
                        AsmSaveCartDialogComponent,
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerListComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                        AsmBindCartComponent,
                        AsmSwitchCustomerDialogComponent,
                        DotSpinnerComponent,
                        AsmCreateCustomerFormComponent,
                    ],
                    exports: [
                        AsmBindCartDialogComponent,
                        AsmSaveCartDialogComponent,
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerListComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                        AsmBindCartComponent,
                        AsmSwitchCustomerDialogComponent,
                        DotSpinnerComponent,
                        AsmCreateCustomerFormComponent,
                    ],
                    providers: [
                        provideDefaultConfig(defaultAsmLayoutConfig),
                        provideDefaultConfig(defaultBindCartLayoutConfig),
                        provideDefaultConfig(defaultSaveCartLayoutConfig),
                        provideDefaultConfig(defaultSwitchCustomerLayoutConfig),
                        provideDefaultConfig(defaultCustomerListLayoutConfig),
                        provideDefaultConfig(defaultAsmPaginationConfig),
                        provideDefaultConfig(defaultAsmCreateCustomerFormLayoutConfig),
                    ],
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

export { AsmBindCartComponent, AsmBindCartDialogComponent, AsmComponentService, AsmComponentsModule, AsmCreateCustomerFormComponent, AsmMainUiComponent, AsmSaveCartDialogComponent, AsmSessionTimerComponent, AsmSwitchCustomerDialogComponent, AsmToggleUiComponent, BIND_CART_DIALOG_ACTION, CART_TYPE_KEY, CSAgentLoginFormComponent, CustomerEmulationComponent, CustomerListComponent, CustomerSelectionComponent, DotSpinnerComponent, FormatTimerPipe, SAVE_CART_DIALOG_ACTION, SWITCH_CUSTOMER_DIALOG_ACTION };
//# sourceMappingURL=spartacus-asm-components.mjs.map
