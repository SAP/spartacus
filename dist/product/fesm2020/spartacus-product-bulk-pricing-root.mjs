import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PRODUCT_BULK_PRICING_FEATURE = 'productBulkPricing';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultProductBulkPricingComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_BULK_PRICING_FEATURE]: {
                cmsComponents: ['BulkPricingTableComponent'],
            },
        },
    };
    return config;
}
class BulkPricingRootModule {
}
BulkPricingRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule });
BulkPricingRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule, providers: [
        provideDefaultConfigFactory(defaultProductBulkPricingComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductBulkPricingComponentsConfig),
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

export { BulkPricingRootModule, PRODUCT_BULK_PRICING_FEATURE, defaultProductBulkPricingComponentsConfig };
//# sourceMappingURL=spartacus-product-bulk-pricing-root.mjs.map
