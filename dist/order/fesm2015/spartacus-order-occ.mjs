import * as i0 from '@angular/core';
import { Injectable, inject, NgModule } from '@angular/core';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { PRODUCT_NORMALIZER, TimeUtils, OCC_USER_ID_ANONYMOUS, InterceptorUtil, USE_CLIENT_TOKEN, OCC_USER_ID_CURRENT, LoggerService, normalizeHttpError, backOff, isJaloError, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ORDER_NORMALIZER, ORDER_HISTORY_NORMALIZER, CONSIGNMENT_TRACKING_NORMALIZER, ORDER_RETURN_REQUEST_INPUT_SERIALIZER, ORDER_RETURN_REQUEST_NORMALIZER, ORDER_RETURNS_NORMALIZER, REPLENISHMENT_ORDER_NORMALIZER, REPLENISHMENT_ORDER_HISTORY_NORMALIZER, REPLENISHMENT_ORDER_FORM_SERIALIZER, REORDER_ORDER_NORMALIZER } from '@spartacus/order/root';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { OrderHistoryAdapter, ReplenishmentOrderHistoryAdapter, OrderAdapter, ScheduledReplenishmentOrderAdapter, ReorderOrderAdapter } from '@spartacus/order/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrderNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        if (source.entries) {
            target.entries = source.entries.map((entry) => this.convertOrderEntry(entry, source.code, source.appliedProductPromotions));
        }
        if (source.consignments) {
            target.consignments = source.consignments.map((consignment) => {
                var _a;
                return (Object.assign(Object.assign({}, consignment), { entries: (_a = consignment.entries) === null || _a === void 0 ? void 0 : _a.map((entry) => (Object.assign(Object.assign({}, entry), { orderEntry: this.convertOrderEntry(entry.orderEntry, source.code, source.appliedProductPromotions) }))) }));
            });
        }
        if (source.unconsignedEntries) {
            target.unconsignedEntries = source.unconsignedEntries.map((entry) => this.convertOrderEntry(entry, source.code, source.appliedProductPromotions));
        }
        return target;
    }
    convertOrderEntry(source, code, promotions) {
        return Object.assign(Object.assign({}, source), { product: this.converter.convert(source === null || source === void 0 ? void 0 : source.product, PRODUCT_NORMALIZER), orderCode: code, promotions: this.converter.convert({ item: source, promotions: promotions }, ORDER_ENTRY_PROMOTIONS_NORMALIZER) });
    }
}
OccOrderNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccReplenishmentOrderNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        if (source.entries) {
            target.entries = source.entries.map((entry) => (Object.assign(Object.assign({}, entry), { product: this.converter.convert(entry.product, PRODUCT_NORMALIZER), promotions: this.converter.convert({ item: entry, promotions: source.appliedProductPromotions }, ORDER_ENTRY_PROMOTIONS_NORMALIZER) })));
        }
        return target;
    }
}
OccReplenishmentOrderNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReplenishmentOrderNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccReturnRequestNormalizer {
    constructor(converter) {
        this.converter = converter;
    }
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        if (source.returnEntries) {
            target.returnEntries = source.returnEntries.map((entry) => (Object.assign(Object.assign({}, entry), { orderEntry: this.convertOrderEntry(entry.orderEntry) })));
        }
        return target;
    }
    convertOrderEntry(source) {
        return Object.assign(Object.assign({}, source), { product: this.converter.convert(source === null || source === void 0 ? void 0 : source.product, PRODUCT_NORMALIZER) });
    }
}
OccReturnRequestNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReturnRequestNormalizer, deps: [{ token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReturnRequestNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReturnRequestNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReturnRequestNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccScheduledReplenishmentOrderFormSerializer {
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        if (source.replenishmentStartDate) {
            target.replenishmentStartDate = this.convertDate(source.replenishmentStartDate);
        }
        return target;
    }
    /**
     * Adds the current timestamp (including timezone offset) to a date string in the format YYYY-mm-dd
     * @Example
     * Converts 2021-10-15 to 2021-10-15T15:38:05-05:00
     */
    convertDate(date) {
        const localTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        });
        return `${date}T${localTime}:00${TimeUtils.getLocalTimezoneOffset()}`;
    }
}
OccScheduledReplenishmentOrderFormSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderFormSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccScheduledReplenishmentOrderFormSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderFormSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderFormSerializer, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
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
const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };
class OccOrderHistoryAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, orderCode) {
        const url = this.occEndpoints.buildUrl('orderDetail', {
            urlParams: { userId, orderId: orderCode },
        });
        let headers = new HttpHeaders();
        if (userId === OCC_USER_ID_ANONYMOUS) {
            headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        }
        return this.http
            .get(url, { headers })
            .pipe(this.converter.pipeable(ORDER_NORMALIZER));
    }
    loadHistory(userId, pageSize, currentPage, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        const url = this.occEndpoints.buildUrl('orderHistory', {
            urlParams: { userId },
            queryParams: params,
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
    }
    getConsignmentTracking(orderCode, consignmentCode, userId = OCC_USER_ID_CURRENT) {
        const url = this.occEndpoints.buildUrl('consignmentTracking', {
            urlParams: { userId, orderCode, consignmentCode },
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(CONSIGNMENT_TRACKING_NORMALIZER));
    }
    cancel(userId, orderCode, cancelRequestInput) {
        const url = this.occEndpoints.buildUrl('cancelOrder', {
            urlParams: { userId, orderId: orderCode },
        });
        const headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_JSON_HEADER));
        return this.http
            .post(url, cancelRequestInput, { headers })
            .pipe(catchError((error) => throwError(error)));
    }
    createReturnRequest(userId, returnRequestInput) {
        const url = this.occEndpoints.buildUrl('returnOrder', {
            urlParams: { userId },
        });
        const headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_JSON_HEADER));
        returnRequestInput = this.converter.convert(returnRequestInput, ORDER_RETURN_REQUEST_INPUT_SERIALIZER);
        return this.http.post(url, returnRequestInput, { headers }).pipe(catchError((error) => throwError(error)), this.converter.pipeable(ORDER_RETURN_REQUEST_NORMALIZER));
    }
    loadReturnRequestList(userId, pageSize, currentPage, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        const url = this.occEndpoints.buildUrl('orderReturns', {
            urlParams: { userId },
            queryParams: params,
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(ORDER_RETURNS_NORMALIZER));
    }
    loadReturnRequestDetail(userId, returnRequestCode) {
        const url = this.occEndpoints.buildUrl('orderReturnDetail', {
            urlParams: { userId, returnRequestCode },
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(ORDER_RETURN_REQUEST_NORMALIZER));
    }
    cancelReturnRequest(userId, returnRequestCode, returnRequestModification) {
        const url = this.occEndpoints.buildUrl('cancelReturn', {
            urlParams: { userId, returnRequestCode },
        });
        const headers = new HttpHeaders(Object.assign({}, CONTENT_TYPE_JSON_HEADER));
        return this.http
            .patch(url, returnRequestModification, { headers })
            .pipe(catchError((error) => throwError(error)));
    }
}
OccOrderHistoryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderHistoryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderHistoryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderHistoryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderHistoryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    placeOrder(userId, cartId, termsChecked) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        if (userId === OCC_USER_ID_ANONYMOUS) {
            headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
        }
        return this.http
            .post(this.getPlaceOrderEndpoint(userId, cartId, termsChecked.toString()), {}, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(ORDER_NORMALIZER));
    }
    getPlaceOrderEndpoint(userId, cartId, termsChecked) {
        return this.occEndpoints.buildUrl('placeOrder', {
            urlParams: { userId },
            queryParams: { cartId, termsChecked },
        });
    }
}
OccOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccOrderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccReplenishmentOrderHistoryAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    load(userId, replenishmentOrderCode) {
        return this.http
            .get(this.occEndpoints.buildUrl('replenishmentOrderDetails', {
            urlParams: { userId, replenishmentOrderCode },
        }))
            .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
    }
    loadReplenishmentDetailsHistory(userId, replenishmentOrderCode, pageSize, currentPage, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        return this.http
            .get(this.occEndpoints.buildUrl('replenishmentOrderDetailsHistory', {
            urlParams: { userId, replenishmentOrderCode },
            queryParams: params,
        }))
            .pipe(this.converter.pipeable(ORDER_HISTORY_NORMALIZER));
    }
    cancelReplenishmentOrder(userId, replenishmentOrderCode) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http
            .patch(this.occEndpoints.buildUrl('cancelReplenishmentOrder', {
            urlParams: { userId, replenishmentOrderCode },
        }), {}, { headers })
            .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
    }
    loadHistory(userId, pageSize, currentPage, sort) {
        const params = {};
        if (pageSize) {
            params['pageSize'] = pageSize.toString();
        }
        if (currentPage) {
            params['currentPage'] = currentPage.toString();
        }
        if (sort) {
            params['sort'] = sort.toString();
        }
        const url = this.occEndpoints.buildUrl('replenishmentOrderHistory', {
            urlParams: { userId },
            queryParams: params,
        });
        return this.http
            .get(url)
            .pipe(this.converter.pipeable(REPLENISHMENT_ORDER_HISTORY_NORMALIZER));
    }
}
OccReplenishmentOrderHistoryAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderHistoryAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReplenishmentOrderHistoryAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderHistoryAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReplenishmentOrderHistoryAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccScheduledReplenishmentOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    scheduleReplenishmentOrder(cartId, scheduleReplenishmentForm, termsChecked, userId) {
        scheduleReplenishmentForm = this.converter.convert(scheduleReplenishmentForm, REPLENISHMENT_ORDER_FORM_SERIALIZER);
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http
            .post(this.getScheduleReplenishmentOrderEndpoint(userId, cartId, termsChecked.toString()), scheduleReplenishmentForm, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({ shouldRetry: isJaloError }), this.converter.pipeable(REPLENISHMENT_ORDER_NORMALIZER));
    }
    getScheduleReplenishmentOrderEndpoint(userId, cartId, termsChecked) {
        return this.occEndpoints.buildUrl('scheduleReplenishmentOrder', {
            urlParams: {
                userId,
            },
            queryParams: { cartId, termsChecked },
        });
    }
}
OccScheduledReplenishmentOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccScheduledReplenishmentOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccScheduledReplenishmentOrderAdapter, decorators: [{
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
class OccReorderOrderNormalizer {
    convert(source, target) {
        if (target === undefined) {
            target = Object.assign({}, source);
        }
        return target;
    }
}
OccReorderOrderNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReorderOrderNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccReorderOrderNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReorderOrderNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReorderOrderNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccReorderOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    reorder(orderId, userId) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http
            .post(this.getReorderOrderEndpoint(orderId, userId), {}, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(REORDER_ORDER_NORMALIZER));
    }
    getReorderOrderEndpoint(orderCode, userId) {
        return this.occEndpoints.buildUrl('reorder', {
            urlParams: {
                userId,
            },
            queryParams: { orderCode },
        });
    }
}
OccReorderOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReorderOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReorderOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReorderOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccReorderOrderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccOrderConfig = {
    backend: {
        occ: {
            endpoints: {
                /* eslint-disable max-len */
                orderHistory: 'users/${userId}/orders',
                orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL',
                consignmentTracking: 'users/${userId}/orders/${orderCode}/consignments/${consignmentCode}/tracking',
                cancelOrder: 'users/${userId}/orders/${orderId}/cancellation',
                returnOrder: 'users/${userId}/orderReturns?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
                orderReturns: 'users/${userId}/orderReturns?fields=BASIC',
                orderReturnDetail: 'users/${userId}/orderReturns/${returnRequestCode}?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
                cancelReturn: 'users/${userId}/orderReturns/${returnRequestCode}',
                /* eslint-enable */
                /** scheduled replenishment endpoints start */
                replenishmentOrderDetails: 'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
                replenishmentOrderDetailsHistory: 'users/${userId}/replenishmentOrders/${replenishmentOrderCode}/orders',
                cancelReplenishmentOrder: 'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
                replenishmentOrderHistory: 'users/${userId}/replenishmentOrders?fields=FULL,replenishmentOrders(FULL, purchaseOrderNumber)',
                /** scheduled replenishment endpoints end */
                /** placing an order endpoints start **/
                placeOrder: 'users/${userId}/orders?fields=FULL',
                /** placing an order endpoints end **/
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OrderOccModule {
}
OrderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, imports: [CommonModule] });
OrderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, providers: [
        provideDefaultConfig(defaultOccOrderConfig),
        { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
        {
            provide: ReplenishmentOrderHistoryAdapter,
            useClass: OccReplenishmentOrderHistoryAdapter,
        },
        {
            provide: OrderAdapter,
            useClass: OccOrderAdapter,
        },
        {
            provide: ScheduledReplenishmentOrderAdapter,
            useClass: OccScheduledReplenishmentOrderAdapter,
        },
        {
            provide: ReorderOrderAdapter,
            useClass: OccReorderOrderAdapter,
        },
        {
            provide: ORDER_RETURN_REQUEST_NORMALIZER,
            useExisting: OccReturnRequestNormalizer,
            multi: true,
        },
        {
            provide: ORDER_NORMALIZER,
            useExisting: OccOrderNormalizer,
            multi: true,
        },
        {
            provide: REPLENISHMENT_ORDER_NORMALIZER,
            useExisting: OccReplenishmentOrderNormalizer,
            multi: true,
        },
        {
            provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
            useExisting: OccScheduledReplenishmentOrderFormSerializer,
            multi: true,
        },
        {
            provide: REORDER_ORDER_NORMALIZER,
            useExisting: OccReorderOrderNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrderConfig),
                        { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
                        {
                            provide: ReplenishmentOrderHistoryAdapter,
                            useClass: OccReplenishmentOrderHistoryAdapter,
                        },
                        {
                            provide: OrderAdapter,
                            useClass: OccOrderAdapter,
                        },
                        {
                            provide: ScheduledReplenishmentOrderAdapter,
                            useClass: OccScheduledReplenishmentOrderAdapter,
                        },
                        {
                            provide: ReorderOrderAdapter,
                            useClass: OccReorderOrderAdapter,
                        },
                        {
                            provide: ORDER_RETURN_REQUEST_NORMALIZER,
                            useExisting: OccReturnRequestNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_NORMALIZER,
                            useExisting: OccOrderNormalizer,
                            multi: true,
                        },
                        {
                            provide: REPLENISHMENT_ORDER_NORMALIZER,
                            useExisting: OccReplenishmentOrderNormalizer,
                            multi: true,
                        },
                        {
                            provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
                            useExisting: OccScheduledReplenishmentOrderFormSerializer,
                            multi: true,
                        },
                        {
                            provide: REORDER_ORDER_NORMALIZER,
                            useExisting: OccReorderOrderNormalizer,
                            multi: true,
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

export { OccOrderAdapter, OccOrderHistoryAdapter, OccOrderNormalizer, OccReplenishmentOrderHistoryAdapter, OccReplenishmentOrderNormalizer, OccReturnRequestNormalizer, OccScheduledReplenishmentOrderAdapter, OccScheduledReplenishmentOrderFormSerializer, OrderOccModule };
//# sourceMappingURL=spartacus-order-occ.mjs.map
