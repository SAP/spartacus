import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PRODUCT_FUTURE_STOCK_FEATURE = 'productFutureStock';
const PRODUCT_FUTURE_STOCK_CORE_FEATURE = 'productFutureStockCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function futureStockFacadeFactory() {
    return facadeFactory({
        facade: FutureStockFacade,
        feature: PRODUCT_FUTURE_STOCK_CORE_FEATURE,
        methods: ['getFutureStock'],
    });
}
class FutureStockFacade {
}
FutureStockFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FutureStockFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockFacade, providedIn: 'root', useFactory: futureStockFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: futureStockFacadeFactory,
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
function defaultFutureStockComponentsConfig() {
    return {
        featureModules: {
            [PRODUCT_FUTURE_STOCK_FEATURE]: {
                cmsComponents: ['FutureStockComponent'],
            },
        },
    };
}
class FutureStockRootModule {
}
FutureStockRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule });
FutureStockRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule, providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [provideDefaultConfigFactory(defaultFutureStockComponentsConfig)],
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

export { FutureStockFacade, FutureStockRootModule, PRODUCT_FUTURE_STOCK_CORE_FEATURE, PRODUCT_FUTURE_STOCK_FEATURE, defaultFutureStockComponentsConfig, futureStockFacadeFactory };
//# sourceMappingURL=spartacus-product-future-stock-root.mjs.map
