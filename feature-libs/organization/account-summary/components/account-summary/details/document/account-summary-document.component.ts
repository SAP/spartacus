import { Component, OnInit } from '@angular/core';
import { SortModel, TranslationService } from '@spartacus/core';
import {
  AccountSummaryDocumentType,
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentFields,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions
} from '@spartacus/organization/account-summary/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent implements OnInit {

  /* For Enum use in HTML */
  ICON_TYPE = ICON_TYPE;

  accountSummary$: BehaviorSubject<AccountSummaryList> = new BehaviorSubject<AccountSummaryList>({});
  queryParams: DocumentQueryParams = {
    status: DocumentStatus.ALL,
    filterByKey: FilterByOptions.DOCUMENT_NUMBER,
    page: 0,
    pageSize: 10,
    sort: 'byDocumentDateAsc',
  };

  documentTypeOptions: AccountSummaryDocumentType[];
  sortOptions: SortModel[];

  constructor(
    private accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService
  ) { }

  ngOnInit(): void {
    this.fetchDocuments(true);
  }

  pageChange(page: number): void {
    this.queryParams.page = page;
    this.fetchDocuments();
  }

  changeSortCode(sortCode: string): void {
    this.queryParams.sort = sortCode;
    this.queryParams.page = 0;
    this.fetchDocuments();
  }

  filterChange(newFilters: DocumentQueryParams): void {
    this.queryParams.page = 0;
    this.queryParams.status = newFilters.status;
    this.queryParams.startRange = newFilters.startRange;
    this.queryParams.endRange = newFilters.endRange;
    this.queryParams.filterByKey = newFilters.filterByKey;
    this.queryParams.filterByValue = newFilters.filterByValue;
    this.fetchDocuments();
  }

  private fetchDocuments(isFullFetch = false): void {
    const params = {
      ...this.queryParams,
      fields: isFullFetch ? DocumentFields.FULL : DocumentFields.DEFAULT,
    };
    this.accountSummaryFacade.getDocumentList(params)
      .pipe(take(1))
      .subscribe((accountSummaryList: AccountSummaryList) => {

        if (!this.documentTypeOptions && accountSummaryList.orgDocumentTypes) {
          this.documentTypeOptions = accountSummaryList.orgDocumentTypes;
        }

        if (!this.sortOptions && accountSummaryList.sorts) {
          this.addNamesToSortModel(accountSummaryList.sorts);
        }

        this.accountSummary$.next(accountSummaryList);
      });
  }

  private addNamesToSortModel(sorts: Array<SortModel>) {
    this.sortOptions = sorts;
    const translations = sorts?.map(sort =>
      this.translation.translate(`orgAccountSummary.sorts.${sort.code}`)) ?? [];

    combineLatest(translations).subscribe(translated =>
      this.sortOptions.forEach((sort, index) =>
        sort.name = translated[index]
      )
    );
  }
}
