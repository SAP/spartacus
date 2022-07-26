import { Observable } from 'rxjs';
import { AccountSummary, AccountSummaryDetails, DocumentQueryParams } from '../model';

export abstract class AccountSummaryAdapter {

  /**
   * Abstract method to load account summary header data for given
   * @param userId
   * @param unitCode
   */

  abstract getAccountSummary(userId: string, unitCode: string): Observable<AccountSummaryDetails>;

  /**
   * Abstract method to load account summary document list for given
   * @param userId
   * @param unitCode
   */

  abstract getDocumentList(userId: string, unitCode: string, params: DocumentQueryParams): Observable<AccountSummary>;
}
