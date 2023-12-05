import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { PDFInvoicesAdapter } from '@spartacus/pdf-invoices/core';
import { InvoiceQueryParams, OrderInvoiceList } from '@spartacus/pdf-invoices/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccPDFInvoicesAdapter implements PDFInvoicesAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    getInvoicesForOrder(userId: string, orderId: string, queryParams: InvoiceQueryParams): Observable<OrderInvoiceList>;
    getInvoicePDF(userId: string, orderId: string, invoiceId: string, externalSystemId?: string): Observable<Blob>;
    private buildInvoiceListUrl;
    private buildInvoicePDFUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccPDFInvoicesAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccPDFInvoicesAdapter>;
}
