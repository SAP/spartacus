import { Observable } from 'rxjs';
import { AccountSummaryDetails, AccountSummaryList, DocumentQueryParams } from '../model/account-summary.model';
import * as i0 from "@angular/core";
export declare abstract class AccountSummaryFacade {
    /**
     * Returns the account summary header details for a orgUnit and current logged in user
     * @param orgUnitId If provided, it will be used, otherwise it will use orgUnitId from router state.
     */
    abstract getAccountSummary(orgUnitId?: string): Observable<AccountSummaryDetails>;
    /**
     * Returns the result of account summary documents search
     * @param params Search parameters
     * @param orgUnitId If provided, it will be used, otherwise it will use orgUnitId from router state.
     */
    abstract getDocumentList(params: DocumentQueryParams, orgUnitId?: string): Observable<AccountSummaryList>;
    /**
     * Returns the document blob for given orgDocumentId and orgDocumentAttachmentId
     * @param orgDocumentId organization document id
     * @param orgDocumentAttachmentId attachment id belonging to a organization document id
     * @param orgUnitId If provided, it will be used, otherwise it will use orgUnitId from router state.
     */
    abstract getDocumentAttachment(orgDocumentId?: string, orgDocumentAttachmentId?: string, orgUnitId?: string): Observable<Blob>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountSummaryFacade, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountSummaryFacade>;
}
