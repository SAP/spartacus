import { OnDestroy } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { InvoiceQueryParams, OrderInvoiceList, PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import { Observable, Subscription } from 'rxjs';
import { PDFInvoicesConnector } from '../connectors/pdf-invoices.connector';
import * as i0 from "@angular/core";
export declare class PDFInvoicesService implements PDFInvoicesFacade, OnDestroy {
    private routingService;
    private userIdService;
    protected pdfInvoicesConnector: PDFInvoicesConnector;
    protected subscriptions: Subscription;
    userId: string;
    orderId: string;
    constructor(routingService: RoutingService, userIdService: UserIdService, pdfInvoicesConnector: PDFInvoicesConnector);
    getInvoicesForOrder(queryParams: InvoiceQueryParams, userId?: string, orderId?: string): Observable<OrderInvoiceList>;
    getInvoicePDF(invoiceId: string, externalSystemId?: string, userId?: string, orderId?: string): Observable<Blob>;
    protected getOrderId(): Observable<string>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PDFInvoicesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PDFInvoicesService>;
}
