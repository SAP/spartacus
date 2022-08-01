import { Component, OnInit } from '@angular/core';
import { AccountSummaryFacade, AccountSummaryList, DocumentQueryParams, FIELDS_TYPE } from '@spartacus/organization/account-summary/root';
import { Observable, combineLatest } from 'rxjs';
import { SortModel, TranslationService } from '@spartacus/core';
import { map } from "rxjs/operators";

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent implements OnInit {
  accountSummary$: Observable<AccountSummaryList>;

  constructor(
    private accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService
  ) { }

  ngOnInit(): void {
    this.fetchDocuments({
      sortCode: '',
      currentPage: 0
    });
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: '',
      currentPage: page,
    };
    this.fetchDocuments(event);
  }

  private fetchDocuments(event: { sortCode: string; currentPage: number }): void {
    let params: DocumentQueryParams = {
      fields: FIELDS_TYPE.FULL,
      status: 'all',
      page: 0,
      pageSize: 10,
      sort: 'byDocumentDateAsc',
      startRange: '',
      endRange: '',
      filterByKey: '',
      filterByValue: ''
    };

    if (event?.currentPage) {
      params.page = event.currentPage;
    }

    if (event?.sortCode) {
      params.sort = event.sortCode;
    }

    this.accountSummary$ = this.accountSummaryFacade.getDocumentList(params);
  }

  getSortLabels(sorts?: SortModel[]): Observable<any> {
    const sortCodes: Array<string> = sorts?.map(sort => sort.code) as Array<string>;
    const translations = sortCodes.map(sortCode =>
      this.translation.translate(`orgAccountSummary.sorts.${sortCode}`));

    return combineLatest(translations).pipe(
      map(translations => {
        const keyValue: { [key: string]: string } = {};
        sortCodes.forEach((sortCode, i) => {
          // @ts-ignore
          keyValue[sortCode] = translations[i];
        });
        return keyValue;
      })
    );
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.fetchDocuments(event);
  }

}
