import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from './account-summary-adapter';

@Injectable()
export class AccountSummaryConnector {
  constructor(protected accountSummaryAdapter: AccountSummaryAdapter) {}

  getAccountSummary(userId: string, unitCode: string): Observable<any> {
    return this.accountSummaryAdapter.getAccountSummary(userId, unitCode);
  }

  getAccountSummaryDocuments(
    userId: string,
    unitCode: string
  ): Observable<any> {
    return this.accountSummaryAdapter.getDocumentList(userId, unitCode);
  }
}
