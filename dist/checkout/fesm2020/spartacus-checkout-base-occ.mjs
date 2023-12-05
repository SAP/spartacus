import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, ADDRESS_SERIALIZER, normalizeHttpError, backOff, isJaloError, ADDRESS_NORMALIZER, PAYMENT_DETAILS_NORMALIZER, HttpParamsURIEncoder, provideDefaultConfig } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DELIVERY_MODE_NORMALIZER, PAYMENT_DETAILS_SERIALIZER, PAYMENT_CARD_TYPE_NORMALIZER, CHECKOUT_NORMALIZER, CheckoutAdapter, CheckoutDeliveryAddressAdapter, CheckoutDeliveryModesAdapter, CheckoutPaymentAdapter } from '@spartacus/checkout/base/core';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCheckoutDeliveryAddressAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    createAddress(userId, cartId, address) {
        address = this.converter.convert(address, ADDRESS_SERIALIZER);
        return this.http
            .post(this.getCreateDeliveryAddressEndpoint(userId, cartId), address, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(ADDRESS_NORMALIZER));
    }
    getCreateDeliveryAddressEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('createDeliveryAddress', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
    setAddress(userId, cartId, addressId) {
        return this.http
            .put(this.getSetDeliveryAddressEndpoint(userId, cartId, addressId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetDeliveryAddressEndpoint(userId, cartId, addressId) {
        return this.occEndpoints.buildUrl('setDeliveryAddress', {
            urlParams: { userId, cartId },
            queryParams: { addressId },
        });
    }
    clearCheckoutDeliveryAddress(userId, cartId) {
        return this.http
            .delete(this.getRemoveDeliveryAddressEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getRemoveDeliveryAddressEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('removeDeliveryAddress', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
}
OccCheckoutDeliveryAddressAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutDeliveryAddressAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryAddressAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccCheckoutDeliveryModesAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    setMode(userId, cartId, deliveryModeId) {
        return this.http
            .put(this.getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId) {
        return this.occEndpoints.buildUrl('setDeliveryMode', {
            urlParams: {
                userId,
                cartId,
            },
            queryParams: { deliveryModeId },
        });
    }
    getSupportedModes(userId, cartId) {
        return this.http
            .get(this.getDeliveryModesEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), map((listResponse) => listResponse.deliveryModes), map((modes) => modes ?? []), this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER));
    }
    getDeliveryModesEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('deliveryModes', {
            urlParams: { userId, cartId },
        });
    }
    clearCheckoutDeliveryMode(userId, cartId) {
        return this.http
            .delete(this.getClearDeliveryModeEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getClearDeliveryModeEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('clearDeliveryMode', {
            urlParams: { userId, cartId },
        });
    }
}
OccCheckoutDeliveryModesAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryModesAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutDeliveryModesAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryModesAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutDeliveryModesAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccCheckoutPaymentAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
        if (typeof DOMParser !== 'undefined') {
            this.domparser = new DOMParser();
        }
    }
    createPaymentDetails(userId, cartId, paymentDetails) {
        paymentDetails = this.converter.convert(paymentDetails, PAYMENT_DETAILS_SERIALIZER);
        return this.getProviderSubInfo(userId, cartId).pipe(map((data) => {
            const labelsMap = this.convertToMap(data.mappingLabels.entry);
            return {
                url: data.postUrl,
                parameters: this.getParamsForPaymentProvider(paymentDetails, data.parameters.entry, labelsMap),
                mappingLabels: labelsMap,
            };
        }), mergeMap((sub) => 
        // create a subscription directly with payment provider
        this.createSubWithProvider(sub.url, sub.parameters).pipe(map((response) => this.extractPaymentDetailsFromHtml(response)), mergeMap((fromPaymentProvider) => {
            fromPaymentProvider['defaultPayment'] =
                paymentDetails.defaultPayment ?? false;
            fromPaymentProvider['savePaymentInfo'] = true;
            return this.createDetailsWithParameters(userId, cartId, fromPaymentProvider).pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
                shouldRetry: isJaloError,
            }), this.converter.pipeable(PAYMENT_DETAILS_NORMALIZER));
        }))));
    }
    setPaymentDetails(userId, cartId, paymentDetailsId) {
        return this.http
            .put(this.getSetPaymentDetailsEndpoint(userId, cartId, paymentDetailsId), {})
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getSetPaymentDetailsEndpoint(userId, cartId, paymentDetailsId) {
        return this.occEndpoints.buildUrl('setCartPaymentDetails', {
            urlParams: { userId, cartId },
            queryParams: { paymentDetailsId },
        });
    }
    getPaymentCardTypes() {
        return this.http
            .get(this.getPaymentCardTypesEndpoint())
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), map((cardTypeList) => cardTypeList.cardTypes ?? []), this.converter.pipeableMany(PAYMENT_CARD_TYPE_NORMALIZER));
    }
    getPaymentCardTypesEndpoint() {
        return this.occEndpoints.buildUrl('cardTypes');
    }
    getProviderSubInfo(userId, cartId) {
        return this.http
            .get(this.getPaymentProviderSubInfoEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getPaymentProviderSubInfoEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('paymentProviderSubInfo', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
    createSubWithProvider(postUrl, parameters) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'text/html',
        });
        let httpParams = new HttpParams({ encoder: new HttpParamsURIEncoder() });
        Object.keys(parameters).forEach((key) => {
            httpParams = httpParams.append(key, parameters[key]);
        });
        return this.http
            .post(postUrl, httpParams, {
            headers,
            responseType: 'text',
        })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    createDetailsWithParameters(userId, cartId, parameters) {
        let httpParams = new HttpParams({ encoder: new HttpParamsURIEncoder() });
        Object.keys(parameters).forEach((key) => {
            httpParams = httpParams.append(key, parameters[key]);
        });
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return this.http
            .post(this.getCreatePaymentDetailsEndpoint(userId, cartId), httpParams, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }));
    }
    getCreatePaymentDetailsEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('createPaymentDetails', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
    getParamsForPaymentProvider(paymentDetails, parameters, mappingLabels) {
        const params = this.convertToMap(parameters);
        params[mappingLabels['hybris_account_holder_name']] =
            paymentDetails.accountHolderName;
        params[mappingLabels['hybris_card_type']] = paymentDetails.cardType?.code;
        params[mappingLabels['hybris_card_number']] = paymentDetails.cardNumber;
        if (mappingLabels['hybris_combined_expiry_date'] === 'true') {
            params[mappingLabels['hybris_card_expiry_date']] =
                paymentDetails.expiryMonth +
                    mappingLabels['hybris_separator_expiry_date'] +
                    paymentDetails.expiryYear;
        }
        else {
            params[mappingLabels['hybris_card_expiration_month']] =
                paymentDetails.expiryMonth;
            params[mappingLabels['hybris_card_expiration_year']] =
                paymentDetails.expiryYear;
        }
        params[mappingLabels['hybris_card_cvn']] = paymentDetails.cvn;
        // billing address
        params[mappingLabels['hybris_billTo_country']] =
            paymentDetails.billingAddress?.country?.isocode;
        params[mappingLabels['hybris_billTo_firstname']] =
            paymentDetails.billingAddress?.firstName;
        params[mappingLabels['hybris_billTo_lastname']] =
            paymentDetails.billingAddress?.lastName;
        params[mappingLabels['hybris_billTo_street1']] =
            paymentDetails.billingAddress?.line1 +
                ' ' +
                paymentDetails.billingAddress?.line2;
        params[mappingLabels['hybris_billTo_city']] =
            paymentDetails.billingAddress?.town;
        if (paymentDetails.billingAddress?.region) {
            params[mappingLabels['hybris_billTo_region']] =
                paymentDetails.billingAddress.region.isocodeShort;
        }
        else {
            params[mappingLabels['hybris_billTo_region']] = '';
        }
        params[mappingLabels['hybris_billTo_postalcode']] =
            paymentDetails.billingAddress?.postalCode;
        return params;
    }
    extractPaymentDetailsFromHtml(html) {
        const domdoc = this.domparser.parseFromString(html, 'text/xml');
        const responseForm = domdoc.getElementsByTagName('form')[0];
        const inputs = responseForm.getElementsByTagName('input');
        const values = {};
        for (let i = 0; inputs[i]; i++) {
            const input = inputs[i];
            const name = input.getAttribute('name');
            const value = input.getAttribute('value');
            if (name && name !== '{}' && value && value !== '') {
                values[name] = value;
            }
        }
        return values;
    }
    convertToMap(paramList) {
        return paramList.reduce(function (result, item) {
            const key = item.key;
            result[key] = item.value;
            return result;
        }, {});
    }
}
OccCheckoutPaymentAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutPaymentAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutPaymentAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutPaymentAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutPaymentAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

class OccCheckoutAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    getCheckoutDetails(userId, cartId) {
        return this.http
            .get(this.getGetCheckoutDetailsEndpoint(userId, cartId))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), backOff({
            shouldRetry: isJaloError,
        }), this.converter.pipeable(CHECKOUT_NORMALIZER));
    }
    getGetCheckoutDetailsEndpoint(userId, cartId) {
        return this.occEndpoints.buildUrl('getCheckoutDetails', {
            urlParams: {
                userId,
                cartId,
            },
        });
    }
}
OccCheckoutAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccCheckoutAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccCheckoutAdapter, decorators: [{
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
const DELIVERY_ENDPOINT = 'users/${userId}/carts/${cartId}/addresses/delivery';
const DELIVERY_MODE_ENDPOINT = 'users/${userId}/carts/${cartId}/deliverymode';
const defaultOccCheckoutConfig = {
    backend: {
        occ: {
            endpoints: {
                setDeliveryAddress: DELIVERY_ENDPOINT,
                cardTypes: 'cardtypes',
                createDeliveryAddress: DELIVERY_ENDPOINT,
                removeDeliveryAddress: DELIVERY_ENDPOINT,
                deliveryMode: DELIVERY_MODE_ENDPOINT,
                setDeliveryMode: DELIVERY_MODE_ENDPOINT,
                clearDeliveryMode: DELIVERY_MODE_ENDPOINT,
                deliveryModes: `${DELIVERY_MODE_ENDPOINT}s`,
                setCartPaymentDetails: 'users/${userId}/carts/${cartId}/paymentdetails',
                paymentProviderSubInfo: 'users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl',
                createPaymentDetails: 'users/${userId}/carts/${cartId}/payment/sop/response',
                getCheckoutDetails: 'users/${userId}/carts/${cartId}?fields=deliveryAddress(FULL),deliveryMode(FULL),paymentInfo(FULL)',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckoutOccModule {
}
CheckoutOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CheckoutOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, imports: [CommonModule] });
CheckoutOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, providers: [
        provideDefaultConfig(defaultOccCheckoutConfig),
        {
            provide: CheckoutAdapter,
            useClass: OccCheckoutAdapter,
        },
        {
            provide: CheckoutDeliveryAddressAdapter,
            useClass: OccCheckoutDeliveryAddressAdapter,
        },
        {
            provide: CheckoutDeliveryModesAdapter,
            useClass: OccCheckoutDeliveryModesAdapter,
        },
        {
            provide: CheckoutPaymentAdapter,
            useClass: OccCheckoutPaymentAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCheckoutConfig),
                        {
                            provide: CheckoutAdapter,
                            useClass: OccCheckoutAdapter,
                        },
                        {
                            provide: CheckoutDeliveryAddressAdapter,
                            useClass: OccCheckoutDeliveryAddressAdapter,
                        },
                        {
                            provide: CheckoutDeliveryModesAdapter,
                            useClass: OccCheckoutDeliveryModesAdapter,
                        },
                        {
                            provide: CheckoutPaymentAdapter,
                            useClass: OccCheckoutPaymentAdapter,
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

export { CheckoutOccModule, OccCheckoutAdapter, OccCheckoutDeliveryAddressAdapter, OccCheckoutDeliveryModesAdapter, OccCheckoutPaymentAdapter };
//# sourceMappingURL=spartacus-checkout-base-occ.mjs.map
