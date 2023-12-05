import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i1 from '@spartacus/cart/base/root';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { BASE_SITE_CONTEXT_ID, StorageSyncType, UrlModule, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { of, combineLatest } from 'rxjs';
import { switchMap, startWith, map, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import * as i3 from '@spartacus/storefront';
import { ICON_TYPE, IconModule } from '@spartacus/storefront';
import * as i2$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MiniCartComponentService {
    constructor(activeCartFacade, authService, statePersistenceService, siteContextParamsService, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.authService = authService;
        this.statePersistenceService = statePersistenceService;
        this.siteContextParamsService = siteContextParamsService;
        this.eventService = eventService;
    }
    /**
     * This function supports lazy loading of the cart functionality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getQuantity() {
        return this.activeCartRequired().pipe(switchMap((activeCartRequired) => {
            if (activeCartRequired) {
                return this.activeCartFacade.getActive().pipe(startWith({ totalUnitCount: 0 }), map((cart) => cart.totalUnitCount || 0));
            }
            else {
                return of(0);
            }
        }));
    }
    /**
     * This function supports lazy loading of the cart functionality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getTotalPrice() {
        return this.activeCartRequired().pipe(switchMap((activeCartRequired) => {
            if (activeCartRequired) {
                return this.activeCartFacade
                    .getActive()
                    .pipe(map((cart) => { var _a, _b; return (_b = (_a = cart.totalPrice) === null || _a === void 0 ? void 0 : _a.formattedValue) !== null && _b !== void 0 ? _b : ''; }));
            }
            else {
                return of('');
            }
        }));
    }
    /**
     * This function determines if it is required to get active cart data from ActiveCartFacade.
     * It is required to call the ActiveCartFacade if one of these criteria is met:
     * - There is an active cart id in the browser local storage
     * - A user is authenticated
     * - The cart library code chunk with the ActiveCartFacade implementation is already loaded.
     *
     * Once the observable returned by activeCartRequired emits true, it completes.
     * activeCartRequired helps to make the mini cart compatible with some level of lazy loading.
     */
    activeCartRequired() {
        return combineLatest([
            this.hasActiveCartInStorage(),
            this.authService.isUserLoggedIn(),
            this.isCartCreated(),
        ]).pipe(map(([hasCartInStorage, isUserLoggedIn, isCartCreated]) => hasCartInStorage || isUserLoggedIn || isCartCreated), distinctUntilChanged(), takeWhile((hasCart) => !hasCart, true));
    }
    hasActiveCartInStorage() {
        return this.getCartStateFromBrowserStorage().pipe(map((state) => Boolean(state === null || state === void 0 ? void 0 : state.active)));
    }
    isCartCreated() {
        return this.eventService.get(CreateCartEvent).pipe(map((_) => true), startWith(false));
    }
    getCartStateFromBrowserStorage() {
        return this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]).pipe(map((context) => {
            return this.statePersistenceService.readStateFromStorage({
                key: 'cart',
                context: context,
                storageType: StorageSyncType.LOCAL_STORAGE,
            });
        }));
    }
}
MiniCartComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponentService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.AuthService }, { token: i2.StatePersistenceService }, { token: i2.SiteContextParamsService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
MiniCartComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.AuthService }, { type: i2.StatePersistenceService }, { type: i2.SiteContextParamsService }, { type: i2.EventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MiniCartComponent {
    constructor(miniCartComponentService) {
        this.miniCartComponentService = miniCartComponentService;
        this.iconTypes = ICON_TYPE;
        this.quantity$ = this.miniCartComponentService.getQuantity();
        this.total$ = this.miniCartComponentService.getTotalPrice();
    }
}
MiniCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponent, deps: [{ token: MiniCartComponentService }], target: i0.ɵɵFactoryTarget.Component });
MiniCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MiniCartComponent, selector: "cx-mini-cart", ngImport: i0, template: "<a\n  [attr.aria-label]=\"\n    'miniCart.item' | cxTranslate: { count: quantity$ | async }\n  \"\n  [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n>\n  <cx-icon [type]=\"iconTypes.CART\"></cx-icon>\n\n  <span class=\"total\">\n    {{ 'miniCart.total' | cxTranslate: { total: total$ | async } }}\n  </span>\n\n  <span class=\"count\">\n    {{ 'miniCart.count' | cxTranslate: { count: quantity$ | async } }}\n  </span>\n</a>\n", dependencies: [{ kind: "directive", type: i2$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-mini-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  [attr.aria-label]=\"\n    'miniCart.item' | cxTranslate: { count: quantity$ | async }\n  \"\n  [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n>\n  <cx-icon [type]=\"iconTypes.CART\"></cx-icon>\n\n  <span class=\"total\">\n    {{ 'miniCart.total' | cxTranslate: { total: total$ | async } }}\n  </span>\n\n  <span class=\"count\">\n    {{ 'miniCart.count' | cxTranslate: { count: quantity$ | async } }}\n  </span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: MiniCartComponentService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MiniCartModule {
}
MiniCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MiniCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MiniCartModule, declarations: [MiniCartComponent], imports: [CommonModule, RouterModule, UrlModule, IconModule, I18nModule], exports: [MiniCartComponent] });
MiniCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MiniCartComponent: {
                    component: MiniCartComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, IconModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, IconModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MiniCartComponent: {
                                    component: MiniCartComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [MiniCartComponent],
                    exports: [MiniCartComponent],
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

export { MiniCartComponent, MiniCartComponentService, MiniCartModule };
//# sourceMappingURL=spartacus-cart-base-components-mini-cart.mjs.map
