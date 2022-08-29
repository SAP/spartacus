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
    orgUnit: string
  ): Observable<AccountSummaryDetails> {
    return this.accountSummaryAdapter.getAccountSummary(userId, orgUnit);
  }

  getDocumentList(
    userId: string,
    orgUnit: string,
    params: DocumentQueryParams
  ): Observable<AccountSummaryList> {
    return this.accountSummaryAdapter.getDocumentList(userId, orgUnit, params);
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
