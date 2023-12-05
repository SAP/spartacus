import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { PDFInvoicesCoreModule } from '@spartacus/pdf-invoices/core';
import { PDFInvoicesOccModule } from '@spartacus/pdf-invoices/occ';

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PDFInvoicesModule {
}
PDFInvoicesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, imports: [PDFInvoicesComponentsModule,
        PDFInvoicesCoreModule,
        PDFInvoicesOccModule] });
PDFInvoicesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, imports: [PDFInvoicesComponentsModule,
        PDFInvoicesCoreModule,
        PDFInvoicesOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        PDFInvoicesComponentsModule,
                        PDFInvoicesCoreModule,
                        PDFInvoicesOccModule,
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

export { PDFInvoicesModule };
//# sourceMappingURL=spartacus-pdf-invoices.mjs.map
