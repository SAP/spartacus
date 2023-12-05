import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { facadeFactory, provideDefaultConfigFactory } from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PDF_INVOICES_FEATURE = 'pdfInvoices';
const PDF_INVOICES_CORE_FEATURE = 'pdfInvoicesCore';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function pdfInvoicesFacadeFactory() {
    return facadeFactory({
        facade: PDFInvoicesFacade,
        feature: PDF_INVOICES_FEATURE,
        methods: ['getInvoicesForOrder', 'getInvoicePDF'],
    });
}
class PDFInvoicesFacade {
}
PDFInvoicesFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesFacade, providedIn: 'root', useFactory: pdfInvoicesFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: pdfInvoicesFacadeFactory,
                }]
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
var InvoicesFields;
(function (InvoicesFields) {
    InvoicesFields["BASIC"] = "BASIC";
    InvoicesFields["DEFAULT"] = "DEFAULT";
    InvoicesFields["FULL"] = "FULL";
})(InvoicesFields || (InvoicesFields = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultRequestedDeliveryDateComponentsConfig() {
    const config = {
        featureModules: {
            [PDF_INVOICES_FEATURE]: {
                cmsComponents: ['AccountOrderDetailsPDFInvoicesComponent'],
            },
            // by default core is bundled together with components
            [PDF_INVOICES_CORE_FEATURE]: PDF_INVOICES_FEATURE,
        },
    };
    return config;
}
class PDFInvoicesRootModule {
}
PDFInvoicesRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule });
PDFInvoicesRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule, providers: [
        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
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

export { InvoicesFields, PDFInvoicesFacade, PDFInvoicesRootModule, PDF_INVOICES_CORE_FEATURE, PDF_INVOICES_FEATURE, defaultRequestedDeliveryDateComponentsConfig, pdfInvoicesFacadeFactory };
//# sourceMappingURL=spartacus-pdf-invoices-root.mjs.map
