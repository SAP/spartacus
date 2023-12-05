import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccBulkPricingConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    bulkPrices: 'orgProducts/${productCode}?fields=price(DEFAULT),volumePrices(FULL)',
                },
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BulkPricingOccModule {
}
BulkPricingOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, imports: [CommonModule] });
BulkPricingOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, providers: [provideDefaultConfig(defaultOccBulkPricingConfig)], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [provideDefaultConfig(defaultOccBulkPricingConfig)],
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

export { BulkPricingOccModule };
//# sourceMappingURL=spartacus-product-bulk-pricing-occ.mjs.map
