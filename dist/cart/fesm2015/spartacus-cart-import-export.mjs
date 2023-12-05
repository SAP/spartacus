import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { ExportOrderEntriesModule, ImportOrderEntriesModule, ImportExportOrderEntriesModule } from '@spartacus/cart/import-export/components';
import * as i1 from '@spartacus/cart/import-export/core';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ImportExportModule {
}
ImportExportModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, imports: [i1.ImportExportCoreModule, ExportOrderEntriesModule,
        ImportOrderEntriesModule,
        ImportExportOrderEntriesModule] });
ImportExportModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, imports: [ImportExportCoreModule.forRoot(),
        ExportOrderEntriesModule,
        ImportOrderEntriesModule,
        ImportExportOrderEntriesModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ImportExportCoreModule.forRoot(),
                        ExportOrderEntriesModule,
                        ImportOrderEntriesModule,
                        ImportExportOrderEntriesModule,
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

export { ImportExportModule };
//# sourceMappingURL=spartacus-cart-import-export.mjs.map
