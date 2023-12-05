import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, backOff, isJaloError, OCC_HTTP_TOKEN, provideDefaultConfig } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpContext } from '@angular/common/http';
import { CHECKOUT_PAYMENT_TYPE_NORMALIZER, CheckoutPaymentTypeAdapter, CheckoutCostCenterAdapter } from '@spartacus/checkout/b2b/core';
import { CommonModule } from '@angular/common';

class OccCheckoutCostCenterAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    setCostCenter(userId, cartId, costCenterId) {
        return this.http
            .put(this.getSetCartCostCenterEndpoint(userId, cartId, costCenterId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({ shouldRetry: isJaloError }), this.converter.pipeable(CART_NORMALIZER));
    }
    getSetCartCostCenterEndpoint(userId, cartId, costCenterId) {
        return this.occEndpoints.buildUrl('setCartCostCenter', {
            urlParams: { userId, cartId },
            queryParams: { costCenterId },
        });
    }
}
OccCheckoutCostCenterAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutCostCenterAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutCostCenterAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutCostCenterAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutCostCenterAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCheckoutPaymentTypeAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    getPaymentTypes() {
        const context = new HttpContext().set(OCC_HTTP_TOKEN, {
            sendUserIdAsHeader: true,
        });
        return this.http
            .get(this.getPaymentTypesEndpoint(), { context })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({ shouldRetry: isJaloError }), map((paymentTypeList) => { var _a; return (_a = paymentTypeList.paymentTypes) !== null && _a !== void 0 ? _a : []; }), this.converter.pipeableMany(CHECKOUT_PAYMENT_TYPE_NORMALIZER));
    }
    getPaymentTypesEndpoint() {
        return this.occEndpoints.buildUrl('paymentTypes');
    }
    setPaymentType(userId, cartId, paymentType, purchaseOrderNumber) {
        return this.http
            .put(this.getSetCartPaymentTypeEndpoint(userId, cartId, paymentType, purchaseOrderNumber), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({ shouldRetry: isJaloError }), this.converter.pipeable(CART_NORMALIZER));
    }
    getSetCartPaymentTypeEndpoint(userId, cartId, paymentType, purchaseOrderNumber) {
        const queryParams = { paymentType, purchaseOrderNumber };
        return this.occEndpoints.buildUrl('setCartPaymentType', {
            urlParams: { userId, cartId },
            queryParams,
        });
    }
}
OccCheckoutPaymentTypeAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutPaymentTypeAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutPaymentTypeAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutPaymentTypeAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutPaymentTypeAdapter, decorators: [{
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
const defaultB2bCheckoutDetailsOccEndpoint = {
    getCheckoutDetails: 'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL),costCenter(FULL),purchaseOrderNumber,paymentType(FULL)',
};
const defaultOccCheckoutB2BConfig = {
    backend: {
        occ: {
            endpoints: Object.assign(Object.assign({}, defaultB2bCheckoutDetailsOccEndpoint), { setDeliveryAddress: 'orgUsers/${userId}/carts/${cartId}/addresses/delivery', paymentTypes: 'paymenttypes', setCartCostCenter: 'users/${userId}/carts/${cartId}/costcenter', setCartPaymentType: 'users/${userId}/carts/${cartId}/paymenttype' }),
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutB2BOccModule {
}
CheckoutB2BOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutB2BOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, imports: [CommonModule] });
CheckoutB2BOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, providers: [
        provideDefaultConfig(defaultOccCheckoutB2BConfig),
        {
            provide: CheckoutPaymentTypeAdapter,
            useClass: OccCheckoutPaymentTypeAdapter,
        },
        {
            provide: CheckoutCostCenterAdapter,
            useClass: OccCheckoutCostCenterAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCheckoutB2BConfig),
                        {
                            provide: CheckoutPaymentTypeAdapter,
                            useClass: OccCheckoutPaymentTypeAdapter,
                        },
                        {
                            provide: CheckoutCostCenterAdapter,
                            useClass: OccCheckoutCostCenterAdapter,
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

/**
 * Generated bundle index. Do not edit.
 */

export { CheckoutB2BOccModule, OccCheckoutCostCenterAdapter, OccCheckoutPaymentTypeAdapter };
//# sourceMappingURL=spartacus-checkout-b2b-occ.mjs.map
