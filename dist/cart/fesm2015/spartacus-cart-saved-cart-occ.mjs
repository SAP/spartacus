import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { map } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i2 from '@spartacus/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';

class OccSavedCartAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, cartId) {
        return this.http
            .get(this.getSavedCartEndpoint(userId, cartId))
            .pipe(map((cartResponse) => cartResponse.savedCartData), this.converter.pipeable(CART_NORMALIZER));
    }
    loadList(userId) {
        return this.http
            .get(this.getSavedCartListEndpoint(userId))
            .pipe(map((cartList) => { var _a; return (_a = cartList.carts) !== null && _a !== void 0 ? _a : []; }), this.converter.pipeableMany(CART_NORMALIZER));
    }
    restoreSavedCart(userId, cartId) {
        return this.http
            .patch(this.getRestoreSavedCartEndpoint(userId, cartId), cartId)
            .pipe(map((cartResponse) => cartResponse.savedCartData), this.converter.pipeable(CART_NORMALIZER));
    }
    cloneSavedCart(userId, cartId, saveCartName) {
        return this.http
            .post(this.getCloneSavedCartEndpoint(userId, cartId, saveCartName), cartId)
            .pipe(map((cartResponse) => cartResponse.savedCartData), this.converter.pipeable(CART_NORMALIZER));
    }
    getSavedCartEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('savedCart', {
            urlParams: { userId, cartId },
        });
    }
    getSavedCartListEndpoint(userId) {
        return this.occEndpoints.buildUrl('savedCarts', { urlParams: { userId } });
    }
    getRestoreSavedCartEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('restoreSavedCart', {
            urlParams: { userId, cartId },
        });
    }
    getCloneSavedCartEndpoint(userId, cartId, saveCartName) {
        return this.occEndpoints.buildUrl('cloneSavedCart', {
            urlParams: { userId, cartId, saveCartName },
        });
    }
}
OccSavedCartAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSavedCartAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccSavedCartAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSavedCartAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccSavedCartAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

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
const defaultOccSavedCartConfig = {
    backend: {
        occ: {
            endpoints: {
                savedCarts: '/users/${userId}/carts?savedCartsOnly=true&fields=carts(DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),saveTime,user,name,description)',
                savedCart: '/users/${userId}/carts/${cartId}/savedcart',
                restoreSavedCart: '/users/${userId}/carts/${cartId}/restoresavedcart',
                cloneSavedCart: '/users/${userId}/carts/${cartId}/clonesavedcart?name=${saveCartName}',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SavedCartOccModule {
}
SavedCartOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOccModule, imports: [CommonModule] });
SavedCartOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOccModule, providers: [
        provideDefaultConfig(defaultOccSavedCartConfig),
        {
            provide: SavedCartAdapter,
            useClass: OccSavedCartAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccSavedCartConfig),
                        {
                            provide: SavedCartAdapter,
                            useClass: OccSavedCartAdapter,
                        },
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

export { OccSavedCartAdapter, SavedCartOccModule };
//# sourceMappingURL=spartacus-cart-saved-cart-occ.mjs.map
