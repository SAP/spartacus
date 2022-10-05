import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '@spartacus/core';
import { ORGANIZATION_ACCOUNT_SUMMARY_FEATURE } from '../feature-name';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '../model/account-summary.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AccountSummaryFacade,
      feature: ORGANIZATION_ACCOUNT_SUMMARY_FEATURE,
      methods: [
        'getAccountSummary',
        'getDocumentList',
        'getDocumentAttachment',
      ],
    }),
})
export abstract class AccountSummaryFacade {
  /**
   * Returns the account summary header details for a orgUnit and current logged in user
   * If orgUnit is provided, it will be used, otherwise it will use orgUnit from router state.
   */
  abstract getAccountSummary(orgUnit?: string): Observable<AccountSummaryDetails>;

  /**
   * Returns the result of account summary documents search
   * @param params Search parameters
   */
  abstract getDocumentList(
    params: DocumentQueryParams
  ): Observable<AccountSummaryList>;

  /**
   * Returns the document blob for given orgDocumentId and orgDocumentAttachmentId
   * @param orgDocumentId organization document id
   * @param orgDocumentAttachmentId attachment id belonging to a organization document id
   */
  abstract getDocumentAttachment(
    orgDocumentId?: string,
    orgDocumentAttachmentId?: string
  ): Observable<Blob>;
}
