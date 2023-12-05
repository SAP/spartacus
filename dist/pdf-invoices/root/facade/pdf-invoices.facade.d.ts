import { Observable } from 'rxjs';
import { InvoiceQueryParams, OrderInvoiceList } from '../model/pdf-invoices.model';
import * as i0 from "@angular/core";
export declare function pdfInvoicesFacadeFactory(): PDFInvoicesFacade;
export declare abstract class PDFInvoicesFacade {
    /**
     * Abstract method used to get the PDF invoices for an order
     * @param userId Logged in user id
     * @param orderId If provided, it will be used, otherwise it will use orderId from router state.
     * @param queryParams Additional query parameters used in the API request
     */
    abstract getInvoicesForOrder(queryParams: InvoiceQueryParams, userId?: string, orderId?: string): Observable<OrderInvoiceList>;
    /**
     * Returns the document blob for given invoiceId, orderId and externalSystemId
     * @param userId Logged in user id
     * @param orderId If provided, it will be used, otherwise it will use orderId from router state.
     * @param invoiceId The id of the invoice to be downloaded
     * @param externalSystemId External system that provides the invoice PDF
     */
    abstract getInvoicePDF(invoiceId: string, externalSystemId?: string, userId?: string, orderId?: string): Observable<Blob>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PDFInvoicesFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PDFInvoicesFacade>;
}
