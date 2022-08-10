import { Component, OnInit } from '@angular/core';
import {
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentQueryParams,
  DocumentFields,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { SortModel, TranslationService } from '@spartacus/core';
import { map, take } from "rxjs/operators";

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent implements OnInit {
  accountSummary$: BehaviorSubject<AccountSummaryList> = new BehaviorSubject<AccountSummaryList>({});
  queryParams: DocumentQueryParams = {
    fields: DocumentFields.FULL,
    status: DocumentStatus.ALL,
    filterByKey: FilterByOptions.DOCUMENT_NUMBER,
    page: 0,
    pageSize: 10,
    sort: 'byDocumentDateAsc',
  };

  constructor(
    private accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService
  ) { }

  ngOnInit(): void {
    this.fetchDocuments();
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
    // this.queryParams.fields = newFilters.fields;
    this.queryParams.status = newFilters.status;
    this.queryParams.startRange = newFilters.startRange;
    this.queryParams.endRange = newFilters.endRange;
    this.queryParams.filterByKey = newFilters.filterByKey;
    this.queryParams.filterByValue = newFilters.filterByValue;
    this.fetchDocuments();
  }

  addNamesToSortModel(sorts: SortModel[]): Observable<Array<SortModel>> {
    const sortCodes: Array<string> = sorts?.map(sort => sort.code) as Array<string>;
    const translations = sortCodes?.map(sortCode =>
      this.translation.translate(`orgAccountSummary.sorts.${sortCode}`)) ?? [];

    return combineLatest(translations).pipe(
      map(translations => {
        sorts?.forEach((sort, index) => sort.name = translations[index]);
        return sorts;
      })
    );
  }

  private fetchDocuments(): void {
    this.accountSummaryFacade.getDocumentList(this.queryParams)
      .pipe(take(1))
      .subscribe((accountSummaryList: AccountSummaryList) => this.accountSummary$.next(accountSummaryList));
  }
}
