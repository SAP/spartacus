import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i3 from '@spartacus/core';
import { isNotNullable, I18nModule, UrlModule, provideDefaultConfig } from '@spartacus/core';
import * as i2 from '@spartacus/storefront';
import { ICON_TYPE, IconModule, AtMessageModule } from '@spartacus/storefront';
import { filter, tap, map } from 'rxjs/operators';
import * as i1 from '@spartacus/cart/wish-list/root';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/router';
import { RouterModule } from '@angular/router';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddToWishListComponent {
    constructor(wishListFacade, currentProductService, authService) {
        this.wishListFacade = wishListFacade;
        this.currentProductService = currentProductService;
        this.authService = authService;
        this.product$ = this.currentProductService.getProduct().pipe(filter(isNotNullable), tap((product) => this.setStockInfo(product)));
        this.userLoggedIn$ = this.authService.isUserLoggedIn().pipe(tap((isLogin) => {
            if (isLogin) {
                this.wishListEntries$ = this.getWishListEntries();
                this.loading$ = this.wishListFacade.getWishListLoading();
            }
        }));
        this.hasStock = false;
        this.iconTypes = ICON_TYPE;
    }
    add(product) {
        if (product.code) {
            this.wishListFacade.addEntry(product.code);
        }
    }
    remove(entry) {
        this.wishListFacade.removeEntry(entry);
    }
    getProductInWishList(product, entries) {
        const item = entries.find((entry) => entry.product?.code === product.code);
        return item;
    }
    setStockInfo(product) {
        this.hasStock = Boolean(product.stock && product.stock.stockLevelStatus !== 'outOfStock');
    }
    getWishListEntries() {
        return this.wishListFacade.getWishList().pipe(filter((wishlist) => Boolean(wishlist)), map((wishList) => wishList.entries ?? []));
    }
}
AddToWishListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToWishListComponent, deps: [{ token: i1.WishListFacade }, { token: i2.CurrentProductService }, { token: i3.AuthService }], target: i0.ɵɵFactoryTarget.Component });
AddToWishListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AddToWishListComponent, selector: "cx-add-to-wishlist", ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <ng-container *ngIf=\"userLoggedIn$ | async; else loginPrompt\">\n    <ng-container *ngIf=\"wishListEntries$ | async as entries\">\n      <ng-container *ngIf=\"hasStock\">\n        <div\n          *ngIf=\"getProductInWishList(product, entries) as entry; else addItem\"\n        >\n          <button\n            class=\"btn btn-link button-remove cx-action-link\"\n            (click)=\"remove(entry)\"\n            [disabled]=\"loading$ | async\"\n            [cxAtMessage]=\"'addToWishList.removedFromWishList' | cxTranslate\"\n          >\n            <cx-icon [type]=\"iconTypes.HEART\"></cx-icon>\n            <span class=\"button-text\">{{\n              'addToWishList.remove' | cxTranslate\n            }}</span>\n          </button>\n        </div>\n        <ng-template #addItem>\n          <button\n            class=\"btn btn-link button-add cx-action-link\"\n            (click)=\"add(product)\"\n            [disabled]=\"loading$ | async\"\n            [cxAtMessage]=\"'addToWishList.addedToWishList' | cxTranslate\"\n          >\n            <cx-icon [type]=\"iconTypes.EMPTY_HEART\"></cx-icon>\n            <span class=\"button-text\">{{\n              'addToWishList.add' | cxTranslate\n            }}</span>\n          </button>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #loginPrompt>\n  <ng-container *ngIf=\"hasStock\">\n    <a\n      class=\"btn btn-link button-add-link cx-action-link\"\n      [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n    >\n      <cx-icon [type]=\"iconTypes.EMPTY_HEART\"></cx-icon>\n      <span class=\"button-text\">{{\n        'addToWishList.anonymous' | cxTranslate\n      }}</span>\n    </a>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.AtMessageDirective, selector: "[cxAtMessage]", inputs: ["cxAtMessage"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToWishListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-wishlist', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <ng-container *ngIf=\"userLoggedIn$ | async; else loginPrompt\">\n    <ng-container *ngIf=\"wishListEntries$ | async as entries\">\n      <ng-container *ngIf=\"hasStock\">\n        <div\n          *ngIf=\"getProductInWishList(product, entries) as entry; else addItem\"\n        >\n          <button\n            class=\"btn btn-link button-remove cx-action-link\"\n            (click)=\"remove(entry)\"\n            [disabled]=\"loading$ | async\"\n            [cxAtMessage]=\"'addToWishList.removedFromWishList' | cxTranslate\"\n          >\n            <cx-icon [type]=\"iconTypes.HEART\"></cx-icon>\n            <span class=\"button-text\">{{\n              'addToWishList.remove' | cxTranslate\n            }}</span>\n          </button>\n        </div>\n        <ng-template #addItem>\n          <button\n            class=\"btn btn-link button-add cx-action-link\"\n            (click)=\"add(product)\"\n            [disabled]=\"loading$ | async\"\n            [cxAtMessage]=\"'addToWishList.addedToWishList' | cxTranslate\"\n          >\n            <cx-icon [type]=\"iconTypes.EMPTY_HEART\"></cx-icon>\n            <span class=\"button-text\">{{\n              'addToWishList.add' | cxTranslate\n            }}</span>\n          </button>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #loginPrompt>\n  <ng-container *ngIf=\"hasStock\">\n    <a\n      class=\"btn btn-link button-add-link cx-action-link\"\n      [routerLink]=\"{ cxRoute: 'login' } | cxUrl\"\n    >\n      <cx-icon [type]=\"iconTypes.EMPTY_HEART\"></cx-icon>\n      <span class=\"button-text\">{{\n        'addToWishList.anonymous' | cxTranslate\n      }}</span>\n    </a>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.WishListFacade }, { type: i2.CurrentProductService }, { type: i3.AuthService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AddToWishListModule {
}
AddToWishListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToWishListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AddToWishListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AddToWishListModule, declarations: [AddToWishListComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        RouterModule,
        UrlModule,
        AtMessageModule], exports: [AddToWishListComponent] });
AddToWishListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToWishListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AddToWishListComponent: {
                    component: AddToWishListComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        IconModule,
        RouterModule,
        UrlModule,
        AtMessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToWishListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        RouterModule,
                        UrlModule,
                        AtMessageModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AddToWishListComponent: {
                                    component: AddToWishListComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [AddToWishListComponent],
                    exports: [AddToWishListComponent],
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

export { AddToWishListComponent, AddToWishListModule };
//# sourceMappingURL=spartacus-cart-wish-list-components-add-to-wishlist.mjs.map
