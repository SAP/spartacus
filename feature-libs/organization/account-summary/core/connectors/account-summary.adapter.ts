import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';

export abstract class AccountSummaryAdapter {
  /**
   * Abstract method to load account summary header data for given
   * @param userId
   * @param unitCode
   */

  abstract getAccountSummary(
    userId: string,
    unitCode: string
  ): Observable<AccountSummaryDetails>;

  /**
   * Abstract method to load account summary document list for given
   * @param userId
   * @param unitCode
   */

  abstract getDocumentList(
    userId: string,
    unitCode: string,
    params: DocumentQueryParams
  ): Observable<AccountSummaryList>;

  /**
   * Abstract method to load a document attachment
   * @param userId
   * @param orgUnitId
   * @param orgDocumentId
   * @param orgDocumentAttachmentId
   */

  abstract getDocumentAttachment(
    userId: string,
    orgUnitId: string,
    orgDocumentId: string,
    orgDocumentAttachmentId: string
  ): Observable<any>;
}
