import { Component, OnInit } from '@angular/core';
import { AccountSummaryList, DocumentQueryParams } from '@spartacus/organization/account-summary/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent implements OnInit {
  accountSummary$: Observable<AccountSummaryList>;

  constructor(private accountSummaryFacade: AccountSummaryFacade) { }

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

    this.accountSummary$ = this.accountSummaryFacade.getDocumentList(params);
  }

}
