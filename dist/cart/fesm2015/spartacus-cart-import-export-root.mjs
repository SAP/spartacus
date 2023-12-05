import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CART_IMPORT_EXPORT_FEATURE = 'cartImportExport';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportExportRootModule {
}
ImportExportRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule });
ImportExportRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule, providers: [
        provideDefaultConfig({
            featureModules: {
                [CART_IMPORT_EXPORT_FEATURE]: {
                    cmsComponents: [
                        'ImportExportOrderEntriesComponent',
                        'ImportOrderEntriesComponent',
                        'ExportOrderEntriesComponent',
                    ],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            featureModules: {
                                [CART_IMPORT_EXPORT_FEATURE]: {
                                    cmsComponents: [
                                        'ImportExportOrderEntriesComponent',
                                        'ImportOrderEntriesComponent',
                                        'ExportOrderEntriesComponent',
                                    ],
                                },
                            },
                        }),
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

export { CART_IMPORT_EXPORT_FEATURE, ImportExportRootModule };
//# sourceMappingURL=spartacus-cart-import-export-root.mjs.map
