import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccProductVariantsConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    variants: 'products/${productCode}?fields=name,purchasable,baseOptions(DEFAULT),baseProduct,variantOptions(DEFAULT),variantType',
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
class ProductVariantsOccModule {
}
ProductVariantsOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsOccModule, imports: [CommonModule] });
ProductVariantsOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsOccModule, providers: [provideDefaultConfig(defaultOccProductVariantsConfig)], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [provideDefaultConfig(defaultOccProductVariantsConfig)],
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

export { ProductVariantsOccModule };
//# sourceMappingURL=spartacus-product-variants-occ.mjs.map
