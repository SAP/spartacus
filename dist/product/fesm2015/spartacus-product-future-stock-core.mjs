import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { of } from 'rxjs';
import * as i1 from '@spartacus/core';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { withLatestFrom, switchMap } from 'rxjs/operators';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getFutureStock(userId, productCode) {
        return this.adapter.getFutureStock(userId, productCode);
    }
    getFutureStocks(userId, productCodes) {
        return this.adapter.getFutureStocks(userId, productCodes);
    }
}
FutureStockConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockConnector, deps: [{ token: FutureStockAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
FutureStockConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: FutureStockAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const FUTURE_STOCK_NORMALIZER = new InjectionToken('FutureStockNormalizer');
const FUTURE_STOCK_LIST_NORMALIZER = new InjectionToken('FutureStockListNormalizer');

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
class FutureStockService {
    /**
     * Get future stock
     */
    getFutureStock() {
        return this.futureStockState$;
    }
    constructor(userIdService, futureStockConnector, routingService) {
        this.userIdService = userIdService;
        this.futureStockConnector = futureStockConnector;
        this.routingService = routingService;
        this.PRODUCT_KEY = 'productCode';
        this.futureStockState$ = this.routingService.getRouterState().pipe(withLatestFrom(this.userIdService.takeUserId()), switchMap(([{ state }, userId]) => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
                return this.futureStockConnector.getFutureStock(userId, state.params[this.PRODUCT_KEY]);
            }
            return of(undefined);
        }));
    }
}
FutureStockService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockService, deps: [{ token: i1.UserIdService }, { token: FutureStockConnector }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
FutureStockService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.UserIdService }, { type: FutureStockConnector }, { type: i1.RoutingService }]; } });

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
const facadeProviders = [
    FutureStockService,
    {
        provide: FutureStockFacade,
        useExisting: FutureStockService,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockCoreModule {
    static forRoot() {
        return {
            ngModule: FutureStockCoreModule,
        };
    }
}
FutureStockCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule });
FutureStockCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule, providers: [...facadeProviders, FutureStockConnector] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...facadeProviders, FutureStockConnector],
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

export { FUTURE_STOCK_LIST_NORMALIZER, FUTURE_STOCK_NORMALIZER, FutureStockAdapter, FutureStockConnector, FutureStockCoreModule, FutureStockService };
//# sourceMappingURL=spartacus-product-future-stock-core.mjs.map
