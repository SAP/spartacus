import * as i1 from '@angular/common/http';
import * as i0 from '@angular/core';
import { inject, Injectable, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { LoggerService, normalizeHttpError, provideDefaultConfig } from '@spartacus/core';
import { PDF_INVOICES_LIST_INVOICES_NORMALIZER, PDFInvoicesAdapter } from '@spartacus/pdf-invoices/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccPDFInvoicesAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.logger = inject(LoggerService);
    }
    getInvoicesForOrder(userId, orderId, queryParams) {
        return this.http
            .get(this.buildInvoiceListUrl(userId, orderId, queryParams))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(PDF_INVOICES_LIST_INVOICES_NORMALIZER));
    }
    getInvoicePDF(userId, orderId, invoiceId, externalSystemId) {
        const options = {
            responseType: 'blob',
        };
        return this.http
            .get(this.buildInvoicePDFUrl(userId, orderId, invoiceId, externalSystemId), options)
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))));
    }
    buildInvoiceListUrl(userId, orderId, queryParams) {
        return this.occEndpoints.buildUrl('pdfInvoicesListInvoices', {
            urlParams: { userId, orderId },
            queryParams,
        });
    }
    buildInvoicePDFUrl(userId, orderId, invoiceId, externalSystemId) {
        return this.occEndpoints.buildUrl('pdfInvoicesDownloadInvoicePDF', {
            urlParams: { userId, orderId, invoiceId },
            queryParams: externalSystemId ? { externalSystemId } : undefined,
        });
    }
}
OccPDFInvoicesAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPDFInvoicesAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccPDFInvoicesAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPDFInvoicesAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccPDFInvoicesAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });

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
const defaultOccPDFInvoicesConfig = {
    backend: {
        occ: {
            endpoints: {
                pdfInvoicesListInvoices: 'users/${userId}/orders/${orderId}/invoices',
                pdfInvoicesDownloadInvoicePDF: 'users/${userId}/orders/${orderId}/invoices/${invoiceId}/download',
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PDFInvoicesOccModule {
}
PDFInvoicesOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, imports: [CommonModule] });
PDFInvoicesOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, providers: [
        provideDefaultConfig(defaultOccPDFInvoicesConfig),
        {
            provide: PDFInvoicesAdapter,
            useClass: OccPDFInvoicesAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccPDFInvoicesConfig),
                        {
                            provide: PDFInvoicesAdapter,
                            useClass: OccPDFInvoicesAdapter,
                        },
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

export { OccPDFInvoicesAdapter, PDFInvoicesOccModule };
//# sourceMappingURL=spartacus-pdf-invoices-occ.mjs.map
