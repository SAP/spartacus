import * as i0 from '@angular/core';
import { InjectionToken, Injectable, NgModule } from '@angular/core';
import * as i1 from '@spartacus/core';
import { HttpErrorHandler, HttpResponseStatus, GlobalMessageType } from '@spartacus/core';
import { PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import { Subscription } from 'rxjs';
import { shareReplay, map, distinctUntilChanged } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const PDF_INVOICES_LIST_INVOICES_NORMALIZER = new InjectionToken('PDFInvoicesListInvoices');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PDFInvoicesAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PDFInvoicesConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getInvoicesForOrder(userId, orderId, queryParams) {
        return this.adapter.getInvoicesForOrder(userId, orderId, queryParams);
    }
    getInvoicePDF(userId, orderId, invoiceId, externalSystemId) {
        return this.adapter.getInvoicePDF(userId, orderId, invoiceId, externalSystemId);
    }
}
PDFInvoicesConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesConnector, deps: [{ token: PDFInvoicesAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: PDFInvoicesAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class PDFInvoicesBadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    hasMatch(errorResponse) {
        var _a;
        return (super.hasMatch(errorResponse) && ((_a = this.getErrors(errorResponse)) === null || _a === void 0 ? void 0 : _a.length) > 0);
    }
    handleError(request, response) {
        this.handleInvoicesListError(request, response);
        this.handlePDFDownloadError(request, response);
    }
    handleInvoicesListError(_request, response) {
        this.getErrors(response)
            .filter((e) => this.isInvoicesListNotFoundError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'pdfInvoices.invoicesLoadingError' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handlePDFDownloadError(_request, response) {
        this.getErrors(response)
            .filter((e) => this.isDownloadInvoiceError(e))
            .forEach(() => {
            this.globalMessageService.add({
                key: 'pdfInvoices.downloadPDFError',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    isInvoicesListNotFoundError(error) {
        return ((error === null || error === void 0 ? void 0 : error.type) === 'UnknownIdentifierError' &&
            (error === null || error === void 0 ? void 0 : error.message) != null &&
            (error === null || error === void 0 ? void 0 : error.message.includes('Order')));
    }
    isDownloadInvoiceError(error) {
        return ((error === null || error === void 0 ? void 0 : error.type) === 'UnknownIdentifierError' &&
            (error === null || error === void 0 ? void 0 : error.message) != null &&
            (error === null || error === void 0 ? void 0 : error.message.includes('Invoice')));
    }
    getErrors(response) {
        var _a;
        return ((_a = response.error) === null || _a === void 0 ? void 0 : _a.errors).filter((error) => this.isInvoicesListNotFoundError(error) ||
            this.isDownloadInvoiceError(error));
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
PDFInvoicesBadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesBadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesBadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesBadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesBadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
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
class PDFInvoicesService {
    constructor(routingService, userIdService, pdfInvoicesConnector) {
        this.routingService = routingService;
        this.userIdService = userIdService;
        this.pdfInvoicesConnector = pdfInvoicesConnector;
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.userIdService
            .takeUserId()
            .subscribe((userId) => (this.userId = userId)));
        this.subscriptions.add(this.getOrderId().subscribe((orderId) => (this.orderId = orderId)));
    }
    getInvoicesForOrder(queryParams, userId, orderId) {
        return this.pdfInvoicesConnector
            .getInvoicesForOrder(userId || this.userId, orderId || this.orderId, queryParams)
            .pipe(shareReplay(1));
    }
    getInvoicePDF(invoiceId, externalSystemId, userId, orderId) {
        return this.pdfInvoicesConnector
            .getInvoicePDF(userId || this.userId, orderId || this.orderId, invoiceId, externalSystemId)
            .pipe(shareReplay(1));
    }
    getOrderId() {
        return this.routingService.getRouterState().pipe(map((routingData) => routingData.state.params), distinctUntilChanged(), map((params) => params.orderCode));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
PDFInvoicesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesService, deps: [{ token: i1.RoutingService }, { token: i1.UserIdService }, { token: PDFInvoicesConnector }], target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.UserIdService }, { type: PDFInvoicesConnector }]; } });

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
class PDFInvoicesCoreModule {
}
PDFInvoicesCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule });
PDFInvoicesCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule, providers: [
        PDFInvoicesService,
        {
            provide: PDFInvoicesFacade,
            useExisting: PDFInvoicesService,
        },
        {
            provide: HttpErrorHandler,
            useExisting: PDFInvoicesBadRequestHandler,
            multi: true,
        },
        PDFInvoicesConnector,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        PDFInvoicesService,
                        {
                            provide: PDFInvoicesFacade,
                            useExisting: PDFInvoicesService,
                        },
                        {
                            provide: HttpErrorHandler,
                            useExisting: PDFInvoicesBadRequestHandler,
                            multi: true,
                        },
                        PDFInvoicesConnector,
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

export { PDFInvoicesAdapter, PDFInvoicesBadRequestHandler, PDFInvoicesConnector, PDFInvoicesCoreModule, PDFInvoicesService, PDF_INVOICES_LIST_INVOICES_NORMALIZER };
//# sourceMappingURL=spartacus-pdf-invoices-core.mjs.map
