import { Injectable } from '@angular/core';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from './account-summary.adapter';

@Injectable()
export class AccountSummaryConnector {
  constructor(protected accountSummaryAdapter: AccountSummaryAdapter) {}

  getAccountSummary(
    userId: string,
    unitCode: string
  ): Observable<AccountSummaryDetails> {
    return this.accountSummaryAdapter.getAccountSummary(userId, unitCode);
  }

  getDocumentList(
    userId: string,
    unitCode: string,
    params: DocumentQueryParams
  ): Observable<AccountSummaryList> {
    return this.accountSummaryAdapter.getDocumentList(userId, unitCode, params);
  }

  getDocumentAttachment(
    userId: string,
    orgUnitId: string,
    orgDocumentId: string,
    orgDocumentAttachmentId: string
  ): Observable<any> {
    return this.accountSummaryAdapter.getDocumentAttachment(
      userId,
      orgUnitId,
      orgDocumentId,
      orgDocumentAttachmentId
    );
  }
}
