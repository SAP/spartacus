import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { FUTURE_STOCK_NORMALIZER, FUTURE_STOCK_LIST_NORMALIZER, FutureStockAdapter } from '@spartacus/product/future-stock/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { CommonModule } from '@angular/common';

class OccFutureStockAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    getFutureStock(userId, productCode) {
        return this.http
            .get(this.getFutureStockEndpoint(userId, productCode))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(FUTURE_STOCK_NORMALIZER));
    }
    getFutureStocks(userId, productCodes) {
        return this.http
            .get(this.getFutureStocksEndpoint(userId, productCodes))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(FUTURE_STOCK_LIST_NORMALIZER));
    }
    getFutureStockEndpoint(userId, productCode) {
        return this.occEndpoints.buildUrl('futureStock', {
            urlParams: { userId, productCode },
        });
    }
    getFutureStocksEndpoint(userId, productCodes) {
        const params = {};
        params['productCodes'] = productCodes;
        return this.occEndpoints.buildUrl('futureStocks', {
            urlParams: { userId },
            queryParams: params,
        });
    }
}
OccFutureStockAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccFutureStockAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccFutureStockAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccFutureStockAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccFutureStockAdapter, decorators: [{
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const futureStockEndpoints = {
    futureStock: 'users/${userId}/futureStocks/${productCode}',
    futureStocks: 'users/${userId}/futureStocks',
};
const defaultOccFutureStockConfig = {
    backend: {
        occ: {
            endpoints: {
                ...futureStockEndpoints,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockOccModule {
}
FutureStockOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, imports: [CommonModule] });
FutureStockOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, providers: [
        provideDefaultConfig(defaultOccFutureStockConfig),
        {
            provide: FutureStockAdapter,
            useClass: OccFutureStockAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccFutureStockConfig),
                        {
                            provide: FutureStockAdapter,
                            useClass: OccFutureStockAdapter,
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

export { FutureStockOccModule, OccFutureStockAdapter };
//# sourceMappingURL=spartacus-product-future-stock-occ.mjs.map
