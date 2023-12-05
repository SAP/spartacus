import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { ProductVariantsOccModule } from '@spartacus/product/variants/occ';
import { ProductVariantsComponentsModule } from '@spartacus/product/variants/components';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProductVariantsModule {
}
ProductVariantsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsModule, imports: [ProductVariantsOccModule, ProductVariantsComponentsModule] });
ProductVariantsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsModule, imports: [ProductVariantsOccModule, ProductVariantsComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProductVariantsOccModule, ProductVariantsComponentsModule],
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

export { ProductVariantsModule };
//# sourceMappingURL=spartacus-product-variants.mjs.map
