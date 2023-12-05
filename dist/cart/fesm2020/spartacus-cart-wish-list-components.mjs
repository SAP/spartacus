import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, NgModule } from '@angular/core';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i4 from '@spartacus/core';
import { I18nModule, UrlModule, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { ProductListItemContextSource, ProductListItemContext, AtMessageModule, ItemCounterModule, MediaModule, PageComponentModule, StarRatingModule } from '@spartacus/storefront';
import * as i1$1 from '@spartacus/cart/wish-list/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListItemComponent {
    constructor(productListItemContextSource) {
        this.productListItemContextSource = productListItemContextSource;
        this.isLoading = false;
        this.remove = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes?.cartEntry) {
            this.productListItemContextSource.product$.next(this.cartEntry.product);
        }
    }
    removeEntry(item) {
        this.remove.emit(item);
    }
}
WishListItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListItemComponent, deps: [{ token: i1.ProductListItemContextSource }], target: i0.ɵɵFactoryTarget.Component });
WishListItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: WishListItemComponent, selector: "[cx-wish-list-item], cx-wish-list-item", inputs: { isLoading: "isLoading", cartEntry: "cartEntry" }, outputs: { remove: "remove" }, providers: [
        ProductListItemContextSource,
        {
            provide: ProductListItemContext,
            useExisting: ProductListItemContextSource,
        },
    ], usesOnChanges: true, ngImport: i0, template: "<td role=\"cell\">\n  <div class=\"cx-table-item-container\">\n    <!-- Item Image -->\n    <a\n      [routerLink]=\"{ cxRoute: 'product', params: cartEntry.product } | cxUrl\"\n      tabindex=\"-1\"\n    >\n      <cx-media\n        [container]=\"cartEntry.product?.images?.PRIMARY\"\n        format=\"thumbnail\"\n      ></cx-media>\n    </a>\n    <div class=\"cx-info\">\n      <div *ngIf=\"cartEntry.product?.name\" class=\"cx-name\">\n        <a\n          class=\"cx-link\"\n          [routerLink]=\"\n            { cxRoute: 'product', params: cartEntry.product } | cxUrl\n          \"\n          >{{ cartEntry.product?.name }}</a\n        >\n      </div>\n      <div *ngIf=\"cartEntry.product?.code\" class=\"cx-code\">\n        {{ 'cartItems.id' | cxTranslate }} {{ cartEntry.product?.code }}\n      </div>\n    </div>\n  </div>\n  <!-- Variants -->\n  <ng-container *ngIf=\"cartEntry.product?.baseOptions?.length\">\n    <div\n      *ngFor=\"\n        let variant of cartEntry.product?.baseOptions[0]?.selected\n          ?.variantOptionQualifiers\n      \"\n      class=\"cx-property\"\n    >\n      <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n        {{ variant.name }}: {{ variant.value }}\n      </div>\n    </div>\n  </ng-container>\n</td>\n<!-- Item Price -->\n<td role=\"cell\" *ngIf=\"cartEntry.basePrice\" class=\"cx-price\">\n  <div class=\"cx-mobile-header\">\n    {{ 'cartItems.itemPrice' | cxTranslate }}\n  </div>\n  <div *ngIf=\"cartEntry.basePrice\" class=\"cx-value\">\n    {{ cartEntry.basePrice?.formattedValue }}\n  </div>\n</td>\n<!-- Action -->\n<td role=\"cell\" class=\"cx-actions\">\n  <ng-container\n    *ngIf=\"cartEntry.updateable\"\n    cxInnerComponentsHost\n  ></ng-container>\n  <ng-template #outOfStock>\n    <span class=\"cx-out-of-stock\">\n      {{ 'addToCart.outOfStock' | cxTranslate }}\n    </span>\n  </ng-template>\n  <button\n    *ngIf=\"cartEntry.updateable\"\n    (click)=\"removeEntry(cartEntry)\"\n    [cxAtMessage]=\"'wishlist.itemRemoved' | cxTranslate\"\n    [disabled]=\"isLoading\"\n    class=\"link cx-action-link cx-remove-btn\"\n  >\n    {{ 'common.remove' | cxTranslate }}\n  </button>\n</td>\n", dependencies: [{ kind: "directive", type: i1.AtMessageDirective, selector: "[cxAtMessage]", inputs: ["cxAtMessage"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i1.InnerComponentsHostDirective, selector: "[cxInnerComponentsHost]" }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: '[cx-wish-list-item], cx-wish-list-item', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        ProductListItemContextSource,
                        {
                            provide: ProductListItemContext,
                            useExisting: ProductListItemContextSource,
                        },
                    ], template: "<td role=\"cell\">\n  <div class=\"cx-table-item-container\">\n    <!-- Item Image -->\n    <a\n      [routerLink]=\"{ cxRoute: 'product', params: cartEntry.product } | cxUrl\"\n      tabindex=\"-1\"\n    >\n      <cx-media\n        [container]=\"cartEntry.product?.images?.PRIMARY\"\n        format=\"thumbnail\"\n      ></cx-media>\n    </a>\n    <div class=\"cx-info\">\n      <div *ngIf=\"cartEntry.product?.name\" class=\"cx-name\">\n        <a\n          class=\"cx-link\"\n          [routerLink]=\"\n            { cxRoute: 'product', params: cartEntry.product } | cxUrl\n          \"\n          >{{ cartEntry.product?.name }}</a\n        >\n      </div>\n      <div *ngIf=\"cartEntry.product?.code\" class=\"cx-code\">\n        {{ 'cartItems.id' | cxTranslate }} {{ cartEntry.product?.code }}\n      </div>\n    </div>\n  </div>\n  <!-- Variants -->\n  <ng-container *ngIf=\"cartEntry.product?.baseOptions?.length\">\n    <div\n      *ngFor=\"\n        let variant of cartEntry.product?.baseOptions[0]?.selected\n          ?.variantOptionQualifiers\n      \"\n      class=\"cx-property\"\n    >\n      <div class=\"cx-label\" *ngIf=\"variant.name && variant.value\">\n        {{ variant.name }}: {{ variant.value }}\n      </div>\n    </div>\n  </ng-container>\n</td>\n<!-- Item Price -->\n<td role=\"cell\" *ngIf=\"cartEntry.basePrice\" class=\"cx-price\">\n  <div class=\"cx-mobile-header\">\n    {{ 'cartItems.itemPrice' | cxTranslate }}\n  </div>\n  <div *ngIf=\"cartEntry.basePrice\" class=\"cx-value\">\n    {{ cartEntry.basePrice?.formattedValue }}\n  </div>\n</td>\n<!-- Action -->\n<td role=\"cell\" class=\"cx-actions\">\n  <ng-container\n    *ngIf=\"cartEntry.updateable\"\n    cxInnerComponentsHost\n  ></ng-container>\n  <ng-template #outOfStock>\n    <span class=\"cx-out-of-stock\">\n      {{ 'addToCart.outOfStock' | cxTranslate }}\n    </span>\n  </ng-template>\n  <button\n    *ngIf=\"cartEntry.updateable\"\n    (click)=\"removeEntry(cartEntry)\"\n    [cxAtMessage]=\"'wishlist.itemRemoved' | cxTranslate\"\n    [disabled]=\"isLoading\"\n    class=\"link cx-action-link cx-remove-btn\"\n  >\n    {{ 'common.remove' | cxTranslate }}\n  </button>\n</td>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ProductListItemContextSource }]; }, propDecorators: { isLoading: [{
                type: Input
            }], cartEntry: [{
                type: Input
            }], remove: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListComponent {
    constructor(wishListFacade) {
        this.wishListFacade = wishListFacade;
        this.wishList$ = this.wishListFacade.getWishList();
        this.loading$ = this.wishListFacade.getWishListLoading();
    }
    removeEntry(item) {
        this.wishListFacade.removeEntry(item);
    }
}
WishListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponent, deps: [{ token: i1$1.WishListFacade }], target: i0.ɵɵFactoryTarget.Component });
WishListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: WishListComponent, selector: "cx-wish-list", ngImport: i0, template: "<ng-container *ngIf=\"wishList$ | async as wishList\">\n  <table role=\"table\" *ngIf=\"wishList?.entries?.length > 0; else emptyWishList\">\n    <caption class=\"cx-visually-hidden\">\n      {{\n        'wishlist.caption' | cxTranslate\n      }}\n    </caption>\n    <thead>\n      <tr role=\"row\" class=\"cx-item-list-header cx-wish-list-header\">\n        <th role=\"columnheader\" class=\"cx-item-list-desc\">\n          {{ 'cartItems.description' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-price\">\n          {{ 'cartItems.itemPrice' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"cx-item-list-items\">\n      <tr\n        cx-wish-list-item\n        role=\"row\"\n        class=\"cx-item-list-row cx-wish-list-item-row\"\n        *ngFor=\"let entry of wishList?.entries\"\n        [cartEntry]=\"entry\"\n        [isLoading]=\"loading$ | async\"\n        (remove)=\"removeEntry($event)\"\n      ></tr>\n    </tbody>\n  </table>\n</ng-container>\n\n<ng-template #emptyWishList>\n  <h2>{{ 'wishlist.empty' | cxTranslate }}</h2>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: WishListItemComponent, selector: "[cx-wish-list-item], cx-wish-list-item", inputs: ["isLoading", "cartEntry"], outputs: ["remove"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-wish-list', template: "<ng-container *ngIf=\"wishList$ | async as wishList\">\n  <table role=\"table\" *ngIf=\"wishList?.entries?.length > 0; else emptyWishList\">\n    <caption class=\"cx-visually-hidden\">\n      {{\n        'wishlist.caption' | cxTranslate\n      }}\n    </caption>\n    <thead>\n      <tr role=\"row\" class=\"cx-item-list-header cx-wish-list-header\">\n        <th role=\"columnheader\" class=\"cx-item-list-desc\">\n          {{ 'cartItems.description' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-price\">\n          {{ 'cartItems.itemPrice' | cxTranslate }}\n        </th>\n        <th role=\"columnheader\" class=\"cx-item-list-actions\">\n          {{ 'cartItems.actions' | cxTranslate }}\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"cx-item-list-items\">\n      <tr\n        cx-wish-list-item\n        role=\"row\"\n        class=\"cx-item-list-row cx-wish-list-item-row\"\n        *ngFor=\"let entry of wishList?.entries\"\n        [cartEntry]=\"entry\"\n        [isLoading]=\"loading$ | async\"\n        (remove)=\"removeEntry($event)\"\n      ></tr>\n    </tbody>\n  </table>\n</ng-container>\n\n<ng-template #emptyWishList>\n  <h2>{{ 'wishlist.empty' | cxTranslate }}</h2>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.WishListFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class WishListComponentsModule {
}
WishListComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
WishListComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, declarations: [WishListComponent, WishListItemComponent], imports: [AtMessageModule,
        CommonModule,
        I18nModule,
        ItemCounterModule,
        MediaModule,
        PageComponentModule,
        RouterModule,
        StarRatingModule,
        UrlModule], exports: [WishListComponent, WishListItemComponent] });
WishListComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                WishListComponent: {
                    component: WishListComponent,
                    data: {
                        composition: {
                            inner: ['ProductAddToCartComponent'],
                        },
                    },
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [AtMessageModule,
        CommonModule,
        I18nModule,
        ItemCounterModule,
        MediaModule,
        PageComponentModule,
        RouterModule,
        StarRatingModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CommonModule,
                        I18nModule,
                        ItemCounterModule,
                        MediaModule,
                        PageComponentModule,
                        RouterModule,
                        StarRatingModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                WishListComponent: {
                                    component: WishListComponent,
                                    data: {
                                        composition: {
                                            inner: ['ProductAddToCartComponent'],
                                        },
                                    },
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [WishListComponent, WishListItemComponent],
                    exports: [WishListComponent, WishListItemComponent],
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

export { WishListComponent, WishListComponentsModule, WishListItemComponent };
//# sourceMappingURL=spartacus-cart-wish-list-components.mjs.map
