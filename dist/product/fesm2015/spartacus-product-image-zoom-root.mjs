import '@spartacus/storefront';
import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PRODUCT_IMAGE_ZOOM_FEATURE = 'productImageZoom';

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
function defaultImageZoomComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_IMAGE_ZOOM_FEATURE]: {
                cmsComponents: ['ProductImagesComponent'],
            },
        },
    };
    return config;
}
class ProductImageZoomRootModule {
}
ProductImageZoomRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductImageZoomRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule });
ProductImageZoomRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule, providers: [provideDefaultConfigFactory(defaultImageZoomComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [provideDefaultConfigFactory(defaultImageZoomComponentsConfig)],
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

export { PRODUCT_IMAGE_ZOOM_FEATURE, ProductImageZoomRootModule, defaultImageZoomComponentsConfig };
//# sourceMappingURL=spartacus-product-image-zoom-root.mjs.map
