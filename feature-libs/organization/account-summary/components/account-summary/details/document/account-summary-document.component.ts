import { Component, OnInit } from '@angular/core';
import { AccountSummary, DocumentQueryParams } from '@spartacus/organization/account-summary/core';
import { AccountSummaryFacade } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
})
export class AccountSummaryDocumentComponent implements OnInit {
  currentUnitCode: string;
  accountSummary$: Observable<AccountSummary>;

  constructor(private accountSummaryFacade: AccountSummaryFacade) { }

  ngOnInit(): void {

    let params: DocumentQueryParams = {
      b2bDocumentStatus: 'open',
      currentPage: 0,
      pageSize: 10,
      sort: 'byDocumentDateAsc',
      startRange: '',
      endRange: '',
      filterKey: '',
      filterValue: ''
    };

    this.accountSummary$ = this.accountSummaryFacade.getDocumentList(params);
  }
}
