import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { PickupLocationAdapter, StockAdapter } from '@spartacus/pickup-in-store/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The endpoints to call from the OCC adapter for pickup locations.
 */
const defaultOccPickupLocationConfig = {
    backend: {
        occ: {
            endpoints: {
                storeDetails: 'stores/${storeName}',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The endpoints to call from the OCC adapter for stock levels.
 */
const defaultOccStockConfig = {
    backend: {
        occ: {
            endpoints: {
                stock: 'products/${productCode}/stock',
                stockAtStore: 'products/${productCode}/stock/${storeName}',
            },
        },
    },
};

class OccPickupLocationAdapter {
    constructor(http, occEndpointsService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.logger = inject(LoggerService);
        // Intentional empty constructor
    }
    getStoreDetails(storeName) {
        return this.http
            .get(this.occEndpointsService.buildUrl('storeDetails', {
            urlParams: { storeName },
            queryParams: { fields: 'FULL' },
        }))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
}
OccPickupLocationAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPickupLocationAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPickupLocationAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPickupLocationAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPickupLocationAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });

/**
 * Adapter for finding stock levels of a product in stores from the OCC APIs.
 */
class OccStockAdapter {
    constructor(http, occEndpointsService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.logger = inject(LoggerService);
        // Intentional empty constructor
    }
    loadStockLevels(productCode, location) {
        return this.http
            .get(this.occEndpointsService.buildUrl('stock', {
            urlParams: { productCode },
            queryParams: Object.assign(Object.assign({}, location), { fields: 'FULL' }),
        }))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    loadStockLevelAtStore(productCode, storeName) {
        return this.http
            .get(this.occEndpointsService.buildUrl('stockAtStore', {
            urlParams: { productCode, storeName },
        }))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
}
OccStockAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStockAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccStockAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStockAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccStockAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }]; } });

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
class PickupInStoreOccModule {
}
PickupInStoreOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule });
PickupInStoreOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule, providers: [
        provideDefaultConfig(defaultOccPickupLocationConfig),
        provideDefaultConfig(defaultOccStockConfig),
        { provide: PickupLocationAdapter, useClass: OccPickupLocationAdapter },
        { provide: StockAdapter, useClass: OccStockAdapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig(defaultOccPickupLocationConfig),
                        provideDefaultConfig(defaultOccStockConfig),
                        { provide: PickupLocationAdapter, useClass: OccPickupLocationAdapter },
                        { provide: StockAdapter, useClass: OccStockAdapter },
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

export { OccPickupLocationAdapter, OccStockAdapter, PickupInStoreOccModule, defaultOccPickupLocationConfig, defaultOccStockConfig };
//# sourceMappingURL=spartacus-pickup-in-store-occ.mjs.map
