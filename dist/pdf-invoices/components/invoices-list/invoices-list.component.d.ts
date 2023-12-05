import { OnDestroy, OnInit } from '@angular/core';
import { ErrorModel, GlobalMessageService, HttpErrorModel, LanguageService, PaginationModel, SortModel, TranslationService } from '@spartacus/core';
import { InvoiceQueryParams, OrderInvoiceList, PDFInvoicesFacade } from '@spartacus/pdf-invoices/root';
import { FileDownloadService, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class InvoicesListComponent implements OnInit, OnDestroy {
    protected pdfInvoicesFacade: PDFInvoicesFacade;
    protected translationService: TranslationService;
    protected downloadService: FileDownloadService;
    protected languageService: LanguageService;
    protected globalMessageService: GlobalMessageService;
    ICON_TYPE: typeof ICON_TYPE;
    protected PAGE_SIZE: number;
    sortOptions: SortModel[];
    sort: string;
    protected sortMapping: {
        [key: string]: string;
    };
    pagination: PaginationModel;
    _initQueryParams: InvoiceQueryParams;
    queryParams$: BehaviorSubject<InvoiceQueryParams>;
    invoicesList$: Observable<OrderInvoiceList>;
    protected subscription: Subscription;
    constructor(pdfInvoicesFacade: PDFInvoicesFacade, translationService: TranslationService, downloadService: FileDownloadService, languageService: LanguageService, globalMessageService: GlobalMessageService);
    ngOnInit(): void;
    protected updateQueryParams(partialParams: InvoiceQueryParams): void;
    pageChange(currentPage: number): void;
    sortChange(sortCode: string): void;
    downloadPDFInvoice(invoiceId: string, externalSystemId?: string): void;
    getSortOptions(): void;
    getNotEnabledError(response: HttpErrorModel): ErrorModel[];
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InvoicesListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InvoicesListComponent, "cx-invoices-list", never, {}, {}, never, never, false, never>;
}
