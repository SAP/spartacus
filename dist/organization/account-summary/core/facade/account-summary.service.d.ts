import { OnDestroy } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { AccountSummaryDetails, AccountSummaryFacade, AccountSummaryList, DocumentQueryParams } from '@spartacus/organization/account-summary/root';
import { Observable, Subscription } from 'rxjs';
import { AccountSummaryConnector } from '../connectors/account-summary.connector';
import * as i0 from "@angular/core";
export declare class AccountSummaryService implements AccountSummaryFacade, OnDestroy {
    private routingService;
    private userIdService;
    private accountSummaryConnector;
    protected subscriptions: Subscription;
    userId: string;
    orgUnitId: string;
    constructor(routingService: RoutingService, userIdService: UserIdService, accountSummaryConnector: AccountSummaryConnector);
    ngOnDestroy(): void;
    getAccountSummary(orgUnitId?: string): Observable<AccountSummaryDetails>;
    getDocumentList(params: DocumentQueryParams, orgUnitId?: string): Observable<AccountSummaryList>;
    getDocumentAttachment(orgDocumentId: string, orgDocumentAttachmentId: string, orgUnitId?: string): Observable<Blob>;
    protected getOrgUnitId(): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccountSummaryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccountSummaryService>;
}
