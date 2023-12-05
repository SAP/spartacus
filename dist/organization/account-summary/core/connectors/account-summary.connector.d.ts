import { AccountSummaryDetails, AccountSummaryList, DocumentQueryParams } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from './account-summary.adapter';
import * as i0 from "@angular/core";
export declare class AccountSummaryConnector {
    protected accountSummaryAdapter: AccountSummaryAdapter;
    constructor(accountSummaryAdapter: AccountSummaryAdapter);
    getAccountSummary(userId: string, orgUnitId: string): Observable<AccountSummaryDetails>;
    getDocumentList(userId: string, orgUnitId: string, params: DocumentQueryParams): Observable<AccountSummaryList>;
    getDocumentAttachment(userId: string, orgUnitId: string, orgDocumentId: string, orgDocumentAttachmentId: string): Observable<Blob>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountSummaryConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountSummaryConnector>;
}
