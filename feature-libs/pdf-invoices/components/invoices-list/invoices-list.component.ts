/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  LanguageService,
  PaginationModel,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import {
  InvoiceQueryParams,
  InvoicesFields,
  OrderInvoiceList,
  PDFInvoicesFacade,
} from '@spartacus/pdf-invoices/root';
import { FileDownloadService, ICON_TYPE } from '@spartacus/storefront';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  Subscription,
} from 'rxjs';
import { catchError, skip, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-invoices-list',
  templateUrl: './invoices-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesListComponent implements OnInit, OnDestroy {
  /* For Enum use in HTML */
  ICON_TYPE = ICON_TYPE;

  protected PAGE_SIZE = 5; //Default page size

  sortOptions: SortModel[];
  sort = 'byInvoiceIdAsc';

  protected sortMapping: { [key: string]: string } = {
    byCreatedAtAsc: 'invoiceDate:asc', //TODO: (CXINT-2438) update the sort code after the API is changed
    byCreatedAtDesc: 'invoiceDate:desc', //TODO: (CXINT-2438) update the sort code after the API is changed
    byInvoiceIdAsc: 'invoiceId:asc',
    byInvoiceIdDesc: 'invoiceId:desc',
    byNetAmountAsc: 'netAmount:asc',
    byNetAmountDesc: 'netAmount:desc',
    byTotalAmountAsc: 'totalAmount:asc',
    byTotalAmountDesc: 'totalAmount:desc',
  };
  pagination: PaginationModel;

  // Contains the initial query parameters and will be updated with current state of filters
  _initQueryParams: InvoiceQueryParams = {
    currentPage: 0,
    pageSize: this.PAGE_SIZE,
    fields: InvoicesFields.FULL,
    sort: this.sortMapping[this.sort], //backend supports sort codes like invoiceId:asc
  };

  // Triggers events on chaning the page, sort options
  queryParams$ = new BehaviorSubject<InvoiceQueryParams>(this._initQueryParams);

  // Used by template to subscribe to data from documents api
  invoicesList$: Observable<OrderInvoiceList> = this.queryParams$.pipe(
    switchMap((param) => this.pdfInvoicesFacade.getInvoicesForOrder(param)),
    tap(
      (invoicesList) =>
        (this.pagination = {
          currentPage: invoicesList.pagination?.page,
          pageSize: invoicesList.pagination?.count,
          totalPages: invoicesList.pagination?.totalPages,
          totalResults: invoicesList.pagination?.totalCount,
          sort: this.sortMapping[this.sort],
        })
    ),
    catchError((error) => {
      if (error && this.getNotEnabledError(error)?.length) {
        this.globalMessageService.add(
          { key: 'pdfInvoices.featureNotEnabled' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      }
      return EMPTY;
    })
  );

  protected subscription = new Subscription();

  constructor(
    protected pdfInvoicesFacade: PDFInvoicesFacade,
    protected translationService: TranslationService,
    protected downloadService: FileDownloadService,
    protected languageService: LanguageService,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(skip(1))
        .subscribe(() =>
          this.updateQueryParams({ fields: InvoicesFields.FULL })
        )
    );

    this.getSortOptions();
  }

  protected updateQueryParams(partialParams: InvoiceQueryParams) {
    // Overwrite each value present in partialParams to _queryParams
    Object.keys(partialParams).forEach(
      (key) =>
        ((this._initQueryParams as any)[key] = (partialParams as any)[key])
    );

    // Every request that doesn't specify fields should be set to DEFAULT
    if (!partialParams.fields) {
      this._initQueryParams.fields = InvoicesFields.DEFAULT;
    }

    this.queryParams$.next(this._initQueryParams);
  }

  pageChange(currentPage: number): void {
    this.updateQueryParams({
      currentPage: currentPage,
    });
  }

  sortChange(sortCode: string): void {
    this.sort = sortCode;
    this.updateQueryParams({
      sort: this.sortMapping[sortCode], //backend supports sort codes like invoiceId:asc
      currentPage: 0,
    });
  }

  downloadPDFInvoice(invoiceId: string, externalSystemId?: string): void {
    this.pdfInvoicesFacade
      .getInvoicePDF(invoiceId, externalSystemId)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          const file = new Blob([data], { type: data.type });
          const url = URL.createObjectURL(file);
          this.downloadService.download(url, `${invoiceId}.pdf`);
        },
      });
  }

  getSortOptions() {
    this.sortOptions = [];
    Object.keys(this.sortMapping).forEach((sortKey) =>
      this.sortOptions.push({ code: sortKey, selected: false })
    );

    const translations = this.sortOptions.map((sort) =>
      this.translationService.translate(`pdfInvoices.sorts.${sort.code}`)
    );

    combineLatest(translations)
      .pipe(take(1))
      .subscribe((translated) =>
        this.sortOptions.forEach(
          (sort, index) => (sort.name = translated[index])
        )
      );
  }

  getNotEnabledError(response: HttpErrorModel): ErrorModel[] {
    return response?.details
      ? response.details.filter(
          (error: any) => error?.type === 'UnknownResourceError'
        )
      : [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
