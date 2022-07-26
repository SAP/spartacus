import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSummary, AccountSummaryDetails, DocumentQueryParams } from '../model';
import { AccountSummaryAdapter } from './account-summary-adapter';

@Injectable()
export class AccountSummaryConnector {
  constructor(protected accountSummaryAdapter: AccountSummaryAdapter) { }

  getAccountSummary(userId: string, unitCode: string): Observable<AccountSummaryDetails> {
    return this.accountSummaryAdapter.getAccountSummary(userId, unitCode);
  }

  getDocumentList(
    userId: string,
    unitCode: string,
    params: DocumentQueryParams
  ): Observable<AccountSummary> {
    return this.accountSummaryAdapter.getDocumentList(userId, unitCode, params);
  }
}
