import * as i0 from '@angular/core';
import { Injectable, inject, NgModule } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER, CART_MODIFICATION_NORMALIZER, CART_VOUCHER_NORMALIZER, CART_NORMALIZER } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { PRODUCT_NORMALIZER, OCC_USER_ID_ANONYMOUS, InterceptorUtil, USE_CLIENT_TOKEN, OCC_CART_ID_CURRENT, LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CART_VALIDATION_NORMALIZER, CartAdapter, CartEntryAdapter, CartVoucherAdapter, CartValidationAdapter } from '@spartacus/cart/base/core';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCartNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        this.removeDuplicatePromotions(source, target);
        if (source.entries) {
            target.entries = source.entries.map((entry) => ({
                ...entry,
                product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
                promotions: this.converter.convert({ item: entry, promotions: target?.appliedProductPromotions }, ORDER_ENTRY_PROMOTIONS_NORMALIZER),
            }));
        }
        return target;
    }
    /**
     * Remove all duplicate promotions
     */
    removeDuplicatePromotions(source, target) {
        if (source && source.potentialOrderPromotions) {
            target.potentialOrderPromotions = this.removeDuplicateItems(source.potentialOrderPromotions);
        }
        if (source && source.potentialProductPromotions) {
            target.potentialProductPromotions = this.removeDuplicateItems(source.potentialProductPromotions);
        }
        if (source && source.appliedOrderPromotions) {
            target.appliedOrderPromotions = this.removeDuplicateItems(source.appliedOrderPromotions);
        }
        if (source && source.appliedProductPromotions) {
            target.appliedProductPromotions = this.removeDuplicateItems(source.appliedProductPromotions);
        }
    }
    removeDuplicateItems(itemList) {
        return itemList.filter((p, i, a) => {
            const b = a.map((el) => JSON.stringify(el));
            return i === b.indexOf(JSON.stringify(p));
        });
    }
}
OccCartNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderEntryPromotionsNormalizer {
    convert(source, target) {
        target = this.getProductPromotion(source.item, source.promotions);
        return target;
    }
    /**
     * Get consumed promotions for the given order entry
     *
     * @param item
     * @param promotions
     * @returns consumed promotions for this entry
     */
    getProductPromotion(item, promotions) {
        const entryPromotions = [];
        promotions?.forEach((promotion) => {
            if (promotion.description && promotion.consumedEntries) {
                for (const consumedEntry of promotion.consumedEntries) {
                    if (this.isConsumedByEntry(consumedEntry, item)) {
                        entryPromotions.push(promotion);
                    }
                }
            }
        });
        return entryPromotions;
    }
    isConsumedByEntry(consumedEntry, entry) {
        const consumedEntryNumber = consumedEntry.orderEntryNumber;
        if (entry && entry.entries && entry.entries.length > 0) {
            for (const subEntry of entry.entries) {
                if (subEntry.entryNumber === consumedEntryNumber) {
                    return true;
                }
            }
            return false;
        }
        else {
            return consumedEntryNumber === entry?.entryNumber;
        }
    }
}
OrderEntryPromotionsNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderEntryPromotionsNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderEntryPromotionsNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderEntryPromotionsNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderEntryPromotionsNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
class OccCartEntryAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    add(userId, cartId, productCode, quantity = 1, pickupStore) {
        const url = this.occEndpointsService.buildUrl('addEntries', {
            urlParams: { userId, cartId, quantity },
        });
        // Handle b2b case where the x-www-form-urlencoded is still used
        if (url.includes(`quantity=${quantity}`)) {
            const httpHeaders = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            });
            return this.http
                .post(url, {}, { headers: httpHeaders, params: { code: productCode } })
                .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
        }
        const toAdd = {
            quantity,
            product: { code: productCode },
            ...(pickupStore && { deliveryPointOfService: { name: pickupStore } }),
        };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post(url, toAdd, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    update(userId, cartId, entryNumber, qty, pickupStore, pickupToDelivery = false) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const url = this.occEndpointsService.buildUrl('updateEntries', {
            urlParams: {
                userId,
                cartId,
                entryNumber,
            },
        });
        // switch from pickup to delivery mode
        if (pickupStore === undefined && pickupToDelivery) {
            return this.http
                .put(url, { quantity: qty }, { headers })
                .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
        }
        let params = {};
        if (pickupStore) {
            params = {
                deliveryPointOfService: {
                    name: pickupStore,
                },
            };
        }
        return this.http
            .patch(url, { quantity: qty, ...params }, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    remove(userId, cartId, entryNumber) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const url = this.occEndpointsService.buildUrl('removeEntries', {
            urlParams: {
                userId,
                cartId,
                entryNumber,
            },
        });
        return this.http.delete(url, { headers });
    }
}
OccCartEntryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartEntryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartEntryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartEntryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartEntryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCartVoucherAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    getCartVoucherEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('cartVoucher', {
            urlParams: { userId, cartId },
        });
    }
    getHeaders(userId) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        if (userId === OCC_USER_ID_ANONYMOUS) {
            headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        }
        return headers;
    }
    add(userId, cartId, voucherId) {
        const url = this.getCartVoucherEndpoint(userId, cartId);
        const toAdd = JSON.stringify({});
        const params = new HttpParams().set('voucherId', voucherId);
        const headers = this.getHeaders(userId);
        return this.http.post(url, toAdd, { headers, params }).pipe(catchError((error) => throwError(error)), this.converter.pipeable(CART_VOUCHER_NORMALIZER));
    }
    remove(userId, cartId, voucherId) {
        const url = this.getCartVoucherEndpoint(userId, cartId) +
            '/' +
            encodeURIComponent(voucherId);
        const headers = this.getHeaders(userId);
        return this.http
            .delete(url, { headers })
            .pipe(catchError((error) => throwError(error)));
    }
}
OccCartVoucherAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartVoucherAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartVoucherAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartVoucherAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartVoucherAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCartAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    loadAll(userId) {
        return this.http
            .get(this.occEndpointsService.buildUrl('carts', { urlParams: { userId } }))
            .pipe(map((cartList) => cartList.carts ?? []), this.converterService.pipeableMany(CART_NORMALIZER));
    }
    load(userId, cartId) {
        if (cartId === OCC_CART_ID_CURRENT) {
            return this.loadAll(userId).pipe(map((carts) => carts.find((cart) => cart['saveTime'] === undefined)));
        }
        else {
            return this.http
                .get(this.occEndpointsService.buildUrl('cart', {
                urlParams: { userId, cartId },
            }))
                .pipe(this.converterService.pipeable(CART_NORMALIZER));
        }
    }
    create(userId, oldCartId, toMergeCartGuid) {
        const toAdd = JSON.stringify({});
        const params = {};
        if (oldCartId) {
            params['oldCartId'] = oldCartId;
        }
        if (toMergeCartGuid) {
            params['toMergeCartGuid'] = toMergeCartGuid;
        }
        return this.http
            .post(this.occEndpointsService.buildUrl('createCart', {
            urlParams: { userId },
            queryParams: params,
        }), toAdd)
            .pipe(this.converterService.pipeable(CART_NORMALIZER));
    }
    delete(userId, cartId) {
        let headers = new HttpHeaders();
        if (userId === OCC_USER_ID_ANONYMOUS) {
            headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        }
        return this.http.delete(this.occEndpointsService.buildUrl('deleteCart', {
            urlParams: { userId, cartId },
        }), { headers });
    }
    save(userId, cartId, saveCartName, saveCartDescription) {
        const endpoint = this.occEndpointsService.buildUrl('saveCart', {
            urlParams: {
                userId,
                cartId,
                saveCartName,
                saveCartDescription,
            },
        });
        return this.http.patch(endpoint, cartId).pipe(map((cartResponse) => cartResponse.savedCartData), this.converterService.pipeable(CART_NORMALIZER));
    }
    addEmail(userId, cartId, email) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        const httpParams = new HttpParams().set('email', email);
        const url = this.occEndpointsService.buildUrl('addEmail', {
            urlParams: {
                userId,
                cartId,
            },
        });
        return this.http.put(url, httpParams, { headers });
    }
}
OccCartAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccCartValidationAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    validate(cartId, userId) {
        const url = this.occEndpoints.buildUrl('validate', {
            urlParams: { cartId, userId },
        });
        return this.http.post(url, null).pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(CART_VALIDATION_NORMALIZER));
    }
}
OccCartValidationAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartValidationAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCartValidationAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartValidationAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCartValidationAdapter, decorators: [{
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
const defaultOccCartConfig = {
    backend: {
        occ: {
            endpoints: {
                /* eslint-disable max-len */
                carts: 'users/${userId}/carts?fields=carts(DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description)',
                cart: 'users/${userId}/carts/${cartId}?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user,saveTime,name,description',
                createCart: 'users/${userId}/carts?fields=DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue,value),updateable),totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(value,formattedValue),subTotal(formattedValue),totalUnitCount,deliveryItemsQuantity,deliveryCost(formattedValue),totalTax(formattedValue, value),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue),user',
                addEntries: 'users/${userId}/carts/${cartId}/entries',
                updateEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
                removeEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
                addEmail: 'users/${userId}/carts/${cartId}/email',
                deleteCart: 'users/${userId}/carts/${cartId}',
                cartVoucher: 'users/${userId}/carts/${cartId}/vouchers',
                saveCart: '/users/${userId}/carts/${cartId}/save?saveCartName=${saveCartName}&saveCartDescription=${saveCartDescription}',
                validate: 'users/${userId}/carts/${cartId}/validate?fields=DEFAULT',
                /* eslint-enable */
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CartBaseOccModule {
}
CartBaseOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, imports: [CommonModule] });
CartBaseOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, providers: [
        provideDefaultConfig(defaultOccCartConfig),
        {
            provide: CartAdapter,
            useClass: OccCartAdapter,
        },
        {
            provide: CART_NORMALIZER,
            useExisting: OccCartNormalizer,
            multi: true,
        },
        {
            provide: ORDER_ENTRY_PROMOTIONS_NORMALIZER,
            useExisting: OrderEntryPromotionsNormalizer,
            multi: true,
        },
        {
            provide: CartEntryAdapter,
            useClass: OccCartEntryAdapter,
        },
        {
            provide: CartVoucherAdapter,
            useClass: OccCartVoucherAdapter,
        },
        {
            provide: CartValidationAdapter,
            useClass: OccCartValidationAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCartConfig),
                        {
                            provide: CartAdapter,
                            useClass: OccCartAdapter,
                        },
                        {
                            provide: CART_NORMALIZER,
                            useExisting: OccCartNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_ENTRY_PROMOTIONS_NORMALIZER,
                            useExisting: OrderEntryPromotionsNormalizer,
                            multi: true,
                        },
                        {
                            provide: CartEntryAdapter,
                            useClass: OccCartEntryAdapter,
                        },
                        {
                            provide: CartVoucherAdapter,
                            useClass: OccCartVoucherAdapter,
                        },
                        {
                            provide: CartValidationAdapter,
                            useClass: OccCartValidationAdapter,
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

/**
 * Generated bundle index. Do not edit.
 */

export { CartBaseOccModule, OccCartAdapter, OccCartEntryAdapter, OccCartNormalizer, OccCartValidationAdapter, OccCartVoucherAdapter, OrderEntryPromotionsNormalizer };
//# sourceMappingURL=spartacus-cart-base-occ.mjs.map
