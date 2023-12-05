import { HttpClient } from '@angular/common/http';
import { ConverterService, LoggerService, OccEndpointsService } from '@spartacus/core';
import { AccountSummaryAdapter } from '@spartacus/organization/account-summary/core';
import { AccountSummaryDetails, AccountSummaryList, DocumentQueryParams } from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OccAccountSummaryAdapter implements AccountSummaryAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected converter: ConverterService;
    protected logger: LoggerService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, converter: ConverterService);
    getAccountSummary(userId: string, orgUnitId: string): Observable<AccountSummaryDetails>;
    getDocumentList(userId: string, orgUnitId: string, params: DocumentQueryParams): Observable<AccountSummaryList>;
    getDocumentAttachment(userId: string, orgUnitId: string, orgDocumentId: string, orgDocumentAttachmentId: string): Observable<Blob>;
    private buildAccountSummaryUrl;
    private buildDocumentListUrl;
    private buildDocumentAttachmentUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccAccountSummaryAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccAccountSummaryAdapter>;
}
