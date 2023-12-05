import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '@spartacus/core';
import { OrderEntriesSource } from '@spartacus/cart/base/root';
import '@spartacus/storefront';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportExportConfig {
}
ImportExportConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ImportExportConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Indicates from which source the new saved cart name
 * should be taken.
 */
var CartNameSource;
(function (CartNameSource) {
    CartNameSource["FILE_NAME"] = "fileName";
    CartNameSource["DATE_TIME"] = "dateTime";
})(CartNameSource || (CartNameSource = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultImportExportConfig = {
    cartImportExport: {
        file: {
            separator: ',',
        },
        import: {
            fileValidity: {
                maxSize: 1,
                maxEntries: {
                    [OrderEntriesSource.NEW_SAVED_CART]: 100,
                    [OrderEntriesSource.SAVED_CART]: 100,
                    [OrderEntriesSource.ACTIVE_CART]: 10,
                    [OrderEntriesSource.QUICK_ORDER]: 10,
                },
                allowedTypes: [
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel',
                    'text/csv',
                    '.csv',
                ],
            },
            cartNameGeneration: {
                source: CartNameSource.FILE_NAME,
            },
        },
        export: {
            additionalColumns: [
                {
                    name: {
                        key: 'name',
                    },
                    value: 'product.name',
                },
                {
                    name: {
                        key: 'price',
                    },
                    value: 'totalPrice.formattedValue',
                },
            ],
            messageEnabled: true,
            downloadDelay: 1000,
            maxEntries: 1000,
            fileOptions: {
                fileName: 'cart',
                extension: 'csv',
                type: 'text/csv',
            },
        },
    },
};

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
class ImportExportCoreModule {
    static forRoot() {
        return {
            ngModule: ImportExportCoreModule,
            providers: [provideDefaultConfig(defaultImportExportConfig)],
        };
    }
}
ImportExportCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule });
ImportExportCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule, decorators: [{
            type: NgModule,
            args: [{}]
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

/**
 * Generated bundle index. Do not edit.
 */

export { CartNameSource, ImportExportConfig, ImportExportCoreModule, defaultImportExportConfig };
//# sourceMappingURL=spartacus-cart-import-export-core.mjs.map
