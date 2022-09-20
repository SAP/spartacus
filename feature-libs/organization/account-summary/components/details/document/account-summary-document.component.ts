import { Component } from '@angular/core';
import {
  LanguageService,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import {
  AccountSummaryDocumentType,
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentFields,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';
import { FileDownloadService, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent {
  /* For Enum use in HTML */
  ICON_TYPE = ICON_TYPE;

  documentTypeOptions: AccountSummaryDocumentType[];
  sortOptions: SortModel[];
  selectedLanguage: string;

  // Contains the initial query parameters and will be updated with current state of filters
  _queryParams: DocumentQueryParams = {
    status: DocumentStatus.ALL,
    filterByKey: FilterByOptions.DOCUMENT_NUMBER,
    page: 0,
    pageSize: 10,
    fields: DocumentFields.FULL,
  };
  // Used to fire event every time query params are changed
  queryParams$ = new BehaviorSubject<DocumentQueryParams>(this._queryParams);
  // Used by template to subscribe to data from documents api
  accountSummary$: Observable<AccountSummaryList> = this.queryParams$.pipe(
    switchMap((param) => this.accountSummaryFacade.getDocumentList(param)),
    tap((accountSummaryList: AccountSummaryList) => {
      if (!this.documentTypeOptions && accountSummaryList.orgDocumentTypes) {
        this.documentTypeOptions = accountSummaryList.orgDocumentTypes;
      }

      if (!this.sortOptions && accountSummaryList.sorts) {
        this.addNamesToSortModel(accountSummaryList.sorts);
      }
    })
  );

  constructor(
    protected accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService,
    private downloadService: FileDownloadService,
    private languageService: LanguageService
  ) {
    this.languageService
      .getActive()
      .pipe(take(1))
      .subscribe((activeLanguage) => (this.selectedLanguage = activeLanguage));
  }

  pageChange(page: number): void {
    this.updateQueryParams({
      page: page,
    });
  }

  changeSortCode(sortCode: string): void {
    this.updateQueryParams({
      sort: sortCode,
      page: 0,
    });
  }

  filterChange(newFilters: DocumentQueryParams): void {
    this.updateQueryParams({
      page: 0,
      status: newFilters.status,
      startRange: newFilters.startRange,
      endRange: newFilters.endRange,
      filterByKey: newFilters.filterByKey,
      filterByValue: newFilters.filterByValue,
    });
  }

  downloadAttachment(documentId?: string, attachmentId?: string): void {
    this.accountSummaryFacade
      .getDocumentAttachment(documentId, attachmentId)
      .pipe(take(1))
      .subscribe((data) => {
        let file = new Blob([data], { type: data.type });
        let url = URL.createObjectURL(file);
        this.downloadService.download(url, attachmentId);
      });
  }

  private updateQueryParams(partialParams: DocumentQueryParams) {
    this._queryParams = {
      ...this._queryParams,
      ...partialParams,
      fields: DocumentFields.DEFAULT,
    };
    this.queryParams$.next(this._queryParams);
  }

  private addNamesToSortModel(sorts: Array<SortModel>) {
    this.sortOptions = sorts;
    const translations = sorts.map((sort) =>
      this.translation.translate(`orgAccountSummary.sorts.${sort.code}`)
    );

    combineLatest(translations)
      .pipe(take(1))
      .subscribe((translated) =>
        this.sortOptions.forEach(
          (sort, index) => (sort.name = translated[index])
        )
      );
  }
}
