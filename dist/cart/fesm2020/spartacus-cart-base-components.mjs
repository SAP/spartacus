import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, Input, HostListener, NgModule, Optional, ComponentRef, ViewChild } from '@angular/core';
import * as i1$1 from '@spartacus/cart/base/root';
import { CartUiEventAddToCart, CartAddEntryFailEvent, PromotionLocation, CartOutlets, CartItemContext, DeleteCartSuccessEvent, DeleteCartFailEvent, CartValidationStatusCode, OrderEntriesSource, ActiveCartOrderEntriesContextToken } from '@spartacus/cart/base/root';
import { Subscription, ReplaySubject, combineLatest, merge, of } from 'rxjs';
import { take, map, filter, switchMap, startWith, tap, shareReplay, withLatestFrom } from 'rxjs/operators';
import * as i2 from '@spartacus/core';
import { I18nModule, provideDefaultConfig, UrlModule, isNotNullable, GlobalMessageType } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { ICON_TYPE, IconModule, FormErrorsModule, ItemCounterModule, OutletModule, AtMessageModule, MediaModule, PromotionsModule, provideOutlet, DIALOG_TYPE, SpinnerModule, KeyboardFocusModule, ProgressButtonModule, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import * as i2$1 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$2 from '@angular/router';
import { RouterModule, NavigationEnd, NavigationCancel } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i3 from '@spartacus/cart/base/core';
import { isEmpty } from '@spartacus/cart/base/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddedToCartDialogEventListener {
    constructor(eventService, launchDialogService) {
        this.eventService = eventService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.onAddToCart();
    }
    onAddToCart() {
        this.subscription.add(this.eventService.get(CartUiEventAddToCart).subscribe((event) => {
            this.openModal(event);
        }));
        this.subscription.add(this.eventService.get(CartAddEntryFailEvent).subscribe((event) => {
            this.closeModal(event);
        }));
    }
    openModal(event) {
        const addToCartData = {
            productCode: event.productCode,
            quantity: event.quantity,
            numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
            pickupStoreName: event.pickupStoreName,
        };
        const dialog = this.launchDialogService.openDialog("ADDED_TO_CART" /* LAUNCH_CALLER.ADDED_TO_CART */, undefined, undefined, addToCartData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
AddedToCartDialogEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogEventListener, deps: [{ token: i2.EventService }, { token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
AddedToCartDialogEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.EventService }, { type: i1.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Context source for `CartItemComponent`.
 *
 * `CartItemContext` should be injected instead in child components.
 */
class CartItemContextSource {
    constructor() {
        this.compact$ = new ReplaySubject(1);
        this.readonly$ = new ReplaySubject(1);
        this.item$ = new ReplaySubject(1);
        this.quantityControl$ = new ReplaySubject(1);
        this.location$ = new ReplaySubject(1);
        this.options$ = new ReplaySubject(1);
    }
}
CartItemContextSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContextSource, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartItemContextSource.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContextSource });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemContextSource, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartItemValidationWarningComponent {
    constructor(cartValidationFacade) {
        this.cartValidationFacade = cartValidationFacade;
        this.iconTypes = ICON_TYPE;
        this.isVisible = true;
        this.cartModification$ = this.cartValidationFacade
            .getValidationResults()
            .pipe(map((modificationList) => modificationList.find((modification) => modification.entry?.product?.code === this.code)));
    }
}
CartItemValidationWarningComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemValidationWarningComponent, deps: [{ token: i1$1.CartValidationFacade }], target: i0.ɵɵFactoryTarget.Component });
CartItemValidationWarningComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartItemValidationWarningComponent, selector: "cx-cart-item-validation-warning", inputs: { code: "code" }, ngImport: i0, template: "<ng-container *ngIf=\"cartModification$ | async as cartModification\">\n  <div class=\"alert alert-info\" *ngIf=\"isVisible\">\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    </span>\n    <span>\n      {{\n        'validation.' + cartModification.statusCode\n          | cxTranslate\n            : {\n                quantity: cartModification.quantityAdded\n              }\n      }}\n    </span>\n\n    <button class=\"close\" type=\"button\" (click)=\"isVisible = !isVisible\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemValidationWarningComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-item-validation-warning', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cartModification$ | async as cartModification\">\n  <div class=\"alert alert-info\" *ngIf=\"isVisible\">\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    </span>\n    <span>\n      {{\n        'validation.' + cartModification.statusCode\n          | cxTranslate\n            : {\n                quantity: cartModification.quantityAdded\n              }\n      }}\n    </span>\n\n    <button class=\"close\" type=\"button\" (click)=\"isVisible = !isVisible\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CartValidationFacade }]; }, propDecorators: { code: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartItemComponent {
    constructor(cartItemContextSource) {
        this.cartItemContextSource = cartItemContextSource;
        this.compact = false;
        this.readonly = false;
        this.promotionLocation = PromotionLocation.ActiveCart;
        // TODO: evaluate whether this is generic enough
        this.options = {
            isSaveForLater: false,
            optionalBtn: null,
            displayAddToCart: false,
        };
        this.iconTypes = ICON_TYPE;
        this.CartOutlets = CartOutlets;
    }
    ngOnChanges(changes) {
        if (changes?.compact) {
            this.cartItemContextSource.compact$.next(this.compact);
        }
        if (changes?.readonly) {
            this.cartItemContextSource.readonly$.next(this.readonly);
        }
        if (changes?.item) {
            this.cartItemContextSource.item$.next(this.item);
        }
        if (changes?.quantityControl) {
            this.cartItemContextSource.quantityControl$.next(this.quantityControl);
        }
        if (changes?.promotionLocation) {
            this.cartItemContextSource.location$.next(this.promotionLocation);
        }
        if (changes?.options) {
            this.cartItemContextSource.options$.next(this.options);
        }
    }
    isProductOutOfStock(product) {
        // TODO Move stocklevelstatuses across the app to an enum
        return (product &&
            product.stock &&
            product.stock.stockLevelStatus === 'outOfStock');
    }
    removeItem() {
        this.quantityControl.setValue(0);
        this.quantityControl.markAsDirty();
    }
}
CartItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemComponent, deps: [{ token: CartItemContextSource }], target: i0.ɵɵFactoryTarget.Component });
CartItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartItemComponent, selector: "cx-cart-item", inputs: { compact: "compact", item: "item", readonly: "readonly", quantityControl: "quantityControl", promotionLocation: "promotionLocation", options: "options" }, providers: [
        CartItemContextSource,
        { provide: CartItemContext, useExisting: CartItemContextSource },
    ], usesOnChanges: true, ngImport: i0, template: "<!-- Item Start Outlet -->\n<ng-template [cxOutlet]=\"CartOutlets.ITEM\">\n  <ng-template [cxOutlet]=\"CartOutlets.ITEM_CONFIGURATOR_ISSUES\"></ng-template>\n  <cx-cart-item-validation-warning\n    [code]=\"item.product?.code\"\n  ></cx-cart-item-validation-warning>\n  <div [ngClass]=\"compact ? 'cx-compact row' : 'row'\">\n    <!-- Item Image -->\n    <div class=\"col-2 cx-image-container\">\n      <a\n        [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n        tabindex=\"0\"\n      >\n        <cx-media\n          [container]=\"item.product?.images?.PRIMARY\"\n          format=\"cartIcon\"\n        ></cx-media>\n      </a>\n    </div>\n    <!-- Item Information -->\n    <div class=\"cx-info col-10\">\n      <div class=\"cx-info-container row\">\n        <!-- Item Description -->\n        <div [ngClass]=\"compact ? '' : ' col-md-3 col-lg-3 col-xl-5'\">\n          <div *ngIf=\"item.product?.name\" class=\"cx-name\">\n            <a\n              class=\"cx-link\"\n              [routerLink]=\"\n                { cxRoute: 'product', params: item.product } | cxUrl\n              \"\n              ><h3>{{ item.product?.name }}</h3></a\n            >\n          </div>\n          <div *ngIf=\"item.product?.code\" class=\"cx-code\">\n            {{ 'cartItems.id' | cxTranslate }} {{ item.product?.code }}\n          </div>\n\n          <!-- Item Details Outlet -->\n          <ng-template [cxOutlet]=\"CartOutlets.ITEM_DETAILS\"> </ng-template>\n\n          <!-- Variants -->\n          <ng-container *ngIf=\"item.product?.baseOptions?.length\">\n            <div\n              *ngFor=\"\n                let variant of item.product?.baseOptions[0]?.selected\n                  ?.variantOptionQualifiers\n              \"\n              class=\"cx-property\"\n            >\n              <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n                {{ variant.name }}: {{ variant.value }}\n              </div>\n            </div>\n          </ng-container>\n        </div>\n        <!-- Item Price -->\n        <div\n          *ngIf=\"item.basePrice\"\n          class=\"cx-price\"\n          [ngClass]=\"compact ? '' : ' col-md-3 col-lg-3 col-xl-2'\"\n        >\n          <div\n            class=\"cx-label\"\n            [ngClass]=\"compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\"\n          >\n            {{ 'cartItems.itemPrice' | cxTranslate }}\n          </div>\n          <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </div>\n        <!-- Item Quantity -->\n        <div class=\"cx-quantity\" [ngClass]=\"compact ? '' : ' col-3'\">\n          <div\n            class=\"cx-label\"\n            [ngClass]=\"compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\"\n            placement=\"left\"\n            title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n          >\n            {{ 'cartItems.quantity' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\" [class.readonly-value]=\"readonly\">\n            <cx-item-counter\n              [control]=\"quantityControl\"\n              [readonly]=\"\n                !item.updateable || readonly || options.isSaveForLater\n              \"\n              [max]=\"item.product?.stock?.stockLevel\"\n              [allowZero]=\"true\"\n            >\n            </cx-item-counter>\n          </div>\n        </div>\n        <!-- Total -->\n        <ng-container *ngIf=\"options.isSaveForLater; else total\">\n          <div\n            class=\"cx-total\"\n            [ngClass]=\"compact ? '' : ' col-md-3 col-lg-3 col-xl-2'\"\n          >\n            <div\n              class=\"cx-label\"\n              [ngClass]=\"\n                compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\n              \"\n            >\n              {{ 'saveForLaterItems.stock' | cxTranslate }}\n            </div>\n            <div\n              *ngIf=\"item.product?.stock.stockLevel >= 0; else forceInstock\"\n              class=\"cx-value\"\n            >\n              {{ item.product?.stock?.stockLevel }}\n            </div>\n            <ng-template #forceInstock>\n              <div class=\"cx-value\">\n                {{ 'saveForLaterItems.forceInStock' | cxTranslate }}\n              </div>\n            </ng-template>\n          </div>\n        </ng-container>\n      </div>\n      <!-- Availability -->\n      <div\n        *ngIf=\"isProductOutOfStock(item.product)\"\n        class=\"cx-availability col-12\"\n      >\n        {{ 'addToCart.outOfStock' | cxTranslate }}\n      </div>\n\n      <!-- Item Bundle Details Outlet -->\n      <ng-template [cxOutlet]=\"CartOutlets.ITEM_BUNDLE_DETAILS\"> </ng-template>\n\n      <!-- Promotion -->\n\n      <cx-promotions [promotions]=\"item.promotions\"></cx-promotions>\n\n      <!-- Actions -->\n      <div\n        *ngIf=\"(!readonly || options.isSaveForLater) && item.updateable\"\n        class=\"cx-actions col-12\"\n      >\n        <ng-container *ngIf=\"!isProductOutOfStock(item.product)\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              options.optionalBtn;\n              context: {\n                $implicit: { loading: quantityControl.disabled, item: item }\n              }\n            \"\n          ></ng-container>\n        </ng-container>\n\n        <div class=\"col-md-3 cx-remove-btn\">\n          <button\n            (click)=\"removeItem()\"\n            [cxAtMessage]=\"'cartItems.itemRemoved' | cxTranslate\"\n            [disabled]=\"quantityControl.disabled\"\n            attr.aria-label=\"{{ 'addToCart.removeFromCart' | cxTranslate }}\"\n            class=\"btn btn-tertiary\"\n          >\n            {{ 'common.remove' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #total>\n    <div\n      *ngIf=\"item.totalPrice\"\n      class=\"cx-total\"\n      [ngClass]=\"compact ? '' : ' col-md-3 col-xl-2'\"\n    >\n      <div\n        class=\"cx-label\"\n        [ngClass]=\"compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\"\n      >\n        {{ 'cartItems.total' | cxTranslate }}\n      </div>\n      <div class=\"cx-value\">{{ item.totalPrice.formattedValue }}</div>\n    </div>\n  </ng-template>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1.AtMessageDirective, selector: "[cxAtMessage]", inputs: ["cxAtMessage"] }, { kind: "component", type: CartItemValidationWarningComponent, selector: "cx-cart-item-validation-warning", inputs: ["code"] }, { kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: i1.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "directive", type: i1$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-item', providers: [
                        CartItemContextSource,
                        { provide: CartItemContext, useExisting: CartItemContextSource },
                    ], template: "<!-- Item Start Outlet -->\n<ng-template [cxOutlet]=\"CartOutlets.ITEM\">\n  <ng-template [cxOutlet]=\"CartOutlets.ITEM_CONFIGURATOR_ISSUES\"></ng-template>\n  <cx-cart-item-validation-warning\n    [code]=\"item.product?.code\"\n  ></cx-cart-item-validation-warning>\n  <div [ngClass]=\"compact ? 'cx-compact row' : 'row'\">\n    <!-- Item Image -->\n    <div class=\"col-2 cx-image-container\">\n      <a\n        [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n        tabindex=\"0\"\n      >\n        <cx-media\n          [container]=\"item.product?.images?.PRIMARY\"\n          format=\"cartIcon\"\n        ></cx-media>\n      </a>\n    </div>\n    <!-- Item Information -->\n    <div class=\"cx-info col-10\">\n      <div class=\"cx-info-container row\">\n        <!-- Item Description -->\n        <div [ngClass]=\"compact ? '' : ' col-md-3 col-lg-3 col-xl-5'\">\n          <div *ngIf=\"item.product?.name\" class=\"cx-name\">\n            <a\n              class=\"cx-link\"\n              [routerLink]=\"\n                { cxRoute: 'product', params: item.product } | cxUrl\n              \"\n              ><h3>{{ item.product?.name }}</h3></a\n            >\n          </div>\n          <div *ngIf=\"item.product?.code\" class=\"cx-code\">\n            {{ 'cartItems.id' | cxTranslate }} {{ item.product?.code }}\n          </div>\n\n          <!-- Item Details Outlet -->\n          <ng-template [cxOutlet]=\"CartOutlets.ITEM_DETAILS\"> </ng-template>\n\n          <!-- Variants -->\n          <ng-container *ngIf=\"item.product?.baseOptions?.length\">\n            <div\n              *ngFor=\"\n                let variant of item.product?.baseOptions[0]?.selected\n                  ?.variantOptionQualifiers\n              \"\n              class=\"cx-property\"\n            >\n              <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n                {{ variant.name }}: {{ variant.value }}\n              </div>\n            </div>\n          </ng-container>\n        </div>\n        <!-- Item Price -->\n        <div\n          *ngIf=\"item.basePrice\"\n          class=\"cx-price\"\n          [ngClass]=\"compact ? '' : ' col-md-3 col-lg-3 col-xl-2'\"\n        >\n          <div\n            class=\"cx-label\"\n            [ngClass]=\"compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\"\n          >\n            {{ 'cartItems.itemPrice' | cxTranslate }}\n          </div>\n          <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </div>\n        <!-- Item Quantity -->\n        <div class=\"cx-quantity\" [ngClass]=\"compact ? '' : ' col-3'\">\n          <div\n            class=\"cx-label\"\n            [ngClass]=\"compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\"\n            placement=\"left\"\n            title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n          >\n            {{ 'cartItems.quantity' | cxTranslate }}\n          </div>\n          <div class=\"cx-value\" [class.readonly-value]=\"readonly\">\n            <cx-item-counter\n              [control]=\"quantityControl\"\n              [readonly]=\"\n                !item.updateable || readonly || options.isSaveForLater\n              \"\n              [max]=\"item.product?.stock?.stockLevel\"\n              [allowZero]=\"true\"\n            >\n            </cx-item-counter>\n          </div>\n        </div>\n        <!-- Total -->\n        <ng-container *ngIf=\"options.isSaveForLater; else total\">\n          <div\n            class=\"cx-total\"\n            [ngClass]=\"compact ? '' : ' col-md-3 col-lg-3 col-xl-2'\"\n          >\n            <div\n              class=\"cx-label\"\n              [ngClass]=\"\n                compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\n              \"\n            >\n              {{ 'saveForLaterItems.stock' | cxTranslate }}\n            </div>\n            <div\n              *ngIf=\"item.product?.stock.stockLevel >= 0; else forceInstock\"\n              class=\"cx-value\"\n            >\n              {{ item.product?.stock?.stockLevel }}\n            </div>\n            <ng-template #forceInstock>\n              <div class=\"cx-value\">\n                {{ 'saveForLaterItems.forceInStock' | cxTranslate }}\n              </div>\n            </ng-template>\n          </div>\n        </ng-container>\n      </div>\n      <!-- Availability -->\n      <div\n        *ngIf=\"isProductOutOfStock(item.product)\"\n        class=\"cx-availability col-12\"\n      >\n        {{ 'addToCart.outOfStock' | cxTranslate }}\n      </div>\n\n      <!-- Item Bundle Details Outlet -->\n      <ng-template [cxOutlet]=\"CartOutlets.ITEM_BUNDLE_DETAILS\"> </ng-template>\n\n      <!-- Promotion -->\n\n      <cx-promotions [promotions]=\"item.promotions\"></cx-promotions>\n\n      <!-- Actions -->\n      <div\n        *ngIf=\"(!readonly || options.isSaveForLater) && item.updateable\"\n        class=\"cx-actions col-12\"\n      >\n        <ng-container *ngIf=\"!isProductOutOfStock(item.product)\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              options.optionalBtn;\n              context: {\n                $implicit: { loading: quantityControl.disabled, item: item }\n              }\n            \"\n          ></ng-container>\n        </ng-container>\n\n        <div class=\"col-md-3 cx-remove-btn\">\n          <button\n            (click)=\"removeItem()\"\n            [cxAtMessage]=\"'cartItems.itemRemoved' | cxTranslate\"\n            [disabled]=\"quantityControl.disabled\"\n            attr.aria-label=\"{{ 'addToCart.removeFromCart' | cxTranslate }}\"\n            class=\"btn btn-tertiary\"\n          >\n            {{ 'common.remove' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <ng-template #total>\n    <div\n      *ngIf=\"item.totalPrice\"\n      class=\"cx-total\"\n      [ngClass]=\"compact ? '' : ' col-md-3 col-xl-2'\"\n    >\n      <div\n        class=\"cx-label\"\n        [ngClass]=\"compact ? '' : ' d-block d-md-none d-lg-none d-xl-none'\"\n      >\n        {{ 'cartItems.total' | cxTranslate }}\n      </div>\n      <div class=\"cx-value\">{{ item.totalPrice.formattedValue }}</div>\n    </div>\n  </ng-template>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: CartItemContextSource }]; }, propDecorators: { compact: [{
                type: Input
            }], item: [{
                type: Input
            }], readonly: [{
                type: Input
            }], quantityControl: [{
                type: Input
            }], promotionLocation: [{
                type: Input
            }], options: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddedToCartDialogComponent {
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.dismissModal('Cross click');
        }
    }
    constructor(activeCartFacade, launchDialogService, routingService, el) {
        this.activeCartFacade = activeCartFacade;
        this.launchDialogService = launchDialogService;
        this.routingService = routingService;
        this.el = el;
        this.iconTypes = ICON_TYPE;
        this.cart$ = this.activeCartFacade.getActive();
        this.loaded$ = this.activeCartFacade.isStable();
        this.promotionLocation = PromotionLocation.ActiveCart;
        this.quantity = 0;
        this.form = new UntypedFormGroup({});
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe((dialogData) => {
            this.init(dialogData.productCode, dialogData.quantity, dialogData.numberOfEntriesBeforeAdd, dialogData.pickupStoreName);
        }));
        this.subscription.add(this.routingService
            .getRouterState()
            .pipe(filter((state) => !!state.nextState))
            .subscribe(() => this.dismissModal('dismiss')));
    }
    /**
     * Returns an observable formControl with the quantity of the cartEntry,
     * but also updates the entry in case of a changed value.
     * The quantity can be set to zero in order to remove the entry.
     */
    getQuantityControl() {
        if (!this.quantityControl$) {
            this.quantityControl$ = this.entry$.pipe(filter((e) => !!e), map((entry) => this.getQuantityFormControl(entry)), switchMap(() => this.form.valueChanges.pipe(
            // eslint-disable-next-line import/no-deprecated
            startWith(null), tap((valueChange) => {
                if (valueChange) {
                    this.activeCartFacade.updateEntry(valueChange.entryNumber, valueChange.quantity);
                    if (valueChange.quantity === 0) {
                        this.dismissModal('Removed');
                    }
                }
                else {
                    this.form.markAsPristine();
                }
            }))), map(() => this.form.get('quantity')), shareReplay({ bufferSize: 1, refCount: true }));
        }
        return this.quantityControl$;
    }
    init(productCode, quantity, numberOfEntriesBeforeAdd, pickupStoreName) {
        // Display last entry for new product code. This always corresponds to
        // our new item, independently of whether merging occured or not
        this.entry$ = this.activeCartFacade.getLastEntry(productCode);
        this.quantity = quantity;
        this.addedEntryWasMerged$ = this.getAddedEntryWasMerged(numberOfEntriesBeforeAdd);
        this.pickupStoreName = pickupStoreName;
    }
    getAddedEntryWasMerged(numberOfEntriesBeforeAdd) {
        return this.loaded$.pipe(filter((loaded) => loaded), switchMap(() => this.activeCartFacade.getEntries()), map((entries) => entries.length === numberOfEntriesBeforeAdd));
    }
    /**
     * Adds quantity and entryNumber form controls to the FormGroup.
     * Returns quantity form control.
     */
    getQuantityFormControl(entry) {
        if (!this.form.get('quantity')) {
            const quantity = new UntypedFormControl(entry?.quantity, {
                updateOn: 'blur',
            });
            this.form.addControl('quantity', quantity);
            const entryNumber = new UntypedFormControl(entry?.entryNumber);
            this.form.addControl('entryNumber', entryNumber);
        }
        else {
            // set the real quantity added to cart
            this.form.get('quantity')?.setValue(entry?.quantity);
        }
        return this.form.get('quantity');
    }
    dismissModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
AddedToCartDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogComponent, deps: [{ token: i1$1.ActiveCartFacade }, { token: i1.LaunchDialogService }, { token: i2.RoutingService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AddedToCartDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddedToCartDialogComponent, selector: "cx-added-to-cart-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  class=\"cx-modal-container\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"dismissModal('Escape pressed')\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <ng-container *ngIf=\"loaded$ | async; else loading\">\n      <div class=\"cx-dialog-header modal-header\">\n        <div class=\"cx-dialog-title modal-title\">\n          {{\n            (addedEntryWasMerged$ | async)\n              ? ('addToCart.itemsIncrementedInYourCart' | cxTranslate)\n              : ('addToCart.itemsAddedToYourCart' | cxTranslate)\n          }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          attr.aria-label=\"{{ 'addToCart.closeModal' | cxTranslate }}\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\" *ngIf=\"entry$ | async as entry\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"cx-dialog-item col-sm-12 col-md-6\">\n            <cx-cart-item\n              [item]=\"entry\"\n              [compact]=\"true\"\n              [quantityControl]=\"getQuantityControl() | async\"\n              [promotionLocation]=\"promotionLocation\"\n            ></cx-cart-item>\n            <div class=\"cx-dialog-pickup-store\" *ngIf=\"pickupStoreName\">\n              {{ 'pickupOptionDialog.modalHeader' | cxTranslate }}:\n              <span class=\"cx-dialog-pickup-store-name\">{{\n                pickupStoreName\n              }}</span>\n            </div>\n          </div>\n          <!-- Separator -->\n          <div\n            class=\"\n              cx-dialog-separator\n              col-sm-12\n              d-xs-block d-sm-block d-md-none\n            \"\n          ></div>\n          <!-- Total container -->\n          <div\n            class=\"cx-dialog-actions col-sm-12 col-md-6\"\n            *ngIf=\"cart$ | async as cart\"\n          >\n            <div class=\"cx-dialog-total\">\n              <div>\n                {{\n                  'cartItems.cartTotal'\n                    | cxTranslate: { count: cart.deliveryItemsQuantity }\n                }}\n              </div>\n\n              <div>{{ cart.subTotal?.formattedValue }}</div>\n            </div>\n\n            <!-- Promotions -->\n            <div class=\"cx-dialog-promotions\">\n              <cx-promotions\n                [promotions]=\"\n                  (cart.appliedOrderPromotions || []).concat(\n                    cart.potentialOrderPromotions || []\n                  )\n                \"\n              ></cx-promotions>\n            </div>\n\n            <!-- Actions -->\n            <div class=\"cx-dialog-buttons\">\n              <a\n                [class.disabled]=\"form.dirty\"\n                [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n                (click)=\"dismissModal('View Cart click')\"\n                class=\"btn btn-primary\"\n                autofocus\n                >{{ 'addToCart.viewCart' | cxTranslate }}</a\n              >\n              <a\n                [class.disabled]=\"form.dirty\"\n                [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n                (click)=\"dismissModal('Proceed To Checkout click')\"\n                class=\"btn btn-secondary\"\n                >{{ 'addToCart.proceedToCheckout' | cxTranslate }}</a\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-template #loading>\n      <div class=\"cx-dialog-header modal-header\">\n        <div class=\"cx-dialog-title modal-title\">\n          {{ 'addToCart.updatingCart' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"col-sm-12\"><cx-spinner></cx-spinner></div>\n        </div>\n      </div>\n    </ng-template>\n\n    <!-- For screen reader purposes (not visual)-->\n    <div class=\"cx-visually-hidden\" aria-live=\"polite\" aria-atomic=\"true\">\n      {{\n        (addedEntryWasMerged$ | async)\n          ? ('addToCart.itemsIncrementedInYourCart' | cxTranslate)\n          : ('addToCart.itemsAddedToYourCart' | cxTranslate)\n      }}\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CartItemComponent, selector: "cx-cart-item", inputs: ["compact", "item", "readonly", "quantityControl", "promotionLocation", "options"] }, { kind: "directive", type: i1$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i1.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-added-to-cart-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"cx-modal-container\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"dismissModal('Escape pressed')\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <ng-container *ngIf=\"loaded$ | async; else loading\">\n      <div class=\"cx-dialog-header modal-header\">\n        <div class=\"cx-dialog-title modal-title\">\n          {{\n            (addedEntryWasMerged$ | async)\n              ? ('addToCart.itemsIncrementedInYourCart' | cxTranslate)\n              : ('addToCart.itemsAddedToYourCart' | cxTranslate)\n          }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          attr.aria-label=\"{{ 'addToCart.closeModal' | cxTranslate }}\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\" *ngIf=\"entry$ | async as entry\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"cx-dialog-item col-sm-12 col-md-6\">\n            <cx-cart-item\n              [item]=\"entry\"\n              [compact]=\"true\"\n              [quantityControl]=\"getQuantityControl() | async\"\n              [promotionLocation]=\"promotionLocation\"\n            ></cx-cart-item>\n            <div class=\"cx-dialog-pickup-store\" *ngIf=\"pickupStoreName\">\n              {{ 'pickupOptionDialog.modalHeader' | cxTranslate }}:\n              <span class=\"cx-dialog-pickup-store-name\">{{\n                pickupStoreName\n              }}</span>\n            </div>\n          </div>\n          <!-- Separator -->\n          <div\n            class=\"\n              cx-dialog-separator\n              col-sm-12\n              d-xs-block d-sm-block d-md-none\n            \"\n          ></div>\n          <!-- Total container -->\n          <div\n            class=\"cx-dialog-actions col-sm-12 col-md-6\"\n            *ngIf=\"cart$ | async as cart\"\n          >\n            <div class=\"cx-dialog-total\">\n              <div>\n                {{\n                  'cartItems.cartTotal'\n                    | cxTranslate: { count: cart.deliveryItemsQuantity }\n                }}\n              </div>\n\n              <div>{{ cart.subTotal?.formattedValue }}</div>\n            </div>\n\n            <!-- Promotions -->\n            <div class=\"cx-dialog-promotions\">\n              <cx-promotions\n                [promotions]=\"\n                  (cart.appliedOrderPromotions || []).concat(\n                    cart.potentialOrderPromotions || []\n                  )\n                \"\n              ></cx-promotions>\n            </div>\n\n            <!-- Actions -->\n            <div class=\"cx-dialog-buttons\">\n              <a\n                [class.disabled]=\"form.dirty\"\n                [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n                (click)=\"dismissModal('View Cart click')\"\n                class=\"btn btn-primary\"\n                autofocus\n                >{{ 'addToCart.viewCart' | cxTranslate }}</a\n              >\n              <a\n                [class.disabled]=\"form.dirty\"\n                [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n                (click)=\"dismissModal('Proceed To Checkout click')\"\n                class=\"btn btn-secondary\"\n                >{{ 'addToCart.proceedToCheckout' | cxTranslate }}</a\n              >\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n\n    <ng-template #loading>\n      <div class=\"cx-dialog-header modal-header\">\n        <div class=\"cx-dialog-title modal-title\">\n          {{ 'addToCart.updatingCart' | cxTranslate }}\n        </div>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"col-sm-12\"><cx-spinner></cx-spinner></div>\n        </div>\n      </div>\n    </ng-template>\n\n    <!-- For screen reader purposes (not visual)-->\n    <div class=\"cx-visually-hidden\" aria-live=\"polite\" aria-atomic=\"true\">\n      {{\n        (addedEntryWasMerged$ | async)\n          ? ('addToCart.itemsIncrementedInYourCart' | cxTranslate)\n          : ('addToCart.itemsAddedToYourCart' | cxTranslate)\n      }}\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveCartFacade }, { type: i1.LaunchDialogService }, { type: i2.RoutingService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartItemListRowComponent extends CartItemComponent {
}
CartItemListRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemListRowComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CartItemListRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartItemListRowComponent, selector: "[cx-cart-item-list-row], cx-cart-item-list-row", providers: [
        CartItemContextSource,
        { provide: CartItemContext, useExisting: CartItemContextSource },
    ], usesInheritance: true, ngImport: i0, template: "<!-- Item Start Outlet -->\n<ng-template [cxOutlet]=\"CartOutlets.LIST_ITEM\">\n  <td role=\"cell\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ITEM_CONFIGURATOR_ISSUES\"\n    ></ng-template>\n    <cx-cart-item-validation-warning\n      [code]=\"item.product?.code\"\n    ></cx-cart-item-validation-warning>\n    <div class=\"cx-table-item-container\">\n      <!-- Item Image -->\n      <a\n        [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n        tabindex=\"0\"\n      >\n        <cx-media\n          [container]=\"item.product?.images?.PRIMARY\"\n          format=\"cartIcon\"\n        ></cx-media>\n      </a>\n      <div class=\"cx-info\">\n        <div *ngIf=\"item.product?.name\" class=\"cx-name\">\n          <a\n            class=\"cx-link\"\n            [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n            >{{ item.product?.name }}</a\n          >\n        </div>\n        <div *ngIf=\"item.product?.code\" class=\"cx-code\">\n          {{ 'cartItems.id' | cxTranslate }} {{ item.product?.code }}\n        </div>\n        <!-- Item Price -->\n        <div *ngIf=\"item.basePrice\" class=\"cx-price\">\n          <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"cx-cart-addons\">\n      <!-- Item Details Outlet -->\n      <ng-template [cxOutlet]=\"CartOutlets.ITEM_DETAILS\"> </ng-template>\n\n      <!-- Item Bundle Details Outlet -->\n      <ng-template [cxOutlet]=\"CartOutlets.ITEM_BUNDLE_DETAILS\"> </ng-template>\n\n      <!-- Promotion -->\n      <cx-promotions [promotions]=\"item.promotions\"></cx-promotions>\n\n      <!-- Item Delivery Details Outlet -->\n      <ng-template\n        *ngIf=\"!readonly\"\n        [cxOutlet]=\"CartOutlets.ITEM_DELIVERY_DETAILS\"\n        [cxOutletContext]=\"{item, cartType: options.cartType}\"\n      ></ng-template>\n    </div>\n\n    <!-- Variants -->\n    <ng-container *ngIf=\"item.product?.baseOptions?.length\">\n      <div\n        *ngFor=\"\n          let variant of item.product?.baseOptions[0]?.selected\n            ?.variantOptionQualifiers\n        \"\n        class=\"cx-property\"\n      >\n        <!-- cx-mobile-header -->\n        <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n          {{ variant.name }}: {{ variant.value }}\n        </div>\n      </div>\n    </ng-container>\n  </td>\n  <!-- Mobile Item Price -->\n  <td role=\"cell\" *ngIf=\"item.basePrice\" class=\"cx-price cx-mobile-only\">\n    <div class=\"cx-mobile-header\">\n      {{ 'cartItems.itemPrice' | cxTranslate }}\n    </div>\n    <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n      {{ item.basePrice?.formattedValue }}\n    </div>\n  </td>\n  <!-- Item Quantity -->\n  <td role=\"cell\" class=\"cx-quantity\">\n    <div\n      class=\"cx-mobile-header\"\n      placement=\"left\"\n      title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n    >\n      {{ 'cartItems.quantity' | cxTranslate }}\n    </div>\n    <div class=\"cx-value\" [class.readonly-value]=\"readonly\">\n      <cx-item-counter\n        [control]=\"quantityControl\"\n        [readonly]=\"!item.updateable || readonly || options.isSaveForLater\"\n        [max]=\"item.product?.stock?.stockLevel\"\n        [allowZero]=\"true\"\n      >\n      </cx-item-counter>\n    </div>\n  </td>\n  <!-- Total -->\n  <ng-container *ngIf=\"options.isSaveForLater; else total\">\n    <td role=\"cell\" class=\"cx-total\">\n      <div class=\"cx-mobile-header\">\n        {{ 'saveForLaterItems.stock' | cxTranslate }}\n      </div>\n      <div\n        *ngIf=\"item.product?.stock?.stockLevel >= 0; else forceInstock\"\n        class=\"cx-value\"\n      >\n        {{ item.product?.stock.stockLevel }}\n      </div>\n      <ng-template #forceInstock>\n        <div class=\"cx-value\">\n          {{ 'saveForLaterItems.forceInStock' | cxTranslate }}\n        </div>\n      </ng-template>\n    </td>\n  </ng-container>\n\n  <td\n    role=\"cell\"\n    *ngIf=\"\n      (!readonly || options.isSaveForLater || options.displayAddToCart) &&\n      item.updateable\n    \"\n    class=\"cx-actions\"\n  >\n    <ng-container *ngIf=\"!isProductOutOfStock(item.product)\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          options.optionalBtn;\n          context: {\n            $implicit: {\n              loading: quantityControl.disabled,\n              item: this.item,\n              options: this.options\n            }\n          }\n        \"\n      ></ng-container>\n    </ng-container>\n\n    <!-- Availability -->\n    <span\n      role=\"cell\"\n      *ngIf=\"isProductOutOfStock(item.product)\"\n      class=\"cx-availability\"\n    >\n      {{ 'addToCart.outOfStock' | cxTranslate }}\n    </span>\n\n    <button\n      *ngIf=\"!readonly\"\n      (click)=\"removeItem()\"\n      [cxAtMessage]=\"'cartItems.itemRemoved' | cxTranslate\"\n      [disabled]=\"quantityControl.disabled\"\n      attr.aria-label=\"{{ 'addToCart.removeFromCart' | cxTranslate }}\"\n      class=\"btn btn-tertiary cx-remove-btn\"\n    >\n      {{ 'common.remove' | cxTranslate }}\n    </button>\n  </td>\n</ng-template>\n<ng-template #total>\n  <td role=\"cell\" *ngIf=\"item.totalPrice\" class=\"cx-total\">\n    <div class=\"cx-mobile-header\">\n      {{ 'cartItems.total' | cxTranslate }}\n    </div>\n    <div class=\"cx-value\">{{ item.totalPrice.formattedValue }}</div>\n  </td>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1.AtMessageDirective, selector: "[cxAtMessage]", inputs: ["cxAtMessage"] }, { kind: "component", type: CartItemValidationWarningComponent, selector: "cx-cart-item-validation-warning", inputs: ["code"] }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: i1.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "directive", type: i1$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemListRowComponent, decorators: [{
            type: Component,
            args: [{ selector: '[cx-cart-item-list-row], cx-cart-item-list-row', providers: [
                        CartItemContextSource,
                        { provide: CartItemContext, useExisting: CartItemContextSource },
                    ], template: "<!-- Item Start Outlet -->\n<ng-template [cxOutlet]=\"CartOutlets.LIST_ITEM\">\n  <td role=\"cell\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ITEM_CONFIGURATOR_ISSUES\"\n    ></ng-template>\n    <cx-cart-item-validation-warning\n      [code]=\"item.product?.code\"\n    ></cx-cart-item-validation-warning>\n    <div class=\"cx-table-item-container\">\n      <!-- Item Image -->\n      <a\n        [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n        tabindex=\"0\"\n      >\n        <cx-media\n          [container]=\"item.product?.images?.PRIMARY\"\n          format=\"cartIcon\"\n        ></cx-media>\n      </a>\n      <div class=\"cx-info\">\n        <div *ngIf=\"item.product?.name\" class=\"cx-name\">\n          <a\n            class=\"cx-link\"\n            [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n            >{{ item.product?.name }}</a\n          >\n        </div>\n        <div *ngIf=\"item.product?.code\" class=\"cx-code\">\n          {{ 'cartItems.id' | cxTranslate }} {{ item.product?.code }}\n        </div>\n        <!-- Item Price -->\n        <div *ngIf=\"item.basePrice\" class=\"cx-price\">\n          <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n            {{ item.basePrice?.formattedValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"cx-cart-addons\">\n      <!-- Item Details Outlet -->\n      <ng-template [cxOutlet]=\"CartOutlets.ITEM_DETAILS\"> </ng-template>\n\n      <!-- Item Bundle Details Outlet -->\n      <ng-template [cxOutlet]=\"CartOutlets.ITEM_BUNDLE_DETAILS\"> </ng-template>\n\n      <!-- Promotion -->\n      <cx-promotions [promotions]=\"item.promotions\"></cx-promotions>\n\n      <!-- Item Delivery Details Outlet -->\n      <ng-template\n        *ngIf=\"!readonly\"\n        [cxOutlet]=\"CartOutlets.ITEM_DELIVERY_DETAILS\"\n        [cxOutletContext]=\"{item, cartType: options.cartType}\"\n      ></ng-template>\n    </div>\n\n    <!-- Variants -->\n    <ng-container *ngIf=\"item.product?.baseOptions?.length\">\n      <div\n        *ngFor=\"\n          let variant of item.product?.baseOptions[0]?.selected\n            ?.variantOptionQualifiers\n        \"\n        class=\"cx-property\"\n      >\n        <!-- cx-mobile-header -->\n        <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n          {{ variant.name }}: {{ variant.value }}\n        </div>\n      </div>\n    </ng-container>\n  </td>\n  <!-- Mobile Item Price -->\n  <td role=\"cell\" *ngIf=\"item.basePrice\" class=\"cx-price cx-mobile-only\">\n    <div class=\"cx-mobile-header\">\n      {{ 'cartItems.itemPrice' | cxTranslate }}\n    </div>\n    <div *ngIf=\"item.basePrice\" class=\"cx-value\">\n      {{ item.basePrice?.formattedValue }}\n    </div>\n  </td>\n  <!-- Item Quantity -->\n  <td role=\"cell\" class=\"cx-quantity\">\n    <div\n      class=\"cx-mobile-header\"\n      placement=\"left\"\n      title=\"{{ 'cartItems.quantityTitle' | cxTranslate }}\"\n    >\n      {{ 'cartItems.quantity' | cxTranslate }}\n    </div>\n    <div class=\"cx-value\" [class.readonly-value]=\"readonly\">\n      <cx-item-counter\n        [control]=\"quantityControl\"\n        [readonly]=\"!item.updateable || readonly || options.isSaveForLater\"\n        [max]=\"item.product?.stock?.stockLevel\"\n        [allowZero]=\"true\"\n      >\n      </cx-item-counter>\n    </div>\n  </td>\n  <!-- Total -->\n  <ng-container *ngIf=\"options.isSaveForLater; else total\">\n    <td role=\"cell\" class=\"cx-total\">\n      <div class=\"cx-mobile-header\">\n        {{ 'saveForLaterItems.stock' | cxTranslate }}\n      </div>\n      <div\n        *ngIf=\"item.product?.stock?.stockLevel >= 0; else forceInstock\"\n        class=\"cx-value\"\n      >\n        {{ item.product?.stock.stockLevel }}\n      </div>\n      <ng-template #forceInstock>\n        <div class=\"cx-value\">\n          {{ 'saveForLaterItems.forceInStock' | cxTranslate }}\n        </div>\n      </ng-template>\n    </td>\n  </ng-container>\n\n  <td\n    role=\"cell\"\n    *ngIf=\"\n      (!readonly || options.isSaveForLater || options.displayAddToCart) &&\n      item.updateable\n    \"\n    class=\"cx-actions\"\n  >\n    <ng-container *ngIf=\"!isProductOutOfStock(item.product)\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          options.optionalBtn;\n          context: {\n            $implicit: {\n              loading: quantityControl.disabled,\n              item: this.item,\n              options: this.options\n            }\n          }\n        \"\n      ></ng-container>\n    </ng-container>\n\n    <!-- Availability -->\n    <span\n      role=\"cell\"\n      *ngIf=\"isProductOutOfStock(item.product)\"\n      class=\"cx-availability\"\n    >\n      {{ 'addToCart.outOfStock' | cxTranslate }}\n    </span>\n\n    <button\n      *ngIf=\"!readonly\"\n      (click)=\"removeItem()\"\n      [cxAtMessage]=\"'cartItems.itemRemoved' | cxTranslate\"\n      [disabled]=\"quantityControl.disabled\"\n      attr.aria-label=\"{{ 'addToCart.removeFromCart' | cxTranslate }}\"\n      class=\"btn btn-tertiary cx-remove-btn\"\n    >\n      {{ 'common.remove' | cxTranslate }}\n    </button>\n  </td>\n</ng-template>\n<ng-template #total>\n  <td role=\"cell\" *ngIf=\"item.totalPrice\" class=\"cx-total\">\n    <div class=\"cx-mobile-header\">\n      {{ 'cartItems.total' | cxTranslate }}\n    </div>\n    <div class=\"cx-value\">{{ item.totalPrice.formattedValue }}</div>\n  </td>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AppliedCouponsComponent {
    constructor(cartVoucherService) {
        this.cartVoucherService = cartVoucherService;
        this.cartIsLoading = false;
        this.isReadOnly = false;
        this.iconTypes = ICON_TYPE;
    }
    get sortedVouchers() {
        this.vouchers = this.vouchers || [];
        return this.vouchers.slice().sort((a, b) => {
            return a.code && b.code ? a.code.localeCompare(b.code) : 0;
        });
    }
    removeVoucher(voucherId) {
        this.cartVoucherService.removeVoucher(voucherId);
    }
}
AppliedCouponsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppliedCouponsComponent, deps: [{ token: i1$1.CartVoucherFacade }], target: i0.ɵɵFactoryTarget.Component });
AppliedCouponsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AppliedCouponsComponent, selector: "cx-applied-coupons", inputs: { vouchers: "vouchers", cartIsLoading: "cartIsLoading", isReadOnly: "isReadOnly" }, ngImport: i0, template: "<div *ngIf=\"isReadOnly; else editableCoupons\">\n  <div *ngIf=\"sortedVouchers.length > 0\">\n    <div class=\"cx-applied-coupon-title\">\n      {{ 'voucher.vouchersApplied' | cxTranslate }}\n    </div>\n  </div>\n  <ng-container>\n    <div\n      *ngFor=\"let voucher of sortedVouchers\"\n      class=\"coupon-summary cx-coupon-card textonly\"\n    >\n      <span class=\"cx-applied-coupon-code\">{{ voucher.voucherCode }}</span>\n    </div>\n  </ng-container>\n</div>\n\n<ng-template #editableCoupons>\n  <div class=\"row\">\n    <ng-container>\n      <div\n        *ngFor=\"let voucher of sortedVouchers\"\n        class=\"col-sm-12 col-md-6 col-lg-12 cx-coupon-card-grid\"\n      >\n        <div class=\"cx-coupon-apply cx-coupon-card cx-coupon-list-wrap\">\n          <span class=\"cx-cart-coupon-code\">{{ voucher.voucherCode }}</span>\n          <button\n            type=\"button\"\n            class=\"close\"\n            [attr.aria-label]=\"'common.close' | cxTranslate\"\n            (click)=\"removeVoucher(voucher.voucherCode)\"\n            [disabled]=\"cartIsLoading\"\n            [class.disabled]=\"cartIsLoading\"\n          >\n            <span aria-hidden=\"true\">\n              <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n            </span>\n          </button>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AppliedCouponsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-applied-coupons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"isReadOnly; else editableCoupons\">\n  <div *ngIf=\"sortedVouchers.length > 0\">\n    <div class=\"cx-applied-coupon-title\">\n      {{ 'voucher.vouchersApplied' | cxTranslate }}\n    </div>\n  </div>\n  <ng-container>\n    <div\n      *ngFor=\"let voucher of sortedVouchers\"\n      class=\"coupon-summary cx-coupon-card textonly\"\n    >\n      <span class=\"cx-applied-coupon-code\">{{ voucher.voucherCode }}</span>\n    </div>\n  </ng-container>\n</div>\n\n<ng-template #editableCoupons>\n  <div class=\"row\">\n    <ng-container>\n      <div\n        *ngFor=\"let voucher of sortedVouchers\"\n        class=\"col-sm-12 col-md-6 col-lg-12 cx-coupon-card-grid\"\n      >\n        <div class=\"cx-coupon-apply cx-coupon-card cx-coupon-list-wrap\">\n          <span class=\"cx-cart-coupon-code\">{{ voucher.voucherCode }}</span>\n          <button\n            type=\"button\"\n            class=\"close\"\n            [attr.aria-label]=\"'common.close' | cxTranslate\"\n            (click)=\"removeVoucher(voucher.voucherCode)\"\n            [disabled]=\"cartIsLoading\"\n            [class.disabled]=\"cartIsLoading\"\n          >\n            <span aria-hidden=\"true\">\n              <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n            </span>\n          </button>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CartVoucherFacade }]; }, propDecorators: { vouchers: [{
                type: Input
            }], cartIsLoading: [{
                type: Input
            }], isReadOnly: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartCouponComponent {
    constructor(cartVoucherService, formBuilder, customerCouponService, activeCartService) {
        this.cartVoucherService = cartVoucherService;
        this.formBuilder = formBuilder;
        this.customerCouponService = customerCouponService;
        this.activeCartService = activeCartService;
        this.MAX_CUSTOMER_COUPON_PAGE = 100;
        this.ignoreCloseEvent = false;
        this.subscription = new Subscription();
        this.couponBoxIsActive = false;
    }
    ngOnInit() {
        if (this.customerCouponService) {
            this.customerCouponService.loadCustomerCoupons(this.MAX_CUSTOMER_COUPON_PAGE);
        }
        this.cart$ = combineLatest([
            this.activeCartService.getActive(),
            this.activeCartService.getActiveCartId(),
            this.customerCouponService.getCustomerCoupons(this.MAX_CUSTOMER_COUPON_PAGE),
        ]).pipe(tap(([cart, activeCardId, customerCoupons]) => {
            this.cartId = activeCardId;
            this.getApplicableCustomerCoupons(cart, customerCoupons.coupons ?? []);
        }), map(([cart]) => cart));
        this.cartIsLoading$ = this.activeCartService
            .isStable()
            .pipe(map((loaded) => !loaded));
        this.cartVoucherService.resetAddVoucherProcessingState();
        this.couponForm = this.formBuilder.group({
            couponCode: ['', [Validators.required]],
        });
        // TODO(#7241): Replace process subscriptions with event listeners and drop process for ADD_VOUCHER
        this.subscription.add(this.cartVoucherService
            .getAddVoucherResultSuccess()
            .subscribe((success) => {
            this.onSuccess(success);
        }));
        // TODO(#7241): Replace process subscriptions with event listeners and drop process for ADD_VOUCHER
        this.subscription.add(this.cartVoucherService.getAddVoucherResultError().subscribe((error) => {
            this.onError(error);
        }));
    }
    onError(error) {
        if (error) {
            this.customerCouponService.loadCustomerCoupons(this.MAX_CUSTOMER_COUPON_PAGE);
            this.cartVoucherService.resetAddVoucherProcessingState();
        }
    }
    onSuccess(success) {
        if (success) {
            this.couponForm.reset();
            this.cartVoucherService.resetAddVoucherProcessingState();
        }
    }
    getApplicableCustomerCoupons(cart, coupons) {
        this.applicableCoupons = coupons || [];
        if (cart.appliedVouchers) {
            cart.appliedVouchers.forEach((appliedVoucher) => {
                this.applicableCoupons = this.applicableCoupons.filter((coupon) => coupon.couponId !== appliedVoucher.code);
            });
        }
    }
    applyVoucher() {
        if (this.couponForm.valid) {
            this.cartVoucherService.addVoucher(this.couponForm.value.couponCode, this.cartId);
        }
        else {
            this.couponForm.markAllAsTouched();
        }
    }
    applyCustomerCoupon(couponId) {
        this.cartVoucherService.addVoucher(couponId, this.cartId);
        this.couponBoxIsActive = false;
    }
    close(event) {
        if (!this.ignoreCloseEvent) {
            this.couponBoxIsActive = false;
            if (event && event.target) {
                event.target.blur();
            }
        }
        this.ignoreCloseEvent = false;
    }
    disableClose() {
        this.ignoreCloseEvent = true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.cartVoucherService.resetAddVoucherProcessingState();
    }
}
CartCouponComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponComponent, deps: [{ token: i1$1.CartVoucherFacade }, { token: i2$1.UntypedFormBuilder }, { token: i2.CustomerCouponService }, { token: i1$1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
CartCouponComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartCouponComponent, selector: "cx-cart-coupon", ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"form-group\">\n    <form (ngSubmit)=\"applyVoucher()\" [formGroup]=\"couponForm\">\n      <label class=\"cx-cart-coupon-title\">\n        {{ 'voucher.coupon' | cxTranslate }}\n      </label>\n\n      <div class=\"cx-cart-coupon-container\">\n        <input\n          [attr.aria-label]=\"'voucher.couponLabel' | cxTranslate\"\n          required=\"true\"\n          type=\"text\"\n          class=\"form-control input-coupon-code\"\n          formControlName=\"couponCode\"\n          placeholder=\"{{ 'voucher.placeholder' | cxTranslate }}\"\n        />\n        <button\n          class=\"btn btn-block btn-secondary apply-coupon-button\"\n          type=\"submit\"\n          [disabled]=\"cartIsLoading$ | async\"\n          [class.disabled]=\"cartIsLoading$ | async\"\n        >\n          {{ 'voucher.apply' | cxTranslate }}\n        </button>\n        <cx-form-errors\n          [control]=\"couponForm.get('couponCode')\"\n        ></cx-form-errors>\n      </div>\n    </form>\n  </div>\n\n  <cx-applied-coupons\n    [vouchers]=\"cart.appliedVouchers\"\n    [cartIsLoading]=\"cartIsLoading$ | async\"\n    [isReadOnly]=\"false\"\n  >\n  </cx-applied-coupons>\n\n  <ng-container *ngIf=\"applicableCoupons && applicableCoupons.length > 0\">\n    <div class=\"cx-available-coupon\">\n      <div class=\"title cx-cart-coupon-title\">\n        {{ 'voucher.availableCoupons' | cxTranslate }}\n      </div>\n      <div class=\"message\">\n        {{ 'voucher.availableCouponsLabel' | cxTranslate }}\n      </div>\n      <div class=\"scroll\">\n        <div class=\"coupons card\" *ngFor=\"let coupon of applicableCoupons\">\n          <button\n            (click)=\"applyCustomerCoupon(coupon.couponId)\"\n            class=\"coupon-id link\"\n            [disabled]=\"cartIsLoading$ | async\"\n            [class.disabled]=\"cartIsLoading$ | async\"\n          >\n            {{ coupon.couponId }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i2$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: AppliedCouponsComponent, selector: "cx-applied-coupons", inputs: ["vouchers", "cartIsLoading", "isReadOnly"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-coupon', template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div class=\"form-group\">\n    <form (ngSubmit)=\"applyVoucher()\" [formGroup]=\"couponForm\">\n      <label class=\"cx-cart-coupon-title\">\n        {{ 'voucher.coupon' | cxTranslate }}\n      </label>\n\n      <div class=\"cx-cart-coupon-container\">\n        <input\n          [attr.aria-label]=\"'voucher.couponLabel' | cxTranslate\"\n          required=\"true\"\n          type=\"text\"\n          class=\"form-control input-coupon-code\"\n          formControlName=\"couponCode\"\n          placeholder=\"{{ 'voucher.placeholder' | cxTranslate }}\"\n        />\n        <button\n          class=\"btn btn-block btn-secondary apply-coupon-button\"\n          type=\"submit\"\n          [disabled]=\"cartIsLoading$ | async\"\n          [class.disabled]=\"cartIsLoading$ | async\"\n        >\n          {{ 'voucher.apply' | cxTranslate }}\n        </button>\n        <cx-form-errors\n          [control]=\"couponForm.get('couponCode')\"\n        ></cx-form-errors>\n      </div>\n    </form>\n  </div>\n\n  <cx-applied-coupons\n    [vouchers]=\"cart.appliedVouchers\"\n    [cartIsLoading]=\"cartIsLoading$ | async\"\n    [isReadOnly]=\"false\"\n  >\n  </cx-applied-coupons>\n\n  <ng-container *ngIf=\"applicableCoupons && applicableCoupons.length > 0\">\n    <div class=\"cx-available-coupon\">\n      <div class=\"title cx-cart-coupon-title\">\n        {{ 'voucher.availableCoupons' | cxTranslate }}\n      </div>\n      <div class=\"message\">\n        {{ 'voucher.availableCouponsLabel' | cxTranslate }}\n      </div>\n      <div class=\"scroll\">\n        <div class=\"coupons card\" *ngFor=\"let coupon of applicableCoupons\">\n          <button\n            (click)=\"applyCustomerCoupon(coupon.couponId)\"\n            class=\"coupon-id link\"\n            [disabled]=\"cartIsLoading$ | async\"\n            [class.disabled]=\"cartIsLoading$ | async\"\n          >\n            {{ coupon.couponId }}\n          </button>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CartVoucherFacade }, { type: i2$1.UntypedFormBuilder }, { type: i2.CustomerCouponService }, { type: i1$1.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartCouponModule {
}
CartCouponModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartCouponModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, declarations: [CartCouponComponent, AppliedCouponsComponent], imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        FormErrorsModule], exports: [CartCouponComponent, AppliedCouponsComponent] });
CartCouponModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartApplyCouponComponent: {
                    component: CartCouponComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartCouponModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CartCouponComponent, AppliedCouponsComponent],
                    exports: [CartCouponComponent, AppliedCouponsComponent],
                    imports: [
                        CommonModule,
                        NgSelectModule,
                        FormsModule,
                        ReactiveFormsModule,
                        I18nModule,
                        IconModule,
                        FormErrorsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartApplyCouponComponent: {
                                    component: CartCouponComponent,
                                },
                            },
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartItemValidationWarningModule {
}
CartItemValidationWarningModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemValidationWarningModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartItemValidationWarningModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartItemValidationWarningModule, declarations: [CartItemValidationWarningComponent], imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule], exports: [CartItemValidationWarningComponent] });
CartItemValidationWarningModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemValidationWarningModule, imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemValidationWarningModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule],
                    exports: [CartItemValidationWarningComponent],
                    declarations: [CartItemValidationWarningComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartItemListComponent {
    set items(items) {
        this.resolveItems(items);
        this.createForm();
    }
    get items() {
        return this._items;
    }
    set setLoading(value) {
        if (!this.readonly) {
            // Whenever the cart is loading, we disable the complete form
            // to avoid any user interaction with the cart.
            value
                ? this.form.disable({ emitEvent: false })
                : this.form.enable({ emitEvent: false });
            this.cd.markForCheck();
        }
    }
    constructor(activeCartService, selectiveCartService, userIdService, multiCartService, cd, outlet) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.cd = cd;
        this.outlet = outlet;
        this.subscription = new Subscription();
        this.readonly = false;
        this.hasHeader = true;
        this.options = {
            isSaveForLater: false,
            optionalBtn: null,
            displayAddToCart: false,
        };
        this._items = [];
        this.form = new UntypedFormGroup({});
        this.promotionLocation = PromotionLocation.ActiveCart;
        this.CartOutlets = CartOutlets;
    }
    ngOnInit() {
        this.subscription.add(this.getInputsFromContext());
        this.subscription.add(this.userIdService
            ?.getUserId()
            .subscribe((userId) => (this.userId = userId)));
    }
    getInputsFromContext() {
        return this.outlet?.context$.subscribe((context) => {
            if (context.readonly !== undefined) {
                this.readonly = context.readonly;
            }
            if (context.hasHeader !== undefined) {
                this.hasHeader = context.hasHeader;
            }
            if (context.options !== undefined) {
                this.options = context.options;
            }
            if (context.cartId !== undefined) {
                this.cartId = context.cartId;
            }
            if (context.items !== undefined) {
                this.items = context.items;
            }
            if (context.promotionLocation !== undefined) {
                this.promotionLocation = context.promotionLocation;
            }
            if (context.cartIsLoading !== undefined) {
                this.setLoading = context.cartIsLoading;
            }
        });
    }
    /**
     * Resolves items passed to component input and updates 'items' field
     */
    resolveItems(items) {
        if (!items) {
            this._items = [];
            return;
        }
        // The items we're getting from the input do not have a consistent model.
        // In case of a `consignmentEntry`, we need to normalize the data from the orderEntry.
        if (items.every((item) => item.hasOwnProperty('orderEntry'))) {
            this.normalizeConsignmentEntries(items);
        }
        else {
            this.rerenderChangedItems(items);
        }
    }
    normalizeConsignmentEntries(items) {
        this._items = items.map((consignmentEntry) => {
            const entry = Object.assign({}, consignmentEntry.orderEntry);
            entry.quantity = consignmentEntry.quantity;
            return entry;
        });
    }
    /**
     * We'd like to avoid the unnecessary re-renders of unchanged cart items after the data reload.
     * OCC cart entries don't have any unique identifier that we could use in Angular `trackBy`.
     * So we update each array element to the new object only when it's any different to the previous one.
     */
    rerenderChangedItems(items) {
        let offset = 0;
        for (let i = 0; i - offset < Math.max(items.length, this._items.length); i++) {
            const index = i - offset;
            if (JSON.stringify(this._items?.[index]) !== JSON.stringify(items[index])) {
                if (this._items[index]) {
                    this.form?.removeControl(this.getControlName(this._items[index]));
                }
                if (!items[index]) {
                    this._items.splice(index, 1);
                    offset++;
                }
                else {
                    this._items[index] = items[index];
                }
            }
        }
    }
    /**
     * Creates form models for list items
     */
    createForm() {
        this._items.forEach((item) => {
            const controlName = this.getControlName(item);
            const control = this.form.get(controlName);
            if (control) {
                if (control.get('quantity')?.value !== item.quantity) {
                    control.patchValue({ quantity: item.quantity }, { emitEvent: false });
                }
            }
            else {
                const group = new UntypedFormGroup({
                    entryNumber: new UntypedFormControl(item.entryNumber),
                    quantity: new UntypedFormControl(item.quantity, { updateOn: 'blur' }),
                });
                this.form.addControl(controlName, group);
            }
            // If we disable form group before adding, disabled status will reset
            // Which forces us to disable control after including to form object
            if (!item.updateable || this.readonly) {
                this.form.controls[controlName].disable();
            }
        });
    }
    getControlName(item) {
        return item.entryNumber?.toString() || '';
    }
    removeEntry(item) {
        if (this.options.isSaveForLater) {
            this.selectiveCartService.removeEntry(item);
        }
        else if (this.cartId && this.userId) {
            this.multiCartService.removeEntry(this.userId, this.cartId, item.entryNumber);
        }
        else {
            this.activeCartService.removeEntry(item);
        }
        delete this.form.controls[this.getControlName(item)];
    }
    getControl(item) {
        return this.form.get(this.getControlName(item))?.valueChanges.pipe(
        // eslint-disable-next-line import/no-deprecated
        startWith(null), tap((value) => {
            if (item.updateable && value && !this.readonly) {
                if (this.options.isSaveForLater) {
                    this.selectiveCartService.updateEntry(value.entryNumber, value.quantity);
                }
                else if (this.cartId && this.userId) {
                    this.multiCartService.updateEntry(this.userId, this.cartId, value.entryNumber, value.quantity);
                }
                else {
                    this.activeCartService.updateEntry(value.entryNumber, value.quantity);
                }
            }
        }), map(() => this.form.get(this.getControlName(item))));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
CartItemListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemListComponent, deps: [{ token: i1$1.ActiveCartFacade }, { token: i1$1.SelectiveCartFacade }, { token: i2.UserIdService }, { token: i1$1.MultiCartFacade }, { token: i0.ChangeDetectorRef }, { token: i1.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CartItemListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartItemListComponent, selector: "cx-cart-item-list", inputs: { readonly: "readonly", hasHeader: "hasHeader", options: "options", cartId: "cartId", items: "items", promotionLocation: "promotionLocation", setLoading: ["cartIsLoading", "setLoading"] }, ngImport: i0, template: "<table role=\"table\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'cartItems.caption' | cxTranslate\n    }}\n  </caption>\n  <thead *ngIf=\"hasHeader\">\n    <tr role=\"row\" class=\"cx-item-list-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'cartItems.description' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'cartItems.quantity' | cxTranslate }}\n      </th>\n      <ng-container *ngIf=\"options.isSaveForLater; else totalHeader\">\n        <th role=\"columnheader\" class=\"cx-item-list-total\">\n          {{ 'saveForLaterItems.stock' | cxTranslate }}\n        </th>\n      </ng-container>\n      <ng-container\n        *ngIf=\"!readonly || options.isSaveForLater || options.displayAddToCart\"\n      >\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </ng-container>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <ng-container *ngFor=\"let item of items; let i = index\">\n      <ng-container\n        *ngIf=\"getControl(item) | async as control\"\n        [class.is-changed]=\"control.get('quantity').disabled\"\n      >\n        <tr\n          cx-cart-item-list-row\n          role=\"row\"\n          class=\"cx-item-list-row\"\n          [item]=\"item\"\n          [quantityControl]=\"control.get('quantity')\"\n          [readonly]=\"readonly\"\n          [promotionLocation]=\"promotionLocation\"\n          [options]=\"options\"\n        ></tr>\n      </ng-container>\n    </ng-container>\n  </tbody>\n</table>\n\n<ng-template #totalHeader>\n  <th role=\"columnheader\" class=\"cx-item-list-total\">\n    {{ 'cartItems.total' | cxTranslate }}\n  </th>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CartItemListRowComponent, selector: "[cx-cart-item-list-row], cx-cart-item-list-row" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartItemListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-item-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table role=\"table\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      'cartItems.caption' | cxTranslate\n    }}\n  </caption>\n  <thead *ngIf=\"hasHeader\">\n    <tr role=\"row\" class=\"cx-item-list-header\">\n      <th role=\"columnheader\" class=\"cx-item-list-desc\">\n        {{ 'cartItems.description' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\" class=\"cx-item-list-qty\">\n        {{ 'cartItems.quantity' | cxTranslate }}\n      </th>\n      <ng-container *ngIf=\"options.isSaveForLater; else totalHeader\">\n        <th role=\"columnheader\" class=\"cx-item-list-total\">\n          {{ 'saveForLaterItems.stock' | cxTranslate }}\n        </th>\n      </ng-container>\n      <ng-container\n        *ngIf=\"!readonly || options.isSaveForLater || options.displayAddToCart\"\n      >\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </ng-container>\n    </tr>\n  </thead>\n  <tbody class=\"cx-item-list-items\">\n    <ng-container *ngFor=\"let item of items; let i = index\">\n      <ng-container\n        *ngIf=\"getControl(item) | async as control\"\n        [class.is-changed]=\"control.get('quantity').disabled\"\n      >\n        <tr\n          cx-cart-item-list-row\n          role=\"row\"\n          class=\"cx-item-list-row\"\n          [item]=\"item\"\n          [quantityControl]=\"control.get('quantity')\"\n          [readonly]=\"readonly\"\n          [promotionLocation]=\"promotionLocation\"\n          [options]=\"options\"\n        ></tr>\n      </ng-container>\n    </ng-container>\n  </tbody>\n</table>\n\n<ng-template #totalHeader>\n  <th role=\"columnheader\" class=\"cx-item-list-total\">\n    {{ 'cartItems.total' | cxTranslate }}\n  </th>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveCartFacade }, { type: i1$1.SelectiveCartFacade }, { type: i2.UserIdService }, { type: i1$1.MultiCartFacade }, { type: i0.ChangeDetectorRef }, { type: i1.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { readonly: [{
                type: Input
            }], hasHeader: [{
                type: Input
            }], options: [{
                type: Input
            }], cartId: [{
                type: Input
            }], items: [{
                type: Input,
                args: ['items']
            }], promotionLocation: [{
                type: Input
            }], setLoading: [{
                type: Input,
                args: ['cartIsLoading']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderSummaryComponent {
    constructor(outlet) {
        this.outlet = outlet;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        if (this.outlet?.context$) {
            this.subscription.add(this.outlet.context$.subscribe((context) => (this.cart = context)));
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
OrderSummaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderSummaryComponent, deps: [{ token: i1.OutletContextData, optional: true }], target: i0.ɵɵFactoryTarget.Component });
OrderSummaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: OrderSummaryComponent, selector: "cx-order-summary", inputs: { cart: "cart" }, ngImport: i0, template: "<div class=\"cx-summary-heading\">\n  {{ 'orderCost.orderSummary' | cxTranslate }}\n</div>\n\n<div class=\"cx-summary-partials\" *ngIf=\"cart\">\n  <div class=\"cx-summary-row\">\n    <div class=\"col-6 cx-summary-label\">\n      {{ 'orderCost.subtotal' | cxTranslate }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{ cart.subTotal?.formattedValue }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row\">\n    <div class=\"col-6 cx-summary-label\">\n      {{\n        (cart.deliveryCost?.formattedValue\n          ? 'orderCost.shipping'\n          : 'orderCost.estimatedShipping'\n        ) | cxTranslate\n      }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{\n        cart.deliveryCost?.formattedValue\n          ? cart.deliveryCost?.formattedValue\n          : ('orderCost.toBeDetermined' | cxTranslate)\n      }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row\" *ngIf=\"cart.net; else cartWithoutNet\">\n    <div class=\"col-6 cx-summary-label\">\n      {{ 'orderCost.salesTax' | cxTranslate }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{ cart.totalTax?.formattedValue }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row cx-summary-total\">\n    <div class=\"col-6 cx-summary-label\">\n      {{ 'orderCost.total' | cxTranslate }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{ cart.totalPriceWithTax?.formattedValue }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row\" *ngIf=\"cart.totalDiscounts?.value > 0\">\n    {{ 'orderCost.discount' | cxTranslate }}\n    {{ cart.totalDiscounts?.formattedValue }}\n  </div>\n  <ng-template #cartWithoutNet>\n    <div class=\"cx-summary-row\">\n      {{\n        cart.totalPriceWithTax?.value !== cart.totalPrice?.value\n          ? ('orderCost.grossTax' | cxTranslate)\n          : ('orderCost.grossIncludeTax' | cxTranslate)\n      }}\n      {{ cart.totalTax?.formattedValue }}.\n    </div>\n  </ng-template>\n</div>\n\n<cx-applied-coupons\n  [vouchers]=\"cart.appliedVouchers\"\n  [isReadOnly]=\"true\"\n></cx-applied-coupons>\n", dependencies: [{ kind: "component", type: AppliedCouponsComponent, selector: "cx-applied-coupons", inputs: ["vouchers", "cartIsLoading", "isReadOnly"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderSummaryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-summary', template: "<div class=\"cx-summary-heading\">\n  {{ 'orderCost.orderSummary' | cxTranslate }}\n</div>\n\n<div class=\"cx-summary-partials\" *ngIf=\"cart\">\n  <div class=\"cx-summary-row\">\n    <div class=\"col-6 cx-summary-label\">\n      {{ 'orderCost.subtotal' | cxTranslate }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{ cart.subTotal?.formattedValue }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row\">\n    <div class=\"col-6 cx-summary-label\">\n      {{\n        (cart.deliveryCost?.formattedValue\n          ? 'orderCost.shipping'\n          : 'orderCost.estimatedShipping'\n        ) | cxTranslate\n      }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{\n        cart.deliveryCost?.formattedValue\n          ? cart.deliveryCost?.formattedValue\n          : ('orderCost.toBeDetermined' | cxTranslate)\n      }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row\" *ngIf=\"cart.net; else cartWithoutNet\">\n    <div class=\"col-6 cx-summary-label\">\n      {{ 'orderCost.salesTax' | cxTranslate }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{ cart.totalTax?.formattedValue }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row cx-summary-total\">\n    <div class=\"col-6 cx-summary-label\">\n      {{ 'orderCost.total' | cxTranslate }}\n    </div>\n    <div class=\"col-6 cx-summary-amount\">\n      {{ cart.totalPriceWithTax?.formattedValue }}\n    </div>\n  </div>\n  <div class=\"cx-summary-row\" *ngIf=\"cart.totalDiscounts?.value > 0\">\n    {{ 'orderCost.discount' | cxTranslate }}\n    {{ cart.totalDiscounts?.formattedValue }}\n  </div>\n  <ng-template #cartWithoutNet>\n    <div class=\"cx-summary-row\">\n      {{\n        cart.totalPriceWithTax?.value !== cart.totalPrice?.value\n          ? ('orderCost.grossTax' | cxTranslate)\n          : ('orderCost.grossIncludeTax' | cxTranslate)\n      }}\n      {{ cart.totalTax?.formattedValue }}.\n    </div>\n  </ng-template>\n</div>\n\n<cx-applied-coupons\n  [vouchers]=\"cart.appliedVouchers\"\n  [isReadOnly]=\"true\"\n></cx-applied-coupons>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { cart: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddToCartComponent {
    constructor(currentProductService, cd, activeCartService, component, eventService, productListItemContext) {
        this.currentProductService = currentProductService;
        this.cd = cd;
        this.activeCartService = activeCartService;
        this.component = component;
        this.eventService = eventService;
        this.productListItemContext = productListItemContext;
        this.showQuantity = true;
        this.hasStock = false;
        this.inventoryThreshold = false;
        this.showInventory$ = this.component?.data$.pipe(map((data) => data.inventoryDisplay));
        this.quantity = 1;
        this.addToCartForm = new UntypedFormGroup({
            quantity: new UntypedFormControl(1, { updateOn: 'blur' }),
        });
        this.CartOutlets = CartOutlets;
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        if (this.product) {
            this.productCode = this.product.code ?? '';
            this.setStockInfo(this.product);
            this.cd.markForCheck();
        }
        else if (this.productCode) {
            // force hasStock and quantity for the time being, as we do not have more info:
            this.quantity = 1;
            this.hasStock = true;
            this.cd.markForCheck();
        }
        else {
            this.subscription = (this.productListItemContext
                ? this.productListItemContext.product$
                : this.currentProductService.getProduct())
                .pipe(filter(isNotNullable))
                .subscribe((product) => {
                this.productCode = product.code ?? '';
                this.setStockInfo(product);
                this.cd.markForCheck();
            });
        }
    }
    setStockInfo(product) {
        this.quantity = 1;
        this.addToCartForm.controls['quantity'].setValue(1);
        this.hasStock = Boolean(product.stock?.stockLevelStatus !== 'outOfStock');
        this.inventoryThreshold = product.stock?.isValueRounded ?? false;
        if (this.hasStock && product.stock?.stockLevel) {
            this.maxQuantity = product.stock.stockLevel;
        }
        if (this.productListItemContext) {
            this.showQuantity = false;
        }
    }
    /**
     * In specific scenarios, we need to omit displaying the stock level or append a plus to the value.
     * When backoffice forces a product to be in stock, omit showing the stock level.
     * When product stock level is limited by a threshold value, append '+' at the end.
     * When out of stock, display no numerical value.
     */
    getInventory() {
        if (this.hasStock) {
            const quantityDisplay = this.maxQuantity
                ? this.maxQuantity.toString()
                : '';
            return this.inventoryThreshold ? quantityDisplay + '+' : quantityDisplay;
        }
        else {
            return '';
        }
    }
    updateCount(value) {
        this.quantity = value;
    }
    addToCart() {
        const quantity = this.addToCartForm.get('quantity')?.value;
        if (!this.productCode || quantity <= 0) {
            return;
        }
        if (this.pickupOptionCompRef instanceof ComponentRef) {
            this.pickupOptionCompRef.instance.intendedPickupLocation$
                .pipe(take(1))
                .subscribe((intendedPickupLocation) => {
                this.pickupStore =
                    intendedPickupLocation?.pickupOption === 'pickup'
                        ? intendedPickupLocation.name
                        : undefined;
            });
        }
        this.activeCartService
            .getEntries()
            .pipe(take(1))
            .subscribe((cartEntries) => {
            this.activeCartService.addEntry(this.productCode, quantity, this.pickupStore);
            // A CartUiEventAddToCart is dispatched.  This event is intended for the UI
            // responsible to provide feedback about what was added to the cart, like
            // the added to cart dialog.
            //
            // Because we call activeCartService.getEntries() before, we can be sure the
            // cart library is loaded already and that the event listener exists.
            this.eventService.dispatch(this.createCartUiEventAddToCart(this.productCode, quantity, cartEntries.length, this.pickupStore));
        });
    }
    createCartUiEventAddToCart(productCode, quantity, numberOfEntriesBeforeAdd, storeName) {
        const newEvent = new CartUiEventAddToCart();
        newEvent.productCode = productCode;
        newEvent.quantity = quantity;
        newEvent.numberOfEntriesBeforeAdd = numberOfEntriesBeforeAdd;
        newEvent.pickupStoreName = storeName;
        return newEvent;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
AddToCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.ChangeDetectorRef }, { token: i1$1.ActiveCartFacade }, { token: i1.CmsComponentData }, { token: i2.EventService }, { token: i1.ProductListItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AddToCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddToCartComponent, selector: "cx-add-to-cart", inputs: { productCode: "productCode", showQuantity: "showQuantity", options: "options", pickupStore: "pickupStore", product: "product" }, ngImport: i0, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"hasStock\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ADD_TO_CART_PICKUP_OPTION\"\n      [(cxComponentRef)]=\"pickupOptionCompRef\"\n    ></ng-template>\n  </ng-container>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'btn btn-tertiary'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <span\n      *ngIf=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n      \"\n      class=\"repeat-icon\"\n      ><cx-icon [type]=\"iconTypes.REPEAT\"></cx-icon\n    ></span>\n    <span\n      attr.aria-label=\"{{\n        options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate)\n      }}\"\n      [ngClass]=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n          ? 'buyItAgainLink'\n          : ''\n      \"\n    >\n      {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n    </span>\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "directive", type: i1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"hasStock\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ADD_TO_CART_PICKUP_OPTION\"\n      [(cxComponentRef)]=\"pickupOptionCompRef\"\n    ></ng-template>\n  </ng-container>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'btn btn-tertiary'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <span\n      *ngIf=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n      \"\n      class=\"repeat-icon\"\n      ><cx-icon [type]=\"iconTypes.REPEAT\"></cx-icon\n    ></span>\n    <span\n      attr.aria-label=\"{{\n        options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate)\n      }}\"\n      [ngClass]=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n          ? 'buyItAgainLink'\n          : ''\n      \"\n    >\n      {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n    </span>\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.ChangeDetectorRef }, { type: i1$1.ActiveCartFacade }, { type: i1.CmsComponentData }, { type: i2.EventService }, { type: i1.ProductListItemContext, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { productCode: [{
                type: Input
            }], showQuantity: [{
                type: Input
            }], options: [{
                type: Input
            }], pickupStore: [{
                type: Input
            }], product: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddToCartModule {
}
AddToCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddToCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, declarations: [AddToCartComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        OutletModule], exports: [AddToCartComponent] });
AddToCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProductAddToCartComponent: {
                    component: AddToCartComponent,
                    data: {
                        inventoryDisplay: false,
                    },
                },
            },
        }),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        OutletModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        OutletModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductAddToCartComponent: {
                                    component: AddToCartComponent,
                                    data: {
                                        inventoryDisplay: false,
                                    },
                                },
                            },
                        }),
                    ],
                    declarations: [AddToCartComponent],
                    exports: [AddToCartComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartSharedModule {
}
CartSharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartSharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, declarations: [CartItemComponent,
        OrderSummaryComponent,
        CartItemListComponent,
        CartItemListRowComponent], imports: [AtMessageModule,
        CartCouponModule,
        CartItemValidationWarningModule,
        CommonModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        OutletModule,
        PromotionsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        AddToCartModule], exports: [CartItemComponent,
        CartItemListRowComponent,
        CartItemListComponent,
        OrderSummaryComponent] });
CartSharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, providers: [
        provideOutlet({
            id: CartOutlets.ORDER_SUMMARY,
            component: OrderSummaryComponent,
        }),
        provideOutlet({
            id: CartOutlets.CART_ITEM_LIST,
            component: CartItemListComponent,
        }),
    ], imports: [AtMessageModule,
        CartCouponModule,
        CartItemValidationWarningModule,
        CommonModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        OutletModule,
        PromotionsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        AddToCartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CartCouponModule,
                        CartItemValidationWarningModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        MediaModule,
                        OutletModule,
                        PromotionsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        AddToCartModule,
                    ],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ORDER_SUMMARY,
                            component: OrderSummaryComponent,
                        }),
                        provideOutlet({
                            id: CartOutlets.CART_ITEM_LIST,
                            component: CartItemListComponent,
                        }),
                    ],
                    declarations: [
                        CartItemComponent,
                        OrderSummaryComponent,
                        CartItemListComponent,
                        CartItemListRowComponent,
                    ],
                    exports: [
                        CartItemComponent,
                        CartItemListRowComponent,
                        CartItemListComponent,
                        OrderSummaryComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAddedToCartLayoutConfig = {
    launch: {
        ADDED_TO_CART: {
            inlineRoot: true,
            component: AddedToCartDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddedToCartDialogModule {
    constructor(_addToCartDialogEventListener) {
        // Intentional empty constructor
    }
}
AddedToCartDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, deps: [{ token: AddedToCartDialogEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
AddedToCartDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, declarations: [AddedToCartDialogComponent], imports: [CommonModule,
        ReactiveFormsModule,
        CartSharedModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule], exports: [AddedToCartDialogComponent] });
AddedToCartDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, providers: [provideDefaultConfig(defaultAddedToCartLayoutConfig)], imports: [CommonModule,
        ReactiveFormsModule,
        CartSharedModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        CartSharedModule,
                        RouterModule,
                        SpinnerModule,
                        PromotionsModule,
                        UrlModule,
                        IconModule,
                        I18nModule,
                        ItemCounterModule,
                        KeyboardFocusModule,
                    ],
                    providers: [provideDefaultConfig(defaultAddedToCartLayoutConfig)],
                    declarations: [AddedToCartDialogComponent],
                    exports: [AddedToCartDialogComponent],
                }]
        }], ctorParameters: function () { return [{ type: AddedToCartDialogEventListener }]; } });

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
class ClearCartComponent {
    constructor(activeCartFacade, vcr, launchDialogService) {
        this.activeCartFacade = activeCartFacade;
        this.vcr = vcr;
        this.launchDialogService = launchDialogService;
        this.cart$ = this.activeCartFacade.getActive();
        this.subscription = new Subscription();
    }
    openDialog(event) {
        const dialog = this.launchDialogService.openDialog("CLEAR_CART" /* LAUNCH_CALLER.CLEAR_CART */, this.element, this.vcr);
        if (dialog) {
            this.subscription.add(dialog.pipe(take(1)).subscribe());
        }
        event.stopPropagation();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ClearCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartComponent, deps: [{ token: i1$1.ActiveCartFacade }, { token: i0.ViewContainerRef }, { token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ClearCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ClearCartComponent, selector: "cx-clear-cart", viewQueries: [{ propertyName: "element", first: true, predicate: ["element"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div *ngIf=\"cart.totalItems > 0\" class=\"clear-cart-wrapper\">\n    <button\n      #element\n      (click)=\"openDialog($event)\"\n      class=\"btn btn-tertiary clear-cart-btn\"\n      type=\"button\"\n    >\n      {{ 'clearCart.clearCart' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-clear-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <div *ngIf=\"cart.totalItems > 0\" class=\"clear-cart-wrapper\">\n    <button\n      #element\n      (click)=\"openDialog($event)\"\n      class=\"btn btn-tertiary clear-cart-btn\"\n      type=\"button\"\n    >\n      {{ 'clearCart.clearCart' | cxTranslate }}\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveCartFacade }, { type: i0.ViewContainerRef }, { type: i1.LaunchDialogService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['element']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ClearCartDialogComponentService {
    constructor(launchDialogService, globalMessageService, activeCartFacade, multiCartFacade, userIdService, eventService) {
        this.launchDialogService = launchDialogService;
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
    }
    /**
     * Clear the cart by deleting the active cart.
     */
    deleteActiveCart() {
        this.activeCartFacade
            .getActiveCartId()
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1), tap(([cartId, userId]) => {
            this.multiCartFacade.deleteCart(cartId, userId);
        }), switchMap(() => merge(this.eventService.get(DeleteCartSuccessEvent).pipe(map(() => true)), this.eventService.get(DeleteCartFailEvent).pipe(map(() => false))).pipe(take(1))), tap(() => this.closeDialog('Close dialog after cart cleared')))
            .subscribe((success) => {
            this.displayGlobalMessage(success);
        });
    }
    /**
     * Close clear cart modal dialog
     *
     * @param reason to close dialog
     */
    closeDialog(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    /**
     * Display global message after clearing cart.
     * By default, only message displayed is of type `Success`. A negative scenario
     * related to cart has been handled in the occ layer already.
     *
     * @param success result of clear cart action
     */
    displayGlobalMessage(success) {
        if (success) {
            this.globalMessageService.add({ key: 'clearCart.cartClearedSuccessfully' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
}
ClearCartDialogComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponentService, deps: [{ token: i1.LaunchDialogService }, { token: i2.GlobalMessageService }, { token: i1$1.ActiveCartFacade }, { token: i1$1.MultiCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
ClearCartDialogComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i2.GlobalMessageService }, { type: i1$1.ActiveCartFacade }, { type: i1$1.MultiCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ClearCartDialogComponent {
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    constructor(el, clearCartDialogComponentService) {
        this.el = el;
        this.clearCartDialogComponentService = clearCartDialogComponentService;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button.btn-primary',
            focusOnEscape: true,
        };
        this.isClearing = false;
        this.iconTypes = ICON_TYPE;
    }
    clearCart() {
        this.isClearing = true;
        this.clearCartDialogComponentService.deleteActiveCart();
    }
    close(reason) {
        this.clearCartDialogComponentService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.close('close dialog on component destroy');
    }
}
ClearCartDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponent, deps: [{ token: i0.ElementRef }, { token: ClearCartDialogComponentService }], target: i0.ɵɵFactoryTarget.Component });
ClearCartDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ClearCartDialogComponent, selector: "cx-clear-cart-dialog", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-clear-cart-dialog\"\n>\n  <div class=\"cx-clear-cart-container\">\n    <ng-container *ngIf=\"!isClearing; else loading\">\n      <div\n        role=\"status\"\n        [attr.aria-label]=\"'common.loaded' | cxTranslate\"\n      ></div>\n      <!-- Modal Header -->\n      <div class=\"modal-header cx-clear-cart-header\">\n        <div class=\"cx-clear-cart-title modal-title\">\n          {{ 'clearCart.clearCart' | cxTranslate }}\n        </div>\n\n        <button\n          (click)=\"close('Close Clear Cart Dialog')\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          class=\"close\"\n          type=\"button\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <!-- Modal Body -->\n      <div class=\"cx-clear-cart-body\">\n        <div class=\"clear-cart-msg\">\n          {{ 'clearCart.allItemsWillBeRemoved' | cxTranslate }}\n        </div>\n        <div class=\"clear-cart-warning\" role=\"alert\">\n          {{ 'clearCart.areYouSureToClearCart' | cxTranslate }}\n        </div>\n        <div>\n          <div class=\"cx-clear-cart-footer\">\n            <button\n              (click)=\"close('Cancel Clear Cart')\"\n              class=\"btn btn-secondary\"\n              type=\"button\"\n            >\n              {{ 'common.cancel' | cxTranslate }}\n            </button>\n            <button (click)=\"clearCart()\" class=\"btn btn-primary\" type=\"button\">\n              {{ 'clearCart.clearCart' | cxTranslate }}\n            </button>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #loading>\n  <div class=\"modal-header cx-clear-cart-header\">\n    <div class=\"cx-clear-cart-title modal-title\">\n      {{ 'clearCart.clearingCart' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.SpinnerComponent, selector: "cx-spinner" }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-clear-cart-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"close('Escape clicked')\"\n  class=\"cx-clear-cart-dialog\"\n>\n  <div class=\"cx-clear-cart-container\">\n    <ng-container *ngIf=\"!isClearing; else loading\">\n      <div\n        role=\"status\"\n        [attr.aria-label]=\"'common.loaded' | cxTranslate\"\n      ></div>\n      <!-- Modal Header -->\n      <div class=\"modal-header cx-clear-cart-header\">\n        <div class=\"cx-clear-cart-title modal-title\">\n          {{ 'clearCart.clearCart' | cxTranslate }}\n        </div>\n\n        <button\n          (click)=\"close('Close Clear Cart Dialog')\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          class=\"close\"\n          type=\"button\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <!-- Modal Body -->\n      <div class=\"cx-clear-cart-body\">\n        <div class=\"clear-cart-msg\">\n          {{ 'clearCart.allItemsWillBeRemoved' | cxTranslate }}\n        </div>\n        <div class=\"clear-cart-warning\" role=\"alert\">\n          {{ 'clearCart.areYouSureToClearCart' | cxTranslate }}\n        </div>\n        <div>\n          <div class=\"cx-clear-cart-footer\">\n            <button\n              (click)=\"close('Cancel Clear Cart')\"\n              class=\"btn btn-secondary\"\n              type=\"button\"\n            >\n              {{ 'common.cancel' | cxTranslate }}\n            </button>\n            <button (click)=\"clearCart()\" class=\"btn btn-primary\" type=\"button\">\n              {{ 'clearCart.clearCart' | cxTranslate }}\n            </button>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #loading>\n  <div class=\"modal-header cx-clear-cart-header\">\n    <div class=\"cx-clear-cart-title modal-title\">\n      {{ 'clearCart.clearingCart' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: ClearCartDialogComponentService }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ClearCartDialogModule {
}
ClearCartDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ClearCartDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogModule, declarations: [ClearCartDialogComponent], imports: [CommonModule,
        SpinnerModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule], exports: [ClearCartDialogComponent] });
ClearCartDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogModule, imports: [CommonModule,
        SpinnerModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        SpinnerModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [ClearCartDialogComponent],
                    exports: [ClearCartDialogComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultClearCartLayoutConfig = {
    launch: {
        CLEAR_CART: {
            inline: true,
            component: ClearCartDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ClearCartModule {
}
ClearCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ClearCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, declarations: [ClearCartComponent], imports: [CommonModule, I18nModule, ClearCartDialogModule], exports: [ClearCartComponent] });
ClearCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ClearCartComponent: {
                    component: ClearCartComponent,
                },
            },
        }),
        provideDefaultConfig(defaultClearCartLayoutConfig),
    ], imports: [CommonModule, I18nModule, ClearCartDialogModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ClearCartComponent],
                    exports: [ClearCartComponent],
                    imports: [CommonModule, I18nModule, ClearCartDialogModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ClearCartComponent: {
                                    component: ClearCartComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultClearCartLayoutConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationWarningsComponent {
    constructor(cartValidationFacade) {
        this.cartValidationFacade = cartValidationFacade;
        this.iconTypes = ICON_TYPE;
        this.visibleWarnings = {};
        this.cartModifications$ = this.cartValidationFacade.getValidationResults().pipe(map((modificationList) => {
            const result = modificationList.filter((modification) => modification.statusCode === CartValidationStatusCode.NO_STOCK);
            result.forEach((modification) => {
                if (modification.entry?.product?.code) {
                    this.visibleWarnings[modification.entry.product.code] = true;
                }
            });
            return result;
        }));
    }
    removeMessage(cartModification) {
        if (cartModification.entry?.product?.code) {
            this.visibleWarnings[cartModification.entry.product.code] = false;
        }
    }
}
CartValidationWarningsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsComponent, deps: [{ token: i1$1.CartValidationFacade }], target: i0.ɵɵFactoryTarget.Component });
CartValidationWarningsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartValidationWarningsComponent, selector: "cx-cart-validation-warnings", ngImport: i0, template: "<ng-container *ngFor=\"let cartModification of cartModifications$ | async\">\n  <div\n    class=\"alert alert-danger\"\n    *ngIf=\"visibleWarnings[cartModification.entry.product.code]\"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    </span>\n    <span>\n      <a\n        [routerLink]=\"\n          { cxRoute: 'product', params: cartModification.entry.product } | cxUrl\n        \"\n      >\n        {{ cartModification.entry.product.name }}\n      </a>\n      {{ 'validation.productOutOfStock' | cxTranslate }}\n    </span>\n\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"removeMessage(cartModification)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-validation-warnings', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngFor=\"let cartModification of cartModifications$ | async\">\n  <div\n    class=\"alert alert-danger\"\n    *ngIf=\"visibleWarnings[cartModification.entry.product.code]\"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    </span>\n    <span>\n      <a\n        [routerLink]=\"\n          { cxRoute: 'product', params: cartModification.entry.product } | cxUrl\n        \"\n      >\n        {{ cartModification.entry.product.name }}\n      </a>\n      {{ 'validation.productOutOfStock' | cxTranslate }}\n    </span>\n\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"removeMessage(cartModification)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CartValidationFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartDetailsComponent {
    constructor(activeCartService, selectiveCartService, authService, routingService, cartConfig) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.authService = authService;
        this.routingService = routingService;
        this.cartConfig = cartConfig;
        this.loggedIn = false;
        this.promotionLocation = PromotionLocation.ActiveCart;
    }
    ngOnInit() {
        this.cart$ = this.activeCartService.getActive();
        this.entries$ = this.activeCartService
            .getEntries()
            .pipe(filter((entries) => entries.length > 0));
        this.selectiveCartEnabled = this.cartConfig.isSelectiveCartEnabled();
        this.cartLoaded$ = combineLatest([
            this.activeCartService.isStable(),
            this.selectiveCartEnabled
                ? this.selectiveCartService.isStable()
                : of(false),
            this.authService.isUserLoggedIn(),
        ]).pipe(tap(([, , loggedIn]) => (this.loggedIn = loggedIn)), map(([cartLoaded, sflLoaded, loggedIn]) => loggedIn && this.selectiveCartEnabled
            ? cartLoaded && sflLoaded
            : cartLoaded));
    }
    saveForLater(item) {
        if (this.loggedIn) {
            this.activeCartService.removeEntry(item);
            this.selectiveCartService.addEntry(item.product?.code ?? '', item.quantity ?? 0);
        }
        else {
            this.routingService.go({ cxRoute: 'login' });
        }
    }
}
CartDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsComponent, deps: [{ token: i1$1.ActiveCartFacade }, { token: i1$1.SelectiveCartFacade }, { token: i2.AuthService }, { token: i2.RoutingService }, { token: i3.CartConfigService }], target: i0.ɵɵFactoryTarget.Component });
CartDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartDetailsComponent, selector: "cx-cart-details", ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <div *ngIf=\"cart.totalItems > 0\" class=\"cart-details-wrapper\">\n      <cx-cart-validation-warnings></cx-cart-validation-warnings>\n\n      <h2 class=\"cx-total\">\n        {{ 'cartDetails.cartName' | cxTranslate: { code: cart.code } }}\n      </h2>\n\n      <cx-promotions\n        [promotions]=\"\n          (cart.appliedOrderPromotions || []).concat(\n            cart.potentialOrderPromotions || []\n          )\n        \"\n      ></cx-promotions>\n\n      <cx-cart-item-list\n        [items]=\"entries\"\n        [cartIsLoading]=\"!(cartLoaded$ | async)\"\n        [promotionLocation]=\"promotionLocation\"\n        [options]=\"{\n          isSaveForLater: false,\n          optionalBtn: saveForLaterBtn\n        }\"\n      ></cx-cart-item-list>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template let-ctx #saveForLaterBtn>\n  <button\n    *ngIf=\"selectiveCartEnabled\"\n    class=\"btn btn-tertiary cx-sfl-btn\"\n    [disabled]=\"ctx.loading\"\n    (click)=\"saveForLater(ctx.item)\"\n    type=\"button\"\n  >\n    {{ 'saveForLaterItems.saveForLater' | cxTranslate }}\n  </button>\n</ng-template>\n", dependencies: [{ kind: "component", type: CartItemListComponent, selector: "cx-cart-item-list", inputs: ["readonly", "hasHeader", "options", "cartId", "items", "promotionLocation", "cartIsLoading"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.PromotionsComponent, selector: "cx-promotions", inputs: ["promotions"] }, { kind: "component", type: CartValidationWarningsComponent, selector: "cx-cart-validation-warnings" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-details', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <div *ngIf=\"cart.totalItems > 0\" class=\"cart-details-wrapper\">\n      <cx-cart-validation-warnings></cx-cart-validation-warnings>\n\n      <h2 class=\"cx-total\">\n        {{ 'cartDetails.cartName' | cxTranslate: { code: cart.code } }}\n      </h2>\n\n      <cx-promotions\n        [promotions]=\"\n          (cart.appliedOrderPromotions || []).concat(\n            cart.potentialOrderPromotions || []\n          )\n        \"\n      ></cx-promotions>\n\n      <cx-cart-item-list\n        [items]=\"entries\"\n        [cartIsLoading]=\"!(cartLoaded$ | async)\"\n        [promotionLocation]=\"promotionLocation\"\n        [options]=\"{\n          isSaveForLater: false,\n          optionalBtn: saveForLaterBtn\n        }\"\n      ></cx-cart-item-list>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template let-ctx #saveForLaterBtn>\n  <button\n    *ngIf=\"selectiveCartEnabled\"\n    class=\"btn btn-tertiary cx-sfl-btn\"\n    [disabled]=\"ctx.loading\"\n    (click)=\"saveForLater(ctx.item)\"\n    type=\"button\"\n  >\n    {{ 'saveForLaterItems.saveForLater' | cxTranslate }}\n  </button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveCartFacade }, { type: i1$1.SelectiveCartFacade }, { type: i2.AuthService }, { type: i2.RoutingService }, { type: i3.CartConfigService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartValidationWarningsModule {
}
CartValidationWarningsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartValidationWarningsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, declarations: [CartValidationWarningsComponent], imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule], exports: [CartValidationWarningsComponent] });
CartValidationWarningsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationWarningsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, I18nModule, UrlModule, IconModule],
                    exports: [CartValidationWarningsComponent],
                    declarations: [CartValidationWarningsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartDetailsModule {
}
CartDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, declarations: [CartDetailsComponent], imports: [CartSharedModule,
        CommonModule,
        CartCouponModule,
        RouterModule,
        UrlModule,
        PromotionsModule,
        I18nModule,
        CartValidationWarningsModule], exports: [CartDetailsComponent] });
CartDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartComponent: {
                    component: CartDetailsComponent,
                },
            },
        }),
    ], imports: [CartSharedModule,
        CommonModule,
        CartCouponModule,
        RouterModule,
        UrlModule,
        PromotionsModule,
        I18nModule,
        CartValidationWarningsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CartSharedModule,
                        CommonModule,
                        CartCouponModule,
                        RouterModule,
                        UrlModule,
                        PromotionsModule,
                        I18nModule,
                        CartValidationWarningsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartComponent: {
                                    component: CartDetailsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartDetailsComponent],
                    exports: [CartDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartPageLayoutHandler {
    constructor(activeCartService, selectiveCartService, cartConfig) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.cartConfig = cartConfig;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === 'CartPageTemplate' && !section) {
            return combineLatest([
                slots$,
                this.activeCartService.getActive(),
                this.getSelectiveCart(),
                this.activeCartService.getLoading(),
            ]).pipe(map(([slots, cart, selectiveCart, loadingCart]) => {
                const exclude = (arr, args) => arr.filter((item) => args.every((arg) => arg !== item));
                return isEmpty(cart) && loadingCart
                    ? exclude(slots, [
                        'TopContent',
                        'CenterRightContentSlot',
                        'EmptyCartMiddleContent',
                    ])
                    : cart.totalItems
                        ? exclude(slots, ['EmptyCartMiddleContent'])
                        : selectiveCart?.totalItems
                            ? exclude(slots, [
                                'EmptyCartMiddleContent',
                                'CenterRightContentSlot',
                            ])
                            : exclude(slots, ['TopContent', 'CenterRightContentSlot']);
            }));
        }
        return slots$;
    }
    getSelectiveCart() {
        return this.cartConfig.isSelectiveCartEnabled()
            ? this.selectiveCartService.getCart().pipe(startWith(null))
            : of({});
    }
}
CartPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageLayoutHandler, deps: [{ token: i1$1.ActiveCartFacade }, { token: i1$1.SelectiveCartFacade }, { token: i3.CartConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CartPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveCartFacade }, { type: i1$1.SelectiveCartFacade }, { type: i3.CartConfigService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartProceedToCheckoutComponent {
    constructor(router, cd) {
        this.router = router;
        this.cd = cd;
        this.cartValidationInProgress = false;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel) {
                this.cartValidationInProgress = false;
                this.cd?.markForCheck();
            }
        }));
    }
    disableButtonWhileNavigation() {
        this.cartValidationInProgress = true;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CartProceedToCheckoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutComponent, deps: [{ token: i1$2.Router }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
CartProceedToCheckoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartProceedToCheckoutComponent, selector: "cx-cart-proceed-to-checkout", ngImport: i0, template: "<cx-progress-button\n  (clickEvent)=\"disableButtonWhileNavigation()\"\n  [class]=\"'btn btn-primary btn-block'\"\n  [disabled]=\"cartValidationInProgress\"\n  [loading]=\"cartValidationInProgress\"\n  [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n  tabindex=\"-1\"\n>\n  {{\n    (cartValidationInProgress\n      ? 'validation.inProgress'\n      : 'cartDetails.proceedToCheckout'\n    ) | cxTranslate\n  }}\n</cx-progress-button>\n", dependencies: [{ kind: "component", type: i1.ProgressButtonComponent, selector: "cx-progress-button", inputs: ["ariaLabel", "class", "disabled", "loading"], outputs: ["clickEvent"] }, { kind: "directive", type: i1$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-proceed-to-checkout', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-progress-button\n  (clickEvent)=\"disableButtonWhileNavigation()\"\n  [class]=\"'btn btn-primary btn-block'\"\n  [disabled]=\"cartValidationInProgress\"\n  [loading]=\"cartValidationInProgress\"\n  [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n  tabindex=\"-1\"\n>\n  {{\n    (cartValidationInProgress\n      ? 'validation.inProgress'\n      : 'cartDetails.proceedToCheckout'\n    ) | cxTranslate\n  }}\n</cx-progress-button>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.Router }, { type: i0.ChangeDetectorRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartProceedToCheckoutModule {
}
CartProceedToCheckoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartProceedToCheckoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, declarations: [CartProceedToCheckoutComponent], imports: [CommonModule,
        ProgressButtonModule,
        RouterModule,
        I18nModule,
        UrlModule], exports: [CartProceedToCheckoutComponent] });
CartProceedToCheckoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartProceedToCheckoutComponent: {
                    component: CartProceedToCheckoutComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ProgressButtonModule,
        RouterModule,
        I18nModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ProgressButtonModule,
                        RouterModule,
                        I18nModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartProceedToCheckoutComponent: {
                                    component: CartProceedToCheckoutComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartProceedToCheckoutComponent],
                    exports: [CartProceedToCheckoutComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartTotalsComponent {
    constructor(activeCartService) {
        this.activeCartService = activeCartService;
    }
    ngOnInit() {
        this.cart$ = this.activeCartService.getActive();
    }
}
CartTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsComponent, deps: [{ token: i1$1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
CartTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartTotalsComponent, selector: "cx-cart-totals", ngImport: i0, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <cx-order-summary [cart]=\"cart\"></cx-order-summary>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: OrderSummaryComponent, selector: "cx-order-summary", inputs: ["cart"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cart$ | async as cart\">\n  <cx-order-summary [cart]=\"cart\"></cx-order-summary>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartTotalsModule {
}
CartTotalsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartTotalsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsModule, declarations: [CartTotalsComponent], imports: [CommonModule, CartSharedModule], exports: [CartTotalsComponent] });
CartTotalsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CartTotalsComponent: {
                    component: CartTotalsComponent,
                },
            },
        }),
    ], imports: [CommonModule, CartSharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartTotalsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CartSharedModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CartTotalsComponent: {
                                    component: CartTotalsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [CartTotalsComponent],
                    exports: [CartTotalsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ActiveCartOrderEntriesContext {
    constructor(importInfoService, activeCartFacade) {
        this.importInfoService = importInfoService;
        this.activeCartFacade = activeCartFacade;
        this.type = OrderEntriesSource.ACTIVE_CART;
    }
    addEntries(products) {
        return this.add(products).pipe(switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    getEntries() {
        return this.activeCartFacade.getEntries();
    }
    add(products) {
        this.activeCartFacade.addEntries(this.mapProductsToOrderEntries(products));
        return this.activeCartFacade.getActiveCartId();
    }
    mapProductsToOrderEntries(products) {
        return products.map((product) => ({
            product: { code: product.productCode },
            quantity: product.quantity,
        }));
    }
}
ActiveCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartOrderEntriesContext, deps: [{ token: i3.ProductImportInfoService }, { token: i1$1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.ProductImportInfoService }, { type: i1$1.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SaveForLaterComponent {
    constructor(cmsService, cartService, selectiveCartService) {
        this.cmsService = cmsService;
        this.cartService = cartService;
        this.selectiveCartService = selectiveCartService;
        this.CartLocation = PromotionLocation;
    }
    ngOnInit() {
        this.isCartEmpty$ = this.cartService
            .getActive()
            .pipe(map((cart) => !(cart && cart.totalItems && cart.totalItems > 0)));
        this.saveForLater$ = this.selectiveCartService.getCart();
        this.entries$ = this.selectiveCartService
            .getEntries()
            .pipe(filter((entries) => entries.length > 0));
        this.cartLoaded$ = combineLatest([
            this.cartService.isStable(),
            this.selectiveCartService.isStable(),
        ]).pipe(map(([cartLoaded, sflLoaded]) => cartLoaded && sflLoaded));
        this.data$ = this.cmsService.getComponentData('EmptyCartParagraphComponent');
    }
    moveToCart(item) {
        this.selectiveCartService.removeEntry(item);
        this.cartService.addEntry(item.product?.code ?? '', item.quantity ?? 0);
    }
}
SaveForLaterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterComponent, deps: [{ token: i2.CmsService }, { token: i1$1.ActiveCartFacade }, { token: i1$1.SelectiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
SaveForLaterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SaveForLaterComponent, selector: "cx-save-for-later", ngImport: i0, template: "<ng-container *ngIf=\"isCartEmpty$ | async\">\n  <p\n    *ngIf=\"data$ | async as data\"\n    [innerHTML]=\"data.content\"\n    class=\"cx-empty-cart-info\"\n  ></p>\n</ng-container>\n\n<ng-container *ngIf=\"saveForLater$ | async as saveForLater\">\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <div *ngIf=\"saveForLater.totalItems > 0\" class=\"cart-details-wrapper\">\n      <div class=\"cx-total\">\n        {{\n          'saveForLaterItems.itemTotal'\n            | cxTranslate: { count: saveForLater.totalItems }\n        }}\n      </div>\n      <cx-cart-item-list\n        [items]=\"entries\"\n        [readonly]=\"false\"\n        [cartIsLoading]=\"!(cartLoaded$ | async)\"\n        [promotionLocation]=\"CartLocation.SaveForLater\"\n        [options]=\"{\n          isSaveForLater: true,\n          optionalBtn: moveToCartBtn\n        }\"\n      ></cx-cart-item-list>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template let-ctx #moveToCartBtn>\n  <button\n    class=\"btn btn-tertiary cx-sfl-btn\"\n    [disabled]=\"ctx.loading\"\n    (click)=\"moveToCart(ctx.item)\"\n    type=\"button\"\n  >\n    {{ 'saveForLaterItems.moveToCart' | cxTranslate }}\n  </button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CartItemListComponent, selector: "cx-cart-item-list", inputs: ["readonly", "hasHeader", "options", "cartId", "items", "promotionLocation", "cartIsLoading"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-save-for-later', template: "<ng-container *ngIf=\"isCartEmpty$ | async\">\n  <p\n    *ngIf=\"data$ | async as data\"\n    [innerHTML]=\"data.content\"\n    class=\"cx-empty-cart-info\"\n  ></p>\n</ng-container>\n\n<ng-container *ngIf=\"saveForLater$ | async as saveForLater\">\n  <ng-container *ngIf=\"entries$ | async as entries\">\n    <div *ngIf=\"saveForLater.totalItems > 0\" class=\"cart-details-wrapper\">\n      <div class=\"cx-total\">\n        {{\n          'saveForLaterItems.itemTotal'\n            | cxTranslate: { count: saveForLater.totalItems }\n        }}\n      </div>\n      <cx-cart-item-list\n        [items]=\"entries\"\n        [readonly]=\"false\"\n        [cartIsLoading]=\"!(cartLoaded$ | async)\"\n        [promotionLocation]=\"CartLocation.SaveForLater\"\n        [options]=\"{\n          isSaveForLater: true,\n          optionalBtn: moveToCartBtn\n        }\"\n      ></cx-cart-item-list>\n    </div>\n  </ng-container>\n</ng-container>\n\n<ng-template let-ctx #moveToCartBtn>\n  <button\n    class=\"btn btn-tertiary cx-sfl-btn\"\n    [disabled]=\"ctx.loading\"\n    (click)=\"moveToCart(ctx.item)\"\n    type=\"button\"\n  >\n    {{ 'saveForLaterItems.moveToCart' | cxTranslate }}\n  </button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i2.CmsService }, { type: i1$1.ActiveCartFacade }, { type: i1$1.SelectiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SaveForLaterModule {
}
SaveForLaterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SaveForLaterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, declarations: [SaveForLaterComponent], imports: [CommonModule, I18nModule, CartSharedModule], exports: [SaveForLaterComponent] });
SaveForLaterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SaveForLaterComponent: {
                    component: SaveForLaterComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, CartSharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SaveForLaterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, CartSharedModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SaveForLaterComponent: {
                                    component: SaveForLaterComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [SaveForLaterComponent],
                    exports: [SaveForLaterComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartBaseComponentsModule {
}
CartBaseComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, imports: [CommonModule,
        CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        SaveForLaterModule,
        ClearCartModule, i1.OutletModule], exports: [CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        ClearCartModule,
        AddedToCartDialogModule,
        SaveForLaterModule] });
CartBaseComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, providers: [
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: CartPageLayoutHandler,
            multi: true,
        },
        {
            provide: ActiveCartOrderEntriesContextToken,
            useExisting: ActiveCartOrderEntriesContext,
        },
    ], imports: [CommonModule,
        CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        SaveForLaterModule,
        ClearCartModule,
        OutletModule.forChild(), CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        ClearCartModule,
        AddedToCartDialogModule,
        SaveForLaterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CartDetailsModule,
                        CartProceedToCheckoutModule,
                        CartTotalsModule,
                        CartSharedModule,
                        SaveForLaterModule,
                        ClearCartModule,
                        OutletModule.forChild(),
                    ],
                    exports: [
                        CartDetailsModule,
                        CartProceedToCheckoutModule,
                        CartTotalsModule,
                        CartSharedModule,
                        ClearCartModule,
                        AddedToCartDialogModule,
                        SaveForLaterModule,
                    ],
                    providers: [
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: CartPageLayoutHandler,
                            multi: true,
                        },
                        {
                            provide: ActiveCartOrderEntriesContextToken,
                            useExisting: ActiveCartOrderEntriesContext,
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
class CartValidationComponentsModule {
}
CartValidationComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartValidationComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartValidationComponentsModule, imports: [CartValidationWarningsModule, CartItemValidationWarningModule] });
CartValidationComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationComponentsModule, imports: [CartValidationWarningsModule, CartItemValidationWarningModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CartValidationWarningsModule, CartItemValidationWarningModule],
                    providers: [],
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

export { ActiveCartOrderEntriesContext, AddedToCartDialogComponent, AddedToCartDialogEventListener, AddedToCartDialogModule, AppliedCouponsComponent, CartBaseComponentsModule, CartCouponComponent, CartCouponModule, CartDetailsComponent, CartDetailsModule, CartItemComponent, CartItemContextSource, CartItemListComponent, CartItemListRowComponent, CartPageLayoutHandler, CartProceedToCheckoutComponent, CartProceedToCheckoutModule, CartSharedModule, CartTotalsComponent, CartTotalsModule, CartValidationComponentsModule, CartValidationWarningsComponent, CartValidationWarningsModule, ClearCartComponent, ClearCartDialogComponent, ClearCartDialogComponentService, ClearCartDialogModule, ClearCartModule, OrderSummaryComponent, SaveForLaterComponent, SaveForLaterModule, defaultClearCartLayoutConfig };
//# sourceMappingURL=spartacus-cart-base-components.mjs.map
