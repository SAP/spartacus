import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { FutureStockComponentsModule } from '@spartacus/product/future-stock/components';
import * as i1 from '@spartacus/product/future-stock/core';
import { FutureStockCoreModule } from '@spartacus/product/future-stock/core';
import { FutureStockOccModule } from '@spartacus/product/future-stock/occ';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FutureStockModule {
}
FutureStockModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, imports: [i1.FutureStockCoreModule, FutureStockOccModule,
        FutureStockComponentsModule] });
FutureStockModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, imports: [FutureStockCoreModule.forRoot(),
        FutureStockOccModule,
        FutureStockComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FutureStockCoreModule.forRoot(),
                        FutureStockOccModule,
                        FutureStockComponentsModule,
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

export { FutureStockModule };
//# sourceMappingURL=spartacus-product-future-stock.mjs.map
