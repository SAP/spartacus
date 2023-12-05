import { InvoiceQueryParams, OrderInvoiceList } from '@spartacus/pdf-invoices/root';
import { Observable } from 'rxjs';
import { PDFInvoicesAdapter } from './pdf-invoices.adapter';
import * as i0 from "@angular/core";
export declare class PDFInvoicesConnector {
    protected adapter: PDFInvoicesAdapter;
    constructor(adapter: PDFInvoicesAdapter);
    getInvoicesForOrder(userId: string, orderId: string, queryParams: InvoiceQueryParams): Observable<OrderInvoiceList>;
    getInvoicePDF(userId: string, orderId: string, invoiceId: string, externalSystemId?: string): Observable<Blob>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PDFInvoicesConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PDFInvoicesConnector>;
}
