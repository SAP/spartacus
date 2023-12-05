import * as i0 from '@angular/core';
import { ComponentRef, Component, ChangeDetectionStrategy, Optional, Input, NgModule } from '@angular/core';
import * as i5 from '@angular/forms';
import { UntypedFormGroup, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@spartacus/cart/base/root';
import { CartOutlets, CartUiEventAddToCart } from '@spartacus/cart/base/root';
import * as i3 from '@spartacus/core';
import { isNotNullable, I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { ICON_TYPE, IconModule, ItemCounterModule, OutletModule } from '@spartacus/storefront';
import { map, filter, take } from 'rxjs/operators';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

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
AddToCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.ChangeDetectorRef }, { token: i2.ActiveCartFacade }, { token: i1.CmsComponentData }, { token: i3.EventService }, { token: i1.ProductListItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AddToCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddToCartComponent, selector: "cx-add-to-cart", inputs: { productCode: "productCode", showQuantity: "showQuantity", options: "options", pickupStore: "pickupStore", product: "product" }, ngImport: i0, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"hasStock\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ADD_TO_CART_PICKUP_OPTION\"\n      [(cxComponentRef)]=\"pickupOptionCompRef\"\n    ></ng-template>\n  </ng-container>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'btn btn-tertiary'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <span\n      *ngIf=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n      \"\n      class=\"repeat-icon\"\n      ><cx-icon [type]=\"iconTypes.REPEAT\"></cx-icon\n    ></span>\n    <span\n      attr.aria-label=\"{{\n        options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate)\n      }}\"\n      [ngClass]=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n          ? 'buyItAgainLink'\n          : ''\n      \"\n    >\n      {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n    </span>\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i5.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i5.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "directive", type: i1.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <div class=\"quantity\" *ngIf=\"showQuantity\">\n    <label>{{ 'addToCart.quantity' | cxTranslate }}</label>\n    <div class=\"cx-counter-stock\">\n      <cx-item-counter\n        *ngIf=\"hasStock\"\n        [max]=\"maxQuantity\"\n        [control]=\"addToCartForm.get('quantity')\"\n      ></cx-item-counter>\n\n      <span class=\"info\">\n        <span *ngIf=\"showInventory$ | async\">{{ getInventory() }}</span>\n        {{\n          hasStock\n            ? ('addToCart.inStock' | cxTranslate)\n            : ('addToCart.outOfStock' | cxTranslate)\n        }}</span\n      >\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"hasStock\">\n    <ng-template\n      [cxOutlet]=\"CartOutlets.ADD_TO_CART_PICKUP_OPTION\"\n      [(cxComponentRef)]=\"pickupOptionCompRef\"\n    ></ng-template>\n  </ng-container>\n\n  <button\n    *ngIf=\"hasStock\"\n    [ngClass]=\"\n      options?.displayAddToCart\n        ? 'btn btn-tertiary'\n        : 'btn btn-primary btn-block'\n    \"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <span\n      *ngIf=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n      \"\n      class=\"repeat-icon\"\n      ><cx-icon [type]=\"iconTypes.REPEAT\"></cx-icon\n    ></span>\n    <span\n      attr.aria-label=\"{{\n        options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate)\n      }}\"\n      [ngClass]=\"\n        options?.addToCartString === ('addToCart.buyItAgain' | cxTranslate)\n          ? 'buyItAgainLink'\n          : ''\n      \"\n    >\n      {{ options?.addToCartString ?? ('addToCart.addToCart' | cxTranslate) }}\n    </span>\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.ChangeDetectorRef }, { type: i2.ActiveCartFacade }, { type: i1.CmsComponentData }, { type: i3.EventService }, { type: i1.ProductListItemContext, decorators: [{
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

/**
 * Generated bundle index. Do not edit.
 */

export { AddToCartComponent, AddToCartModule };
//# sourceMappingURL=spartacus-cart-base-components-add-to-cart.mjs.map
