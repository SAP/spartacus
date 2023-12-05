import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewChild, NgModule, Injectable, HostListener } from '@angular/core';
import { Subscription, combineLatest, queueScheduler, merge } from 'rxjs';
import { tap, map, take, distinctUntilChanged, filter, switchMap, shareReplay, every, observeOn, debounce } from 'rxjs/operators';
import * as i3 from '@spartacus/cart/base/root';
import { CartOutlets, CartType, PromotionLocation, DeleteCartSuccessEvent, OrderEntriesSource, ProductImportStatus, DeleteCartEvent, DeleteCartFailEvent } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { I18nModule, UrlModule, provideDefaultConfig, GlobalMessageType, ConfigModule, AuthGuard } from '@spartacus/core';
import * as i3$1 from '@spartacus/storefront';
import { ICON_TYPE, CardModule, MediaModule, IconModule, SpinnerModule, OutletModule, ListNavigationModule, FormUtils, DIALOG_TYPE, FormErrorsModule, KeyboardFocusModule } from '@spartacus/storefront';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2$1 from '@spartacus/cart/saved-cart/root';
import { SavedCartFormType, SavedCartOrderEntriesContextToken, NewSavedCartOrderEntriesContextToken } from '@spartacus/cart/saved-cart/root';
import * as i6 from '@spartacus/cart/base/components/add-to-cart';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import * as i1 from '@spartacus/cart/base/core';
import * as i5$1 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddToSavedCartComponent {
    constructor(activeCartFacade, authService, routingService, vcr, launchDialogService) {
        this.activeCartFacade = activeCartFacade;
        this.authService = authService;
        this.routingService = routingService;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.loggedIn = false;
    }
    ngOnInit() {
        this.cart$ = combineLatest([
            this.activeCartFacade.getActive(),
            this.authService.isUserLoggedIn(),
        ]).pipe(tap(([_, loggedIn]) => (this.loggedIn = loggedIn)), map(([activeCart]) => activeCart));
        this.disableSaveCartForLater$ = this.cart$.pipe(map((cart) => { var _a; return !((_a = cart.entries) === null || _a === void 0 ? void 0 : _a.length); }));
    }
    saveCart(cart) {
        this.subscription.add(this.disableSaveCartForLater$.subscribe((isDisabled) => {
            if (isDisabled) {
                return;
            }
            if (this.loggedIn) {
                this.openDialog(cart);
            }
            else {
                this.routingService.go({ cxRoute: 'login' });
            }
        }));
    }
    openDialog(cart) {
        const dialog = this.launchDialogService.openDialog("SAVED_CART" /* LAUNCH_CALLER.SAVED_CART */, this.element, this.vcr, { cart, layoutOption: 'save' });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
AddToSavedCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartComponent, deps: [{ token: i3.ActiveCartFacade }, { token: i2.AuthService }, { token: i2.RoutingService }, { token: i0.ViewContainerRef }, { token: i3$1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
AddToSavedCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddToSavedCartComponent, selector: "cx-add-to-saved-cart", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"cx-add-to-saved-cart-container\">\n    <a\n      class=\"link cx-action-link\"\n      [routerLink]=\"\n        {\n          cxRoute: 'savedCarts'\n        } | cxUrl\n      \"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.savedCarts' | cxTranslate }}</span>\n    </a>\n    <a\n      #element\n      tabindex=\"0\"\n      class=\"link cx-action-link\"\n      [class.disabled]=\"disableSaveCartForLater$ | async\"\n      (click)=\"saveCart(cart)\"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.saveCartForLater' | cxTranslate }}</span>\n    </a>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-saved-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"cx-add-to-saved-cart-container\">\n    <a\n      class=\"link cx-action-link\"\n      [routerLink]=\"\n        {\n          cxRoute: 'savedCarts'\n        } | cxUrl\n      \"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.savedCarts' | cxTranslate }}</span>\n    </a>\n    <a\n      #element\n      tabindex=\"0\"\n      class=\"link cx-action-link\"\n      [class.disabled]=\"disableSaveCartForLater$ | async\"\n      (click)=\"saveCart(cart)\"\n      cxAutoFocus\n    >\n      <span>{{ 'addToSavedCart.saveCartForLater' | cxTranslate }}</span>\n    </a>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i3.ActiveCartFacade }, { type: i2.AuthService }, { type: i2.RoutingService }, { type: i0.ViewContainerRef }, { type: i3$1.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddToSavedCartModule {
}
AddToSavedCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddToSavedCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, declarations: [AddToSavedCartComponent], imports: [CommonModule, RouterModule, I18nModule, UrlModule], exports: [AddToSavedCartComponent] });
AddToSavedCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AddToSavedCartsComponent: {
                    component: AddToSavedCartComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToSavedCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, UrlModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AddToSavedCartsComponent: {
                                    component: AddToSavedCartComponent,
                                },
                            },
                        }),
                    ],
                    exports: [AddToSavedCartComponent],
                    declarations: [AddToSavedCartComponent],
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
class SavedCartDetailsService {
    constructor(routingService, savedCartService) {
        this.routingService = routingService;
        this.savedCartService = savedCartService;
        this.savedCartId$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.savedCartId), distinctUntilChanged());
        this.savedCart$ = this.savedCartId$.pipe(filter((cartId) => Boolean(cartId)), tap((savedCartId) => this.savedCartService.loadSavedCart(savedCartId)), switchMap((savedCartId) => this.savedCartService.get(savedCartId)), shareReplay({ bufferSize: 1, refCount: true }));
    }
    getSavedCartId() {
        return this.savedCartId$;
    }
    getCartDetails() {
        return this.savedCart$;
    }
}
SavedCartDetailsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsService, deps: [{ token: i2.RoutingService }, { token: i2$1.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartDetailsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }, { type: i2$1.SavedCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartDetailsActionComponent {
    constructor(savedCartDetailsService, vcr, launchDialogService) {
        this.savedCartDetailsService = savedCartDetailsService;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.savedCartFormType = SavedCartFormType;
        this.savedCart$ = this.savedCartDetailsService.getCartDetails();
    }
    openDialog(cart, type) {
        const dialog = this.launchDialogService.openDialog("SAVED_CART" /* LAUNCH_CALLER.SAVED_CART */, this.element, this.vcr, { cart, layoutOption: type });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
SavedCartDetailsActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsActionComponent, deps: [{ token: SavedCartDetailsService }, { token: i0.ViewContainerRef }, { token: i3$1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
SavedCartDetailsActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SavedCartDetailsActionComponent, selector: "cx-saved-cart-details-action", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"savedCart$ | async as cart\">\n  <div class=\"cx-saved-cart-restore-btns row\">\n    <div class=\"col-xs-12 col-md-5 col-lg-4\">\n      <button\n        #element\n        class=\"btn btn-block btn-secondary\"\n        (click)=\"openDialog(cart, savedCartFormType.DELETE)\"\n      >\n        {{ 'savedCartDetails.deleteSavedCart' | cxTranslate }}\n      </button>\n    </div>\n    <div class=\"col-xs-12 col-md-5 col-lg-4\">\n      <button\n        #element\n        class=\"btn btn-block btn-primary\"\n        (click)=\"openDialog(cart, savedCartFormType.RESTORE)\"\n      >\n        {{ 'savedCartList.makeCartActive' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsActionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-saved-cart-details-action', template: "<ng-container *ngIf=\"savedCart$ | async as cart\">\n  <div class=\"cx-saved-cart-restore-btns row\">\n    <div class=\"col-xs-12 col-md-5 col-lg-4\">\n      <button\n        #element\n        class=\"btn btn-block btn-secondary\"\n        (click)=\"openDialog(cart, savedCartFormType.DELETE)\"\n      >\n        {{ 'savedCartDetails.deleteSavedCart' | cxTranslate }}\n      </button>\n    </div>\n    <div class=\"col-xs-12 col-md-5 col-lg-4\">\n      <button\n        #element\n        class=\"btn btn-block btn-primary\"\n        (click)=\"openDialog(cart, savedCartFormType.RESTORE)\"\n      >\n        {{ 'savedCartList.makeCartActive' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: SavedCartDetailsService }, { type: i0.ViewContainerRef }, { type: i3$1.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartDetailsItemsComponent {
    constructor(savedCartDetailsService, savedCartService, eventSercvice, globalMessageService, routingService, translation) {
        this.savedCartDetailsService = savedCartDetailsService;
        this.savedCartService = savedCartService;
        this.eventSercvice = eventSercvice;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.translation = translation;
        this.subscription = new Subscription();
        this.CartOutlets = CartOutlets;
        this.CartType = CartType;
        this.CartLocation = PromotionLocation;
        this.cartLoaded$ = this.savedCartDetailsService
            .getSavedCartId()
            .pipe(switchMap((cartId) => this.savedCartService.isStable(cartId)));
        this.savedCart$ = this.savedCartDetailsService
            .getCartDetails()
            .pipe(tap((cart) => {
            var _a;
            if (((_a = cart === null || cart === void 0 ? void 0 : cart.entries) !== null && _a !== void 0 ? _a : []).length <= 0 && !!(cart === null || cart === void 0 ? void 0 : cart.code)) {
                this.savedCartService.deleteSavedCart(cart.code);
            }
        }));
    }
    ngOnInit() {
        this.subscription.add(this.eventSercvice
            .get(DeleteCartSuccessEvent)
            .pipe(take(1), map(() => true))
            .subscribe((success) => this.onDeleteComplete(success)));
        this.buyItAgainTranslation$ = this.translation.translate('addToCart.addToActiveCart');
    }
    onDeleteComplete(success) {
        if (success) {
            this.routingService.go({ cxRoute: 'savedCarts' });
            this.globalMessageService.add({
                key: 'savedCartDialog.deleteCartSuccess',
            }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
SavedCartDetailsItemsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsItemsComponent, deps: [{ token: SavedCartDetailsService }, { token: i2$1.SavedCartFacade }, { token: i2.EventService }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
SavedCartDetailsItemsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SavedCartDetailsItemsComponent, selector: "cx-saved-cart-details-items", ngImport: i0, template: "<ng-container *ngIf=\"savedCart$ | async as cart\">\n  <ng-container *ngIf=\"cart?.entries?.length > 0; else emptyCartItems\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"cart-details-wrapper\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          cartId: cart.code,\n          cartIsLoading: !(cartLoaded$ | async),\n          items: cart.entries,\n          promotionLocation: CartLocation.SavedCart,\n          options: {\n            displayAddToCart: true,\n            addToCartString: (buyItAgainTranslation$ | async),\n            optionalBtn: addToCartBtn,\n            cartType: CartType.SELECTIVE\n          }\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</ng-container>\n<ng-template #emptyCartItems>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    [pickupStore]=\"ctx.item.deliveryPointOfService?.name\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i3$1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: i6.AddToCartComponent, selector: "cx-add-to-cart", inputs: ["productCode", "showQuantity", "options", "pickupStore", "product"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsItemsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-saved-cart-details-items', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"savedCart$ | async as cart\">\n  <ng-container *ngIf=\"cart?.entries?.length > 0; else emptyCartItems\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"cart-details-wrapper\">\n      <ng-template\n        [cxOutlet]=\"CartOutlets.CART_ITEM_LIST\"\n        [cxOutletContext]=\"{\n          cartId: cart.code,\n          cartIsLoading: !(cartLoaded$ | async),\n          items: cart.entries,\n          promotionLocation: CartLocation.SavedCart,\n          options: {\n            displayAddToCart: true,\n            addToCartString: (buyItAgainTranslation$ | async),\n            optionalBtn: addToCartBtn,\n            cartType: CartType.SELECTIVE\n          }\n        }\"\n      >\n      </ng-template>\n    </div>\n  </ng-container>\n</ng-container>\n<ng-template #emptyCartItems>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n\n<ng-template let-ctx #addToCartBtn>\n  <cx-add-to-cart\n    [productCode]=\"ctx.item.product?.code\"\n    [product]=\"ctx.item.product\"\n    [showQuantity]=\"false\"\n    [options]=\"ctx.options\"\n    [pickupStore]=\"ctx.item.deliveryPointOfService?.name\"\n  >\n  </cx-add-to-cart>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: SavedCartDetailsService }, { type: i2$1.SavedCartFacade }, { type: i2.EventService }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }, { type: i2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartDetailsOverviewComponent {
    constructor(savedCartDetailsService, translation, vcr, launchDialogService) {
        this.savedCartDetailsService = savedCartDetailsService;
        this.translation = translation;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.iconTypes = ICON_TYPE;
        this.savedCart$ = this.savedCartDetailsService.getCartDetails();
    }
    getCartName(cartName) {
        return this.translation.translate('savedCartDetails.cartName').pipe(filter(() => Boolean(cartName)), map((textTitle) => ({
            title: textTitle,
            text: [cartName],
        })));
    }
    getCartDescription(cartDescription) {
        return this.translation.translate('savedCartDetails.cartDescription').pipe(filter(() => Boolean(cartDescription)), map((textTitle) => ({
            title: textTitle,
            text: [cartDescription],
        })));
    }
    getCartId(cartId) {
        return this.translation.translate('savedCartDetails.cartId').pipe(filter(() => Boolean(cartId)), map((textTitle) => ({
            title: textTitle,
            text: [cartId],
        })));
    }
    getDateSaved(saveTime) {
        return this.translation.translate('savedCartDetails.dateSaved').pipe(filter(() => Boolean(saveTime)), map((textTitle) => {
            return {
                title: textTitle,
                text: [saveTime !== null && saveTime !== void 0 ? saveTime : ''],
            };
        }));
    }
    getCartItems(totalItems) {
        return this.translation.translate('savedCartDetails.items').pipe(filter(() => Boolean(totalItems)), map((textTitle) => ({
            title: textTitle,
            text: [totalItems.toString()],
        })));
    }
    getCartQuantity(totalUnitCount) {
        return this.translation.translate('savedCartDetails.quantity').pipe(filter(() => Boolean(totalUnitCount)), map((textTitle) => ({
            title: textTitle,
            text: [totalUnitCount.toString()],
        })));
    }
    getCartTotal(totalPriceWithTax) {
        return this.translation.translate('savedCartDetails.total').pipe(filter(() => Boolean(totalPriceWithTax)), map((textTitle) => ({
            title: textTitle,
            text: [totalPriceWithTax],
        })));
    }
    openDialog(cart) {
        const dialog = this.launchDialogService.openDialog("SAVED_CART" /* LAUNCH_CALLER.SAVED_CART */, this.element, this.vcr, { cart, layoutOption: 'edit' });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
SavedCartDetailsOverviewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsOverviewComponent, deps: [{ token: SavedCartDetailsService }, { token: i2.TranslationService }, { token: i0.ViewContainerRef }, { token: i3$1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
SavedCartDetailsOverviewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SavedCartDetailsOverviewComponent, selector: "cx-saved-cart-details-overview", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"savedCart$ | async as cart\">\n  <div class=\"cx-cart-summary\">\n    <div class=\"container\">\n      <div class=\"cx-summary-card\">\n        <div class=\"cx-edit-container\">\n          <cx-card [content]=\"getCartName(cart?.name) | async\"></cx-card>\n          <button\n            [attr.aria-label]=\"'savedCartDetails.editSavedCart' | cxTranslate\"\n            class=\"cx-edit-cart\"\n            #element\n            (click)=\"openDialog(cart)\"\n          >\n            <cx-icon [type]=\"iconTypes.PENCIL\"></cx-icon>\n          </button>\n        </div>\n        <div class=\"cx-card-description\">\n          <cx-card\n            [content]=\"getCartDescription(cart?.description) | async\"\n            [truncateText]=\"true\"\n            [charactersLimit]=\"30\"\n          ></cx-card>\n        </div>\n      </div>\n      <div class=\"cx-summary-card\">\n        <cx-card [content]=\"getCartId(cart?.code) | async\"></cx-card>\n      </div>\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getDateSaved(cart?.saveTime | cxDate) | async\"\n        ></cx-card>\n        <cx-card [content]=\"getCartItems(cart?.totalItems) | async\"></cx-card>\n      </div>\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getCartQuantity(cart?.totalUnitCount) | async\"\n        ></cx-card>\n        <cx-card\n          [content]=\"\n            getCartTotal(cart?.totalPriceWithTax?.formattedValue) | async\n          \"\n        ></cx-card>\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i3$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsOverviewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-saved-cart-details-overview', template: "<ng-container *ngIf=\"savedCart$ | async as cart\">\n  <div class=\"cx-cart-summary\">\n    <div class=\"container\">\n      <div class=\"cx-summary-card\">\n        <div class=\"cx-edit-container\">\n          <cx-card [content]=\"getCartName(cart?.name) | async\"></cx-card>\n          <button\n            [attr.aria-label]=\"'savedCartDetails.editSavedCart' | cxTranslate\"\n            class=\"cx-edit-cart\"\n            #element\n            (click)=\"openDialog(cart)\"\n          >\n            <cx-icon [type]=\"iconTypes.PENCIL\"></cx-icon>\n          </button>\n        </div>\n        <div class=\"cx-card-description\">\n          <cx-card\n            [content]=\"getCartDescription(cart?.description) | async\"\n            [truncateText]=\"true\"\n            [charactersLimit]=\"30\"\n          ></cx-card>\n        </div>\n      </div>\n      <div class=\"cx-summary-card\">\n        <cx-card [content]=\"getCartId(cart?.code) | async\"></cx-card>\n      </div>\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getDateSaved(cart?.saveTime | cxDate) | async\"\n        ></cx-card>\n        <cx-card [content]=\"getCartItems(cart?.totalItems) | async\"></cx-card>\n      </div>\n      <div class=\"cx-summary-card\">\n        <cx-card\n          [content]=\"getCartQuantity(cart?.totalUnitCount) | async\"\n        ></cx-card>\n        <cx-card\n          [content]=\"\n            getCartTotal(cart?.totalPriceWithTax?.formattedValue) | async\n          \"\n        ></cx-card>\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: SavedCartDetailsService }, { type: i2.TranslationService }, { type: i0.ViewContainerRef }, { type: i3$1.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartDetailsModule {
}
SavedCartDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, declarations: [SavedCartDetailsOverviewComponent,
        SavedCartDetailsActionComponent,
        SavedCartDetailsItemsComponent], imports: [CommonModule,
        I18nModule,
        UrlModule,
        RouterModule,
        CardModule,
        MediaModule,
        IconModule,
        SpinnerModule,
        OutletModule,
        AddToCartModule, i2.ConfigModule], exports: [SavedCartDetailsOverviewComponent,
        SavedCartDetailsActionComponent,
        SavedCartDetailsItemsComponent] });
SavedCartDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, imports: [CommonModule,
        I18nModule,
        UrlModule,
        RouterModule,
        CardModule,
        MediaModule,
        IconModule,
        SpinnerModule,
        OutletModule,
        AddToCartModule,
        ConfigModule.withConfig({
            cmsComponents: {
                SavedCartDetailsOverviewComponent: {
                    component: SavedCartDetailsOverviewComponent,
                    guards: [AuthGuard],
                },
                SavedCartDetailsItemsComponent: {
                    component: SavedCartDetailsItemsComponent,
                    guards: [AuthGuard],
                },
                SavedCartDetailsActionComponent: {
                    component: SavedCartDetailsActionComponent,
                    guards: [AuthGuard],
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                        CardModule,
                        MediaModule,
                        IconModule,
                        SpinnerModule,
                        OutletModule,
                        AddToCartModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                SavedCartDetailsOverviewComponent: {
                                    component: SavedCartDetailsOverviewComponent,
                                    guards: [AuthGuard],
                                },
                                SavedCartDetailsItemsComponent: {
                                    component: SavedCartDetailsItemsComponent,
                                    guards: [AuthGuard],
                                },
                                SavedCartDetailsActionComponent: {
                                    component: SavedCartDetailsActionComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        SavedCartDetailsOverviewComponent,
                        SavedCartDetailsActionComponent,
                        SavedCartDetailsItemsComponent,
                    ],
                    exports: [
                        SavedCartDetailsOverviewComponent,
                        SavedCartDetailsActionComponent,
                        SavedCartDetailsItemsComponent,
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
class SavedCartListComponent {
    constructor(routing, savedCartService, vcr, launchDialogService) {
        this.routing = routing;
        this.savedCartService = savedCartService;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.savedCarts$ = this.savedCartService.getList().pipe(map((lists) => lists.sort((a, b) => {
            const date1 = a.saveTime
                ? new Date(a.saveTime).getTime()
                : new Date().getTime();
            const date2 = b.saveTime
                ? new Date(b.saveTime).getTime()
                : new Date().getTime();
            return date2 - date1;
        })));
    }
    ngOnInit() {
        this.isLoading$ = this.savedCartService.getSavedCartListProcessLoading();
        this.savedCartService.loadSavedCarts();
    }
    goToSavedCartDetails(cart) {
        this.routing.go({
            cxRoute: 'savedCartsDetails',
            params: { savedCartId: cart === null || cart === void 0 ? void 0 : cart.code },
        });
    }
    openDialog(event, cart) {
        const dialog = this.launchDialogService.openDialog("SAVED_CART" /* LAUNCH_CALLER.SAVED_CART */, this.restoreButton, this.vcr, { cart, layoutOption: SavedCartFormType.RESTORE });
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
        event.stopPropagation();
    }
    ngOnDestroy() {
        var _a;
        this.savedCartService.clearSavedCarts();
        this.savedCartService.clearSaveCart();
        this.savedCartService.clearRestoreSavedCart();
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
SavedCartListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListComponent, deps: [{ token: i2.RoutingService }, { token: i2$1.SavedCartFacade }, { token: i0.ViewContainerRef }, { token: i3$1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
SavedCartListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SavedCartListComponent, selector: "cx-saved-cart-list", viewQueries: [{ propertyName: "restoreButton", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"savedCarts$ | async as savedCarts\">\n  <ng-container *ngIf=\"!(isLoading$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"cx-saved-cart-list-header\">\n      <h2>\n        {{\n          'savedCartList.savedCarts' | cxTranslate: { count: savedCarts.length }\n        }}\n      </h2>\n    </div>\n\n    <ng-container *ngIf=\"savedCarts?.length > 0; else noSavedCarts\">\n      <table class=\"table cx-saved-cart-list-table\">\n        <thead class=\"cx-saved-cart-list-thead-mobile\">\n          <th scope=\"col\">\n            {{ 'savedCartList.cartName' | cxTranslate }}\n          </th>\n          <th scope=\"col\">{{ 'savedCartList.cartId' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'savedCartList.dateSaved' | cxTranslate }}</th>\n          <th scope=\"col\" class=\"cx-saved-cart-list-th-qty\">\n            {{ 'savedCartList.quantity' | cxTranslate }}\n          </th>\n          <th scope=\"col\" class=\"cx-saved-cart-list-th-total\">\n            {{ 'savedCartList.total' | cxTranslate }}\n          </th>\n          <th scope=\"col\">\n            {{ 'savedCartList.actions' | cxTranslate }}\n          </th>\n        </thead>\n        <tbody>\n          <tr\n            *ngFor=\"let savedCart of savedCarts\"\n            (click)=\"goToSavedCartDetails(savedCart)\"\n          >\n            <td class=\"cx-saved-cart-list-cart-name\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.cartName' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n              >\n                {{ savedCart?.name }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-cart-id\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.cartId' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n                >{{ savedCart?.code }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-date-saved\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.dateSaved' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n                >{{ savedCart?.saveTime | cxDate: 'longDate' }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-quantity\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.quantity' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n              >\n                {{ savedCart?.totalUnitCount }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-total\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.total' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n              >\n                {{ savedCart?.totalPrice?.formattedValue }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-make-cart-active\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\"></div>\n              <button\n                #element\n                class=\"btn btn-tertiary cx-saved-cart-make-active\"\n                (click)=\"openDialog($event, savedCart)\"\n              >\n                {{ 'savedCartList.makeCartActive' | cxTranslate }}\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </ng-container>\n\n    <!-- NO SAVED CART CONTAINER -->\n    <ng-template #noSavedCarts>\n      <div class=\"cx-saved-cart-list-no-saved-carts row\">\n        <div class=\"col-sm-12 col-md-6 col-lg-4\">\n          <div>{{ 'savedCartList.notFound' | cxTranslate }}</div>\n        </div>\n      </div>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #loading>\n    <div class=\"cx-spinner\">\n      <cx-spinner></cx-spinner>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3$1.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-saved-cart-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"savedCarts$ | async as savedCarts\">\n  <ng-container *ngIf=\"!(isLoading$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <div class=\"cx-saved-cart-list-header\">\n      <h2>\n        {{\n          'savedCartList.savedCarts' | cxTranslate: { count: savedCarts.length }\n        }}\n      </h2>\n    </div>\n\n    <ng-container *ngIf=\"savedCarts?.length > 0; else noSavedCarts\">\n      <table class=\"table cx-saved-cart-list-table\">\n        <thead class=\"cx-saved-cart-list-thead-mobile\">\n          <th scope=\"col\">\n            {{ 'savedCartList.cartName' | cxTranslate }}\n          </th>\n          <th scope=\"col\">{{ 'savedCartList.cartId' | cxTranslate }}</th>\n          <th scope=\"col\">{{ 'savedCartList.dateSaved' | cxTranslate }}</th>\n          <th scope=\"col\" class=\"cx-saved-cart-list-th-qty\">\n            {{ 'savedCartList.quantity' | cxTranslate }}\n          </th>\n          <th scope=\"col\" class=\"cx-saved-cart-list-th-total\">\n            {{ 'savedCartList.total' | cxTranslate }}\n          </th>\n          <th scope=\"col\">\n            {{ 'savedCartList.actions' | cxTranslate }}\n          </th>\n        </thead>\n        <tbody>\n          <tr\n            *ngFor=\"let savedCart of savedCarts\"\n            (click)=\"goToSavedCartDetails(savedCart)\"\n          >\n            <td class=\"cx-saved-cart-list-cart-name\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.cartName' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n              >\n                {{ savedCart?.name }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-cart-id\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.cartId' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n                >{{ savedCart?.code }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-date-saved\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.dateSaved' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n                >{{ savedCart?.saveTime | cxDate: 'longDate' }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-quantity\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.quantity' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n              >\n                {{ savedCart?.totalUnitCount }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-total\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\">\n                {{ 'savedCartList.total' | cxTranslate }}\n              </div>\n              <a\n                [routerLink]=\"\n                  {\n                    cxRoute: 'savedCartsDetails',\n                    params: { savedCartId: savedCart?.code }\n                  } | cxUrl\n                \"\n                class=\"cx-saved-cart-list-value\"\n              >\n                {{ savedCart?.totalPrice?.formattedValue }}</a\n              >\n            </td>\n            <td class=\"cx-saved-cart-list-make-cart-active\">\n              <div class=\"cx-table-label-mobile cx-saved-cart-list-label\"></div>\n              <button\n                #element\n                class=\"btn btn-tertiary cx-saved-cart-make-active\"\n                (click)=\"openDialog($event, savedCart)\"\n              >\n                {{ 'savedCartList.makeCartActive' | cxTranslate }}\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </ng-container>\n\n    <!-- NO SAVED CART CONTAINER -->\n    <ng-template #noSavedCarts>\n      <div class=\"cx-saved-cart-list-no-saved-carts row\">\n        <div class=\"col-sm-12 col-md-6 col-lg-4\">\n          <div>{{ 'savedCartList.notFound' | cxTranslate }}</div>\n        </div>\n      </div>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #loading>\n    <div class=\"cx-spinner\">\n      <cx-spinner></cx-spinner>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2.RoutingService }, { type: i2$1.SavedCartFacade }, { type: i0.ViewContainerRef }, { type: i3$1.LaunchDialogService }]; }, propDecorators: { restoreButton: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartListModule {
}
SavedCartListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, declarations: [SavedCartListComponent], imports: [CommonModule,
        UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule,
        SpinnerModule], exports: [SavedCartListComponent] });
SavedCartListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountSavedCartHistoryComponent: {
                    component: SavedCartListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        UrlModule,
        RouterModule,
        ListNavigationModule,
        I18nModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        UrlModule,
                        RouterModule,
                        ListNavigationModule,
                        I18nModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountSavedCartHistoryComponent: {
                                    component: SavedCartListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [SavedCartListComponent],
                    exports: [SavedCartListComponent],
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
class SavedCartOrderEntriesContext {
    constructor(importInfoService, userIdService, multiCartService, savedCartService, routingService) {
        this.importInfoService = importInfoService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.savedCartService = savedCartService;
        this.routingService = routingService;
        this.type = OrderEntriesSource.SAVED_CART;
        this.savedCartId$ = this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params.savedCartId), distinctUntilChanged());
    }
    addEntries(products) {
        return this.add(products).pipe(switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    getEntries() {
        return this.savedCartId$.pipe(switchMap((cartId) => this.savedCartService.get(cartId)), map((cart) => { var _a; return (_a = cart === null || cart === void 0 ? void 0 : cart.entries) !== null && _a !== void 0 ? _a : []; }));
    }
    add(products) {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.savedCartId$,
        ]).pipe(tap(([userId, cartId]) => this.multiCartService.addEntries(userId, cartId, products)), map(([_userId, cartId]) => cartId));
    }
}
SavedCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOrderEntriesContext, deps: [{ token: i1.ProductImportInfoService }, { token: i2.UserIdService }, { token: i3.MultiCartFacade }, { token: i2$1.SavedCartFacade }, { token: i2.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductImportInfoService }, { type: i2.UserIdService }, { type: i3.MultiCartFacade }, { type: i2$1.SavedCartFacade }, { type: i2.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class NewSavedCartOrderEntriesContext {
    constructor(importInfoService, userIdService, multiCartService, savedCartService) {
        this.importInfoService = importInfoService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.savedCartService = savedCartService;
        this.type = OrderEntriesSource.NEW_SAVED_CART;
    }
    addEntries(products, savedCartInfo) {
        return this.add(products, savedCartInfo).pipe(tap((cartId) => {
            this.importInfoService
                .getResults(cartId)
                .pipe(take(products.length), every((productInfo) => productInfo.statusCode ===
                ProductImportStatus.UNKNOWN_IDENTIFIER ||
                productInfo.statusCode === ProductImportStatus.UNKNOWN_ERROR))
                .subscribe((isInvalid) => {
                if (isInvalid) {
                    this.savedCartService.deleteSavedCart(cartId);
                }
            });
        }), switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    add(products, savedCartInfo) {
        return this.userIdService.takeUserId().pipe(switchMap((userId) => this.multiCartService
            .createCart({
            userId,
            extraData: { active: false },
        })
            .pipe(map((cart) => cart.code), tap((cartId) => {
            this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo === null || savedCartInfo === void 0 ? void 0 : savedCartInfo.name,
                saveCartDescription: savedCartInfo === null || savedCartInfo === void 0 ? void 0 : savedCartInfo.description,
            });
            this.savedCartService.loadSavedCarts();
        }), observeOn(queueScheduler), debounce(() => this.savedCartService
            .getSaveCartProcessLoading()
            .pipe(filter((loading) => !loading))), tap((cartId) => this.multiCartService.addEntries(userId, cartId, products)))));
    }
}
NewSavedCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NewSavedCartOrderEntriesContext, deps: [{ token: i1.ProductImportInfoService }, { token: i2.UserIdService }, { token: i3.MultiCartFacade }, { token: i2$1.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
NewSavedCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NewSavedCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NewSavedCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductImportInfoService }, { type: i2.UserIdService }, { type: i3.MultiCartFacade }, { type: i2$1.SavedCartFacade }]; } });

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
class SavedCartFormDialogComponent {
    get descriptionsCharacterLeft() {
        var _a, _b;
        return (this.descriptionMaxLength -
            (((_b = (_a = this.form.get('description')) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length) || 0));
    }
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    constructor(launchDialogService, el, savedCartService, eventService, routingService, globalMessageService) {
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.savedCartService = savedCartService;
        this.eventService = eventService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.subscription = new Subscription();
        this.savedCartFormType = SavedCartFormType;
        this.iconTypes = ICON_TYPE;
        this.descriptionMaxLength = 250;
        this.nameMaxLength = 50;
        this.isCloneSavedCart = false;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    ngOnInit() {
        this.resetSavedCartStates();
        this.isLoading$ = this.savedCartService.getSaveCartProcessLoading();
        this.isDisableDeleteButton$ = merge(this.eventService.get(DeleteCartEvent).pipe(take(1), map(() => true)), this.eventService.get(DeleteCartFailEvent).pipe(take(1), map(() => false)));
        this.isDisableRestoreButton$ = combineLatest([
            this.savedCartService.getCloneSavedCartProcessLoading(),
            this.savedCartService.getRestoreSavedCartProcessLoading(),
        ]).pipe(map(([isCloneLoading, isRestoreLoading]) => isCloneLoading || isRestoreLoading));
        this.subscription.add(this.launchDialogService.data$.subscribe((data) => {
            this.cart = data.cart;
            this.layoutOption = data.layoutOption;
            this.build(this.cart);
        }));
        this.subscription.add(this.savedCartService
            .getSaveCartProcessSuccess()
            .subscribe((success) => this.onComplete(success)));
        this.subscription.add(this.eventService
            .get(DeleteCartSuccessEvent)
            .pipe(take(1), map(() => true))
            .subscribe((success) => this.onComplete(success)));
        this.subscription.add(this.savedCartService
            .getRestoreSavedCartProcessSuccess()
            .subscribe((success) => this.onComplete(success)));
    }
    saveOrEditCart(cartId) {
        var _a, _b;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(this.form);
        }
        else {
            const name = (_a = this.form.get('name')) === null || _a === void 0 ? void 0 : _a.value;
            // TODO(#12660): Remove default value once backend is updated
            const description = ((_b = this.form.get('description')) === null || _b === void 0 ? void 0 : _b.value) || '-';
            switch (this.layoutOption) {
                case SavedCartFormType.SAVE: {
                    this.savedCartService.saveCart({
                        cartId,
                        saveCartName: name,
                        saveCartDescription: description,
                    });
                    break;
                }
                case SavedCartFormType.EDIT: {
                    this.savedCartService.editSavedCart({
                        cartId,
                        saveCartName: name,
                        saveCartDescription: description,
                    });
                    break;
                }
            }
        }
    }
    deleteCart(cartId) {
        this.savedCartService.deleteSavedCart(cartId);
    }
    restoreSavedCart(cartId) {
        var _a;
        if (this.isCloneSavedCart) {
            this.savedCartService.cloneSavedCart(cartId, (_a = this.form.get('cloneName')) === null || _a === void 0 ? void 0 : _a.value);
        }
        else {
            this.savedCartService.restoreSavedCart(cartId);
        }
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    onComplete(success) {
        var _a, _b, _c, _d;
        if (success) {
            switch (this.layoutOption) {
                case SavedCartFormType.DELETE: {
                    this.routingService.go({ cxRoute: 'savedCarts' });
                    this.globalMessageService.add({
                        key: 'savedCartDialog.deleteCartSuccess',
                    }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                    this.close('Successfully deleted a saved cart');
                    break;
                }
                case SavedCartFormType.SAVE: {
                    this.close('Successfully saved cart');
                    this.savedCartService.clearSaveCart();
                    this.globalMessageService.add({
                        key: 'savedCartCartPage.messages.cartSaved',
                        params: {
                            cartName: ((_a = this.form.get('name')) === null || _a === void 0 ? void 0 : _a.value) || ((_b = this.cart) === null || _b === void 0 ? void 0 : _b.code),
                        },
                    }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                    break;
                }
                case SavedCartFormType.EDIT: {
                    this.close('Successfully edited saved cart');
                    this.savedCartService.clearSaveCart();
                    this.globalMessageService.add({
                        key: 'savedCartDialog.editCartSuccess',
                        params: {
                            cartName: ((_c = this.form.get('name')) === null || _c === void 0 ? void 0 : _c.value) || ((_d = this.cart) === null || _d === void 0 ? void 0 : _d.code),
                        },
                    }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                    break;
                }
                case SavedCartFormType.RESTORE: {
                    this.close('Successfully restored saved cart');
                    this.routingService.go({ cxRoute: 'savedCarts' });
                    this.resetSavedCartStates();
                    break;
                }
            }
        }
    }
    toggleIsCloneSavedCart() {
        return (this.isCloneSavedCart = !this.isCloneSavedCart);
    }
    build(cart) {
        const form = new UntypedFormGroup({});
        form.setControl('name', new UntypedFormControl('', [
            Validators.required,
            Validators.maxLength(this.nameMaxLength),
        ]));
        form.setControl('description', new UntypedFormControl('', [
            Validators.maxLength(this.descriptionMaxLength),
        ]));
        form.setControl('isCloneSavedCart', new UntypedFormControl(''));
        form.setControl('cloneName', new UntypedFormControl(''));
        this.form = form;
        this.patchData(cart);
    }
    patchData(item) {
        this.form.patchValue(Object.assign({}, item));
    }
    resetSavedCartStates() {
        this.savedCartService.clearCloneSavedCart();
        this.savedCartService.clearSaveCart();
        this.savedCartService.clearRestoreSavedCart();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this.close('close dialog');
    }
}
SavedCartFormDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFormDialogComponent, deps: [{ token: i3$1.LaunchDialogService }, { token: i0.ElementRef }, { token: i2$1.SavedCartFacade }, { token: i2.EventService }, { token: i2.RoutingService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
SavedCartFormDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SavedCartFormDialogComponent, selector: "cx-saved-cart-form-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"cart\">\n  <div\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"close('Escape clicked')\"\n    class=\"cx-saved-cart-form-dialog\"\n  >\n    <form [formGroup]=\"form\" class=\"cx-saved-cart-form-container\">\n      <!-- Modal Header -->\n      <div class=\"modal-header cx-saved-cart-form-header\">\n        <ng-container [ngSwitch]=\"layoutOption\">\n          <div class=\"cx-saved-cart-form-title modal-title\">\n            <ng-container *ngSwitchCase=\"savedCartFormType.EDIT\">\n              {{ 'savedCartDialog.editSavedCart' | cxTranslate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"savedCartFormType.DELETE\">\n              {{ 'savedCartDialog.deleteSavedCart' | cxTranslate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"savedCartFormType.SAVE\">\n              {{ 'savedCartDialog.saveForLater' | cxTranslate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"savedCartFormType.RESTORE\">\n              {{ 'savedCartDialog.restoreSavedCart' | cxTranslate }}\n            </ng-container>\n          </div>\n        </ng-container>\n\n        <button\n          (click)=\"close('Close Save Cart Dialog')\"\n          [disabled]=\"isLoading$ | async\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          class=\"cx-saved-cart-form-close close\"\n          type=\"button\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <!-- Modal Body -->\n      <div class=\"cx-saved-cart-form-body\">\n        <!-- start DELETE and RESTORE form -->\n        <ng-container\n          *ngIf=\"\n            layoutOption === savedCartFormType.DELETE ||\n              layoutOption === savedCartFormType.RESTORE;\n            else saveAndEditCart\n          \"\n        >\n          <p class=\"cx-saved-cart-form-subtitle\">\n            {{\n              (layoutOption === savedCartFormType.DELETE\n                ? 'savedCartDialog.followingCartDelete'\n                : 'savedCartDialog.followingCartRestore'\n              ) | cxTranslate\n            }}\n          </p>\n\n          <div class=\"cx-saved-cart-form-row\">\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.name' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.name }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.id' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.code }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.description' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.description }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.quantity' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.totalUnitCount }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.total' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.totalPriceWithTax?.formattedValue }}\n              </div>\n            </div>\n          </div>\n\n          <ng-container *ngIf=\"layoutOption === savedCartFormType.RESTORE\">\n            <div class=\"cx-copy-saved-cart-row form-check\">\n              <input\n                id=\"cx-copy-saved-cart\"\n                type=\"checkbox\"\n                class=\"cx-copy-saved-cart-input\"\n                [checked]=\"isCloneSavedCart\"\n                (change)=\"toggleIsCloneSavedCart()\"\n              />\n              <label\n                for=\"cx-copy-saved-cart\"\n                class=\"cx-copy-saved-cart-label\"\n                >{{ 'savedCartDialog.keepCopySavedCart' | cxTranslate }}</label\n              >\n            </div>\n\n            <div *ngIf=\"isCloneSavedCart\" class=\"cx-copy-saved-cart-row\">\n              <label>\n                <span class=\"label-content\">\n                  {{ 'savedCartDialog.nameOfCloneCart' | cxTranslate }}\n                </span>\n\n                <input\n                  [maxLength]=\"nameMaxLength\"\n                  class=\"form-control\"\n                  formControlName=\"cloneName\"\n                  type=\"text\"\n                  placeholder=\"{{\n                    'savedCartDialog.defaultCloneCartName'\n                      | cxTranslate: { name: form.get('name')?.value }\n                  }}\"\n                />\n              </label>\n            </div>\n          </ng-container>\n\n          <div class=\"cx-saved-cart-form-footer\">\n            <button\n              (click)=\"close('Close Save Cart Dialog')\"\n              [attr.aria-label]=\"'common.close' | cxTranslate\"\n              class=\"mr-2 btn btn-secondary\"\n              type=\"button\"\n            >\n              {{ 'savedCartDialog.cancel' | cxTranslate }}\n            </button>\n\n            <ng-container\n              *ngIf=\"\n                layoutOption === savedCartFormType.DELETE;\n                else isRestoreSavedCart\n              \"\n            >\n              <button\n                *ngIf=\"cart.code\"\n                (click)=\"deleteCart(cart.code)\"\n                [attr.aria-label]=\"'common.delete' | cxTranslate\"\n                [disabled]=\"isDisableDeleteButton$ | async\"\n                class=\"ml-2 btn btn-primary\"\n                type=\"button\"\n              >\n                {{ 'savedCartDialog.delete' | cxTranslate }}\n              </button>\n            </ng-container>\n\n            <ng-template #isRestoreSavedCart>\n              <button\n                *ngIf=\"cart.code\"\n                (click)=\"restoreSavedCart(cart.code)\"\n                [disabled]=\"isDisableRestoreButton$ | async\"\n                [attr.aria-label]=\"'common.restore' | cxTranslate\"\n                class=\"ml-2 btn btn-primary\"\n                type=\"button\"\n              >\n                {{ 'savedCartDialog.restore' | cxTranslate }}\n              </button>\n            </ng-template>\n          </div>\n        </ng-container>\n        <!-- end DELETE form -->\n\n        <!-- start SAVE and EDIT form -->\n        <ng-template #saveAndEditCart>\n          <ng-container *ngIf=\"layoutOption === savedCartFormType.SAVE\">\n            <p class=\"cx-saved-cart-form-subtitle\">\n              {{ 'savedCartDialog.itemsSavedForLater' | cxTranslate }}\n            </p>\n          </ng-container>\n\n          <div class=\"cx-saved-cart-form-row\">\n            <ng-container>\n              <label>\n                <span class=\"cx-saved-carts-label label-content\">{{\n                  'savedCartDialog.savedCartName' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  [maxLength]=\"nameMaxLength\"\n                  class=\"form-control\"\n                  formControlName=\"name\"\n                  required\n                  type=\"text\"\n                />\n                <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n              </label>\n            </ng-container>\n          </div>\n\n          <div class=\"cx-saved-cart-form-row\">\n            <label>\n              <span class=\"cx-saved-carts-label label-content\"\n                >{{ 'savedCartDialog.savedCartDescription' | cxTranslate }}\n                <span class=\"cx-saved-carts-label-optional\">\n                  ({{ 'savedCartDialog.optional' | cxTranslate }})\n                </span></span\n              >\n              <textarea\n                [maxLength]=\"descriptionMaxLength\"\n                class=\"form-control\"\n                formControlName=\"description\"\n                rows=\"5\"\n              ></textarea>\n              <cx-form-errors\n                [control]=\"form.get('description')\"\n              ></cx-form-errors>\n\n              <p class=\"cx-saved-carts-input-hint\">\n                {{\n                  'savedCartDialog.charactersLeft'\n                    | cxTranslate: { count: descriptionsCharacterLeft }\n                }}\n              </p>\n            </label>\n          </div>\n          <div class=\"cx-saved-cart-form-footer\">\n            <button\n              (click)=\"close('Close Save Cart Dialog')\"\n              [attr.aria-label]=\"'common.close' | cxTranslate\"\n              [disabled]=\"isLoading$ | async\"\n              class=\"btn btn-secondary\"\n              type=\"button\"\n            >\n              {{ 'savedCartDialog.cancel' | cxTranslate }}\n            </button>\n            <button\n              (click)=\"saveOrEditCart(cart?.code)\"\n              [attr.aria-label]=\"'common.save' | cxTranslate\"\n              [disabled]=\"isLoading$ | async\"\n              class=\"btn btn-primary\"\n              type=\"button\"\n            >\n              {{ 'savedCartDialog.save' | cxTranslate }}\n            </button>\n          </div>\n        </ng-template>\n        <!-- end SAVE and EDIT form -->\n      </div>\n    </form>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i5$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i5$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i5$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3$1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i3$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3$1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFormDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-saved-cart-form-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart\">\n  <div\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"close('Escape clicked')\"\n    class=\"cx-saved-cart-form-dialog\"\n  >\n    <form [formGroup]=\"form\" class=\"cx-saved-cart-form-container\">\n      <!-- Modal Header -->\n      <div class=\"modal-header cx-saved-cart-form-header\">\n        <ng-container [ngSwitch]=\"layoutOption\">\n          <div class=\"cx-saved-cart-form-title modal-title\">\n            <ng-container *ngSwitchCase=\"savedCartFormType.EDIT\">\n              {{ 'savedCartDialog.editSavedCart' | cxTranslate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"savedCartFormType.DELETE\">\n              {{ 'savedCartDialog.deleteSavedCart' | cxTranslate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"savedCartFormType.SAVE\">\n              {{ 'savedCartDialog.saveForLater' | cxTranslate }}\n            </ng-container>\n            <ng-container *ngSwitchCase=\"savedCartFormType.RESTORE\">\n              {{ 'savedCartDialog.restoreSavedCart' | cxTranslate }}\n            </ng-container>\n          </div>\n        </ng-container>\n\n        <button\n          (click)=\"close('Close Save Cart Dialog')\"\n          [disabled]=\"isLoading$ | async\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          class=\"cx-saved-cart-form-close close\"\n          type=\"button\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <!-- Modal Body -->\n      <div class=\"cx-saved-cart-form-body\">\n        <!-- start DELETE and RESTORE form -->\n        <ng-container\n          *ngIf=\"\n            layoutOption === savedCartFormType.DELETE ||\n              layoutOption === savedCartFormType.RESTORE;\n            else saveAndEditCart\n          \"\n        >\n          <p class=\"cx-saved-cart-form-subtitle\">\n            {{\n              (layoutOption === savedCartFormType.DELETE\n                ? 'savedCartDialog.followingCartDelete'\n                : 'savedCartDialog.followingCartRestore'\n              ) | cxTranslate\n            }}\n          </p>\n\n          <div class=\"cx-saved-cart-form-row\">\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.name' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.name }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.id' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.code }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.description' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.description }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.quantity' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.totalUnitCount }}\n              </div>\n            </div>\n\n            <div class=\"cx-saved-cart-values-container\">\n              <div class=\"cx-saved-cart-label\">\n                {{ 'savedCartDialog.total' | cxTranslate }}\n              </div>\n              <div class=\"cx-saved-cart-value\">\n                {{ cart?.totalPriceWithTax?.formattedValue }}\n              </div>\n            </div>\n          </div>\n\n          <ng-container *ngIf=\"layoutOption === savedCartFormType.RESTORE\">\n            <div class=\"cx-copy-saved-cart-row form-check\">\n              <input\n                id=\"cx-copy-saved-cart\"\n                type=\"checkbox\"\n                class=\"cx-copy-saved-cart-input\"\n                [checked]=\"isCloneSavedCart\"\n                (change)=\"toggleIsCloneSavedCart()\"\n              />\n              <label\n                for=\"cx-copy-saved-cart\"\n                class=\"cx-copy-saved-cart-label\"\n                >{{ 'savedCartDialog.keepCopySavedCart' | cxTranslate }}</label\n              >\n            </div>\n\n            <div *ngIf=\"isCloneSavedCart\" class=\"cx-copy-saved-cart-row\">\n              <label>\n                <span class=\"label-content\">\n                  {{ 'savedCartDialog.nameOfCloneCart' | cxTranslate }}\n                </span>\n\n                <input\n                  [maxLength]=\"nameMaxLength\"\n                  class=\"form-control\"\n                  formControlName=\"cloneName\"\n                  type=\"text\"\n                  placeholder=\"{{\n                    'savedCartDialog.defaultCloneCartName'\n                      | cxTranslate: { name: form.get('name')?.value }\n                  }}\"\n                />\n              </label>\n            </div>\n          </ng-container>\n\n          <div class=\"cx-saved-cart-form-footer\">\n            <button\n              (click)=\"close('Close Save Cart Dialog')\"\n              [attr.aria-label]=\"'common.close' | cxTranslate\"\n              class=\"mr-2 btn btn-secondary\"\n              type=\"button\"\n            >\n              {{ 'savedCartDialog.cancel' | cxTranslate }}\n            </button>\n\n            <ng-container\n              *ngIf=\"\n                layoutOption === savedCartFormType.DELETE;\n                else isRestoreSavedCart\n              \"\n            >\n              <button\n                *ngIf=\"cart.code\"\n                (click)=\"deleteCart(cart.code)\"\n                [attr.aria-label]=\"'common.delete' | cxTranslate\"\n                [disabled]=\"isDisableDeleteButton$ | async\"\n                class=\"ml-2 btn btn-primary\"\n                type=\"button\"\n              >\n                {{ 'savedCartDialog.delete' | cxTranslate }}\n              </button>\n            </ng-container>\n\n            <ng-template #isRestoreSavedCart>\n              <button\n                *ngIf=\"cart.code\"\n                (click)=\"restoreSavedCart(cart.code)\"\n                [disabled]=\"isDisableRestoreButton$ | async\"\n                [attr.aria-label]=\"'common.restore' | cxTranslate\"\n                class=\"ml-2 btn btn-primary\"\n                type=\"button\"\n              >\n                {{ 'savedCartDialog.restore' | cxTranslate }}\n              </button>\n            </ng-template>\n          </div>\n        </ng-container>\n        <!-- end DELETE form -->\n\n        <!-- start SAVE and EDIT form -->\n        <ng-template #saveAndEditCart>\n          <ng-container *ngIf=\"layoutOption === savedCartFormType.SAVE\">\n            <p class=\"cx-saved-cart-form-subtitle\">\n              {{ 'savedCartDialog.itemsSavedForLater' | cxTranslate }}\n            </p>\n          </ng-container>\n\n          <div class=\"cx-saved-cart-form-row\">\n            <ng-container>\n              <label>\n                <span class=\"cx-saved-carts-label label-content\">{{\n                  'savedCartDialog.savedCartName' | cxTranslate\n                }}</span>\n                <input\n                  required=\"true\"\n                  [maxLength]=\"nameMaxLength\"\n                  class=\"form-control\"\n                  formControlName=\"name\"\n                  required\n                  type=\"text\"\n                />\n                <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n              </label>\n            </ng-container>\n          </div>\n\n          <div class=\"cx-saved-cart-form-row\">\n            <label>\n              <span class=\"cx-saved-carts-label label-content\"\n                >{{ 'savedCartDialog.savedCartDescription' | cxTranslate }}\n                <span class=\"cx-saved-carts-label-optional\">\n                  ({{ 'savedCartDialog.optional' | cxTranslate }})\n                </span></span\n              >\n              <textarea\n                [maxLength]=\"descriptionMaxLength\"\n                class=\"form-control\"\n                formControlName=\"description\"\n                rows=\"5\"\n              ></textarea>\n              <cx-form-errors\n                [control]=\"form.get('description')\"\n              ></cx-form-errors>\n\n              <p class=\"cx-saved-carts-input-hint\">\n                {{\n                  'savedCartDialog.charactersLeft'\n                    | cxTranslate: { count: descriptionsCharacterLeft }\n                }}\n              </p>\n            </label>\n          </div>\n          <div class=\"cx-saved-cart-form-footer\">\n            <button\n              (click)=\"close('Close Save Cart Dialog')\"\n              [attr.aria-label]=\"'common.close' | cxTranslate\"\n              [disabled]=\"isLoading$ | async\"\n              class=\"btn btn-secondary\"\n              type=\"button\"\n            >\n              {{ 'savedCartDialog.cancel' | cxTranslate }}\n            </button>\n            <button\n              (click)=\"saveOrEditCart(cart?.code)\"\n              [attr.aria-label]=\"'common.save' | cxTranslate\"\n              [disabled]=\"isLoading$ | async\"\n              class=\"btn btn-primary\"\n              type=\"button\"\n            >\n              {{ 'savedCartDialog.save' | cxTranslate }}\n            </button>\n          </div>\n        </ng-template>\n        <!-- end SAVE and EDIT form -->\n      </div>\n    </form>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i3$1.LaunchDialogService }, { type: i0.ElementRef }, { type: i2$1.SavedCartFacade }, { type: i2.EventService }, { type: i2.RoutingService }, { type: i2.GlobalMessageService }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSavedCartFormLayoutConfig = {
    launch: {
        SAVED_CART: {
            inline: true,
            component: SavedCartFormDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartFormDialogModule {
}
SavedCartFormDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFormDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartFormDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFormDialogModule, declarations: [SavedCartFormDialogComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule], exports: [SavedCartFormDialogComponent] });
SavedCartFormDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFormDialogModule, imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormErrorsModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFormDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [SavedCartFormDialogComponent],
                    exports: [SavedCartFormDialogComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartComponentsModule {
}
SavedCartComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, imports: [RouterModule,
        AddToSavedCartModule,
        SavedCartFormDialogModule,
        SavedCartListModule,
        SavedCartDetailsModule] });
SavedCartComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, providers: [
        {
            provide: SavedCartOrderEntriesContextToken,
            useExisting: SavedCartOrderEntriesContext,
        },
        {
            provide: NewSavedCartOrderEntriesContextToken,
            useExisting: NewSavedCartOrderEntriesContext,
        },
        provideDefaultConfig(defaultSavedCartFormLayoutConfig),
    ], imports: [RouterModule,
        AddToSavedCartModule,
        SavedCartFormDialogModule,
        SavedCartListModule,
        SavedCartDetailsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        AddToSavedCartModule,
                        SavedCartFormDialogModule,
                        SavedCartListModule,
                        SavedCartDetailsModule,
                    ],
                    providers: [
                        {
                            provide: SavedCartOrderEntriesContextToken,
                            useExisting: SavedCartOrderEntriesContext,
                        },
                        {
                            provide: NewSavedCartOrderEntriesContextToken,
                            useExisting: NewSavedCartOrderEntriesContext,
                        },
                        provideDefaultConfig(defaultSavedCartFormLayoutConfig),
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

export { AddToSavedCartComponent, AddToSavedCartModule, NewSavedCartOrderEntriesContext, SavedCartComponentsModule, SavedCartDetailsActionComponent, SavedCartDetailsItemsComponent, SavedCartDetailsModule, SavedCartDetailsOverviewComponent, SavedCartDetailsService, SavedCartFormDialogComponent, SavedCartFormDialogModule, SavedCartListComponent, SavedCartListModule, SavedCartOrderEntriesContext, defaultSavedCartFormLayoutConfig };
//# sourceMappingURL=spartacus-cart-saved-cart-components.mjs.map
